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
        const userId = req.userId; 


        if (!productId) {
            return res.status(400).json({ error: "Product ID is required" });
        }


        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: { inventory: true },
        });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check inventory if available
        if (product.inventory && product.inventory.quantity < quantity) {
            return res.status(400).json({
                error: "Insufficient stock",
                available: product.inventory.quantity,
            });
        }

       
        let cart = await prisma.cart.findUnique({
            where: { userId: userId },
            include: {
                items: {
                    include: {
                        product: {
                            include: { inventory: true },
                        },
                    },
                },
            },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: userId,
                    user: { connect: { id: userId } }, 
                },
                include: {
                    items: {
                        include: {
                            product: {
                                include: { inventory: true },
                            },
                        },
                    },
                },
            });
        }

     
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId,
            },
        });

        let cartItem;
        if (existingItem) {
            const newQuantity = existingItem.quantity + parseInt(quantity);

           
            if (product.inventory && product.inventory.quantity < newQuantity) {
                return res.status(400).json({
                    error: "Insufficient stock for requested quantity",
                    available: product.inventory.quantity,
                    currentInCart: existingItem.quantity,
                });
            }

            cartItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: newQuantity },
                include: {
                    product: {
                        include: { inventory: true },
                    },
                },
            });
        } else {
            cartItem = await prisma.cartItem.create({
                data: {
                    quantity: parseInt(quantity),
                    cartId: cart.id,
                    productId: productId,
                  
                },
                include: {
                    product: {
                        include: { inventory: true },
                    },
                },
            });
        }

        // Get updated cart with all items
        const updatedCart = await prisma.cart.findUnique({
            where: { id: cart.id },
            include: {
                items: {
                    include: {
                        product: {
                            include: { inventory: true },
                        },
                    },
                },
                user: {
                    // Include user if needed
                    select: {
                        id: true,
                        email: true,
                        username: true,
                    },
                },
            },
        });

        res.json({
            message: "Item added to cart",
            cartItem: cartItem,
            cart: updatedCart,
            userId: userId,
        });
    } catch (error) {
        console.error("Add to cart error:", error);
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
