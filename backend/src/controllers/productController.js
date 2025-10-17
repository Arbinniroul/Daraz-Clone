import prisma from "../db/connection.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, images, categoryId, inventory } =
            req.body;

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

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
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
            page = 1,
            limit = 10,
        } = req.query;

        const where = {};

        if (category) where.categoryId = category;
        if (search) where.name = { contains: search, mode: "insensitive" };
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = parseFloat(minPrice);
            if (maxPrice) where.price.lte = parseFloat(maxPrice);
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
            skip: (parseInt(page) - 1) * parseInt(limit),
            take: parseInt(limit),
        });

        const total = await prisma.product.count({ where });

        res.json({
            products,
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

        res.json({ product });
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
        const { name, description, price, images, categoryId, inventory } =
            req.body;

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

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price: parseFloat(price),
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
