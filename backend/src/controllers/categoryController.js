import prisma from "../db/connection.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                children: true,
                _count: {
                    select: { products: true },
                },
            },
            where: { parentId: null },
        });

        res.json({ success: true, categories });
    } catch (error) {
        console.error("Get categories error:", error);
        res.status(500).json({
            error: "Failed to fetch categories",
            details: error.message,
        });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name, slug, parentId } = req.body;

        if (!name || !slug) {
            return res.status(400).json({
                success: false,
                error: "Name and slug are required",
            });
        }
        const existingCategory = await prisma.category.findFirst({
            where: {
                OR: [{ name }, { slug }],
            },
        });
        if (existingCategory) {
            return res.status(409).json({
                success: false,
                error: "Category with this name or slug already exists",
            });
        }

        if (parentId) {
            const parentCategory = await prisma.category.findUnique({
                where: { id: parentId },
            });

            if (!parentCategory) {
                return res.status(404).json({
                    success: false,
                    error: "Parent category not found",
                });
            }
        }

        const category = await prisma.category.create({
            data: {
                name,
                slug,
                parentId: parentId || null,
            },
            include: {
                parent: true,
                children: true,
                _count: {
                    select: { products: true },
                },
            },
        });

        res.status(201).json({
            message: "Category created successfully",
            category,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to create category",
            details: error.message,
        });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                parent: true,
                children: {
                    include: {
                        _count: {
                            select: { products: true },
                        },
                    },
                },
                products: {
                    include: {
                        inventory: true,
                        _count: {
                            select: { reviews: true },
                        },
                    },
                },
                _count: {
                    select: {
                        products: true,
                        children: true,
                    },
                },
            },
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                error: "Category not found",
            });
        }

        res.json({
            success: true,
            category,
        });
    } catch (error) {
        console.error("Get category by ID error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch category",
        });
    }
};
