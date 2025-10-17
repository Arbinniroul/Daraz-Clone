import prisma from "../db/connection.js";

export const getCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: { userId: req.userId },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
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
                            },
                        },
                    },
                },
            },
        });

        if (!cart) {
            // Create empty cart if it doesn't exist
            const newCart = await prisma.cart.create({
                data: { userId: req.userId },
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    inventory: true,
                                },
                            },
                        },
                    },
                },
            });
            return res.json({ cart: newCart });
        }

        res.json({ cart });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch cart",
            details: error.message,
        });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        // Get or create cart
        let cart = await prisma.cart.findUnique({
            where: { userId: req.userId },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId: req.userId },
            });
        }

        // Check if item already in cart
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId,
            },
        });

        let cartItem;
        if (existingItem) {
            cartItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + parseInt(quantity) },
                include: { product: true },
            });
        } else {
            cartItem = await prisma.cartItem.create({
                data: {
                    quantity: parseInt(quantity),
                    cartId: cart.id,
                    productId,
                },
                include: { product: true },
            });
        }

        res.json({
            message: "Item added to cart",
            cartItem,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to add item to cart",
            details: error.message,
        });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const cartItem = await prisma.cartItem.update({
            where: {
                id,
                cart: { userId: req.userId },
            },
            data: { quantity: parseInt(quantity) },
            include: { product: true },
        });

        res.json({
            message: "Cart item updated",
            cartItem,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to update cart item",
            details: error.message,
        });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.cartItem.delete({
            where: {
                id,
                cart: { userId: req.userId },
            },
        });

        res.json({
            message: "Item removed from cart",
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to remove item from cart",
            details: error.message,
        });
    }
};
