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

        res.json({ categories });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch categories",
            details: error.message,
        });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name, slug, parentId } = req.body;

        const category = await prisma.category.create({
            data: {
                name,
                slug,
                parentId,
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
