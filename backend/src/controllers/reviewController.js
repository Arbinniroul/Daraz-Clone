import prisma from "../db/connection.js";

export const createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        // Check if user has purchased the product
        const hasPurchased = await prisma.orderItem.findFirst({
            where: {
                productId,
                order: { userId: req.userId },
            },
        });

        if (!hasPurchased) {
            return res.status(403).json({
                error: "You can only review products you have purchased",
            });
        }

        // Check if already reviewed
        const existingReview = await prisma.review.findFirst({
            where: {
                productId,
                userId: req.userId,
            },
        });

        if (existingReview) {
            return res.status(400).json({
                error: "You have already reviewed this product",
            });
        }

        const review = await prisma.review.create({
            data: {
                rating: parseInt(rating),
                comment,
                productId,
                userId: req.userId,
            },
            include: {
                user: {
                    select: {
                        username: true,
                        profile: true,
                    },
                },
            },
        });

        res.status(201).json({
            message: "Review added successfully",
            review,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to create review",
            details: error.message,
        });
    }
};

export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await prisma.review.findMany({
            where: { productId },
            include: {
                user: {
                    select: {
                        username: true,
                        profile: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        res.json({ reviews });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch reviews",
            details: error.message,
        });
    }
};
