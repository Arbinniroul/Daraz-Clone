import prisma from "../db/connection.js";

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            images,
            categoryId,
            inventory,
            salePrice,
            discount,
            isOnSale,
            saleStart,
            saleEnd,
        } = req.body;

        // Check if user is a seller
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            include: { sellerProfile: true },
        });

        if (user.role !== "SELLER" || !user.sellerProfile) {
            return res.status(403).json({
                error: "Only sellers can create products",
            });
        }

        // Calculate discount if not provided but salePrice is
        let calculatedDiscount = discount;
        if (salePrice && price && !discount) {
            calculatedDiscount = ((price - salePrice) / price) * 100;
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                salePrice: salePrice ? parseFloat(salePrice) : null,
                discount: calculatedDiscount
                    ? parseFloat(calculatedDiscount)
                    : null,
                isOnSale: Boolean(isOnSale),
                saleStart: saleStart ? new Date(saleStart) : null,
                saleEnd: saleEnd ? new Date(saleEnd) : null,
                images,
                categoryId,
                sellerId: user.sellerProfile.id,
                inventory: {
                    create: {
                        quantity: parseInt(inventory.quantity),
                        sku: inventory.sku,
                    },
                },
            },
            include: {
                category: true,
                inventory: true,
                seller: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to create product",
            details: error.message,
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            search,
            onSale,
            discountMin,
            discountMax,
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;

        const where = {};

        if (category) where.categoryId = category;
        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }

        // Price filtering (considers both regular and sale prices)
        if (minPrice || maxPrice) {
            where.OR = [
                {
                    AND: [{ isOnSale: true }, { salePrice: {} }],
                },
                {
                    AND: [
                        { OR: [{ isOnSale: false }, { isOnSale: null }] },
                        { price: {} },
                    ],
                },
            ];

            if (minPrice) {
                where.OR[0].AND[1].salePrice = {
                    ...where.OR[0].AND[1].salePrice,
                    gte: parseFloat(minPrice),
                };
                where.OR[1].AND[1].price = {
                    ...where.OR[1].AND[1].price,
                    gte: parseFloat(minPrice),
                };
            }
            if (maxPrice) {
                where.OR[0].AND[1].salePrice = {
                    ...where.OR[0].AND[1].salePrice,
                    lte: parseFloat(maxPrice),
                };
                where.OR[1].AND[1].price = {
                    ...where.OR[1].AND[1].price,
                    lte: parseFloat(maxPrice),
                };
            }
        }

        // Sale and discount filtering
        if (onSale === "true") {
            where.isOnSale = true;
            // Only include active sales (if sale period is specified)
            where.AND = [
                { isOnSale: true },
                {
                    OR: [
                        { AND: [{ saleStart: null }, { saleEnd: null }] },
                        {
                            AND: [
                                { saleStart: { lte: new Date() } },
                                { saleEnd: { gte: new Date() } },
                            ],
                        },
                    ],
                },
            ];
        }

        if (discountMin || discountMax) {
            where.discount = {};
            if (discountMin) where.discount.gte = parseFloat(discountMin);
            if (discountMax) where.discount.lte = parseFloat(discountMax);
        }

        
        const orderBy = {};
        if (sortBy === "price") {
            orderBy.price = sortOrder;
        } else if (sortBy === "name") {
            orderBy.name = sortOrder;
        } else if (sortBy === "discount") {
            orderBy.discount = sortOrder;
        } else if (sortBy === "createdAt") {
            orderBy.createdAt = sortOrder;
        } else {
            orderBy.createdAt = "desc";
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                category: true,
                inventory: true,
                seller: {
                    include: {
                        user: {
                            select: {
                                username: true,
                            },
                        },
                    },
                },
                reviews: {
                    select: {
                        rating: true,
                    },
                },
            },
            orderBy,
            skip: (parseInt(page) - 1) * parseInt(limit),
            take: parseInt(limit),
        });

        // Add current price calculation to each product
        const productsWithCurrentPrice = products.map((product) => {
            const currentPrice = getCurrentPrice(product);
            const isSaleActive = isSaleActiveCheck(product);

            return {
                ...product,
                currentPrice,
                isSaleActive,
            };
        });

        const total = await prisma.product.count({ where });

        res.json({
            products: productsWithCurrentPrice,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch products",
            details: error.message,
        });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                inventory: true,
                seller: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                email: true,
                            },
                        },
                    },
                },
                reviews: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                profile: true,
                            },
                        },
                    },
                },
            },
        });

        if (!product) {
            return res.status(404).json({
                error: "Product not found",
            });
        }

        // Add current price and sale status
        const productWithPricing = {
            ...product,
            currentPrice: getCurrentPrice(product),
            isSaleActive: isSaleActiveCheck(product),
        };

        res.json({ product: productWithPricing });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch product",
            details: error.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            price,
            images,
            categoryId,
            inventory,
            salePrice,
            discount,
            isOnSale,
            saleStart,
            saleEnd,
        } = req.body;

        // Verify product ownership
        const product = await prisma.product.findFirst({
            where: {
                id,
                seller: { userId: req.userId },
            },
        });

        if (!product) {
            return res.status(404).json({
                error: "Product not found or access denied",
            });
        }

        // Calculate discount if not provided but salePrice is
        let calculatedDiscount = discount;
        if (salePrice && price && !discount) {
            calculatedDiscount = ((price - salePrice) / price) * 100;
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price: parseFloat(price),
                salePrice: salePrice ? parseFloat(salePrice) : null,
                discount: calculatedDiscount
                    ? parseFloat(calculatedDiscount)
                    : null,
                isOnSale: Boolean(isOnSale),
                saleStart: saleStart ? new Date(saleStart) : null,
                saleEnd: saleEnd ? new Date(saleEnd) : null,
                images,
                categoryId,
            },
            include: {
                category: true,
                inventory: true,
            },
        });

        res.json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to update product",
            details: error.message,
        });
    }
};

export const updateProductSale = async (req, res) => {
    try {
        const { id } = req.params;
        const { salePrice, discount, isOnSale, saleStart, saleEnd } = req.body;

        // Verify product ownership
        const product = await prisma.product.findFirst({
            where: {
                id,
                seller: { userId: req.userId },
            },
        });

        if (!product) {
            return res.status(404).json({
                error: "Product not found or access denied",
            });
        }

        // Calculate discount if not provided but salePrice is
        let calculatedDiscount = discount;
        if (salePrice && product.price && !discount) {
            calculatedDiscount =
                ((product.price - salePrice) / product.price) * 100;
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                salePrice: salePrice ? parseFloat(salePrice) : null,
                discount: calculatedDiscount
                    ? parseFloat(calculatedDiscount)
                    : null,
                isOnSale: Boolean(isOnSale),
                saleStart: saleStart ? new Date(saleStart) : null,
                saleEnd: saleEnd ? new Date(saleEnd) : null,
            },
            include: {
                category: true,
                inventory: true,
            },
        });

        res.json({
            message: "Product sale updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to update product sale",
            details: error.message,
        });
    }
};

export const getSaleProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, discountMin } = req.query;

        console.log("🔍 Starting getSaleProducts...");
       

        const where = {
            isOnSale: true,
            OR: [
                { AND: [{ saleStart: null }, { saleEnd: null }] },
                {
                    AND: [
                        { saleStart: { lte: new Date() } },
                        { saleEnd: { gte: new Date() } },
                    ],
                },
            ],
        };

        if (discountMin) {
            where.discount = { gte: parseFloat(discountMin) };
        }

        console.log("📋 Final WHERE clause:", JSON.stringify(where, null, 2));

        
        const totalProducts = await prisma.product.count();
        console.log(`📊 Total products in database: ${totalProducts}`);

     
        const onSaleProducts = await prisma.product.count({
            where: { isOnSale: true },
        });
        console.log(`🏷️ Products with isOnSale=true: ${onSaleProducts}`);


        const activeSaleProducts = await prisma.product.count({
            where: {
                isOnSale: true,
                saleStart: { lte: new Date() },
                saleEnd: { gte: new Date() },
            },
        });
        console.log(
            `📅 Products with active sale dates: ${activeSaleProducts}`
        );

      
        const permanentSaleProducts = await prisma.product.count({
            where: {
                isOnSale: true,
                saleStart: null,
                saleEnd: null,
            },
        });
        console.log(`∞ Permanent sale products: ${permanentSaleProducts}`);

        const products = await prisma.product.findMany({
            where,
            include: {
                category: true,
                inventory: true,
                seller: {
                    include: {
                        user: {
                            select: {
                                username: true,
                            },
                        },
                    },
                },
                reviews: {
                    select: {
                        rating: true,
                    },
                },
            },
            orderBy: { discount: "desc" },
            skip: (parseInt(page) - 1) * parseInt(limit),
            take: parseInt(limit),
        });

        console.log(`✅ Found ${products.length} products matching criteria`);

        if (products.length > 0) {
            console.log("📦 Sample product:", {
                id: products[0].id,
                name: products[0].name,
                isOnSale: products[0].isOnSale,
                saleStart: products[0].saleStart,
                saleEnd: products[0].saleEnd,
                discount: products[0].discount,
            });
        }

        const total = await prisma.product.count({ where });

        
        const saleStats = {
            totalProductsOnSale: total,
            averageDiscount:
                products.length > 0
                    ? products.reduce(
                          (sum, product) => sum + (product.discount || 0),
                          0
                      ) / products.length
                    : 0,
            maxDiscount:
                products.length > 0
                    ? Math.max(
                          ...products.map((product) => product.discount || 0)
                      )
                    : 0,
        };

        console.log("📊 Final stats:", saleStats);

        res.json({
            products: products.map((product) => ({
                ...product,
                currentPrice: getCurrentPrice(product),
                isSaleActive: isSaleActiveCheck(product),
            })),
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit),
            },
            saleStats,
        });
    } catch (error) {
        console.error("❌ Error in getSaleProducts:", error);
        res.status(500).json({
            error: "Failed to fetch sale products",
            details: error.message,
        });
    }
};


function getCurrentPrice(product) {
    if (product.isOnSale && product.salePrice && isSaleActiveCheck(product)) {
        return product.salePrice;
    }
    return product.price;
}

function isSaleActiveCheck(product) {
    if (!product.isOnSale) return false;
    if (!product.saleStart && !product.saleEnd) return true;

    const now = new Date();
    const startValid = !product.saleStart || product.saleStart <= now;
    const endValid = !product.saleEnd || product.saleEnd >= now;

    return startValid && endValid;
}
