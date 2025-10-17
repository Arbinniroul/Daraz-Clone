import prisma from "../db/connection.js";

export const createOrder = async (req, res) => {
    try {
        const { addressId, paymentMethod } = req.body;

        // Get user's cart
        const cart = await prisma.cart.findUnique({
            where: { userId: req.userId },
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

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                error: "Cart is empty",
            });
        }

        // Calculate total and validate stock
        let total = 0;
        for (const item of cart.items) {
            if (item.quantity > item.product.inventory.quantity) {
                return res.status(400).json({
                    error: `Insufficient stock for ${item.product.name}`,
                });
            }
            total += item.quantity * item.product.price;
        }

        // Create order
        const order = await prisma.order.create({
            data: {
                orderNumber: `ORD-${Date.now()}`,
                total,
                userId: req.userId,
                addressId,
                items: {
                    create: cart.items.map((item) => ({
                        quantity: item.quantity,
                        price: item.product.price,
                        productId: item.product.id,
                    })),
                },
                payments: {
                    create: {
                        amount: total,
                        method: paymentMethod,
                        userId: req.userId,
                    },
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                address: true,
                payments: true,
            },
        });

        // Update product inventory
        for (const item of cart.items) {
            await prisma.productInventory.update({
                where: { productId: item.product.id },
                data: {
                    quantity: {
                        decrement: item.quantity,
                    },
                },
            });
        }

        // Clear cart
        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });

        res.status(201).json({
            message: "Order created successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to create order",
            details: error.message,
        });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { userId: req.userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                address: true,
                payments: true,
            },
            orderBy: { createdAt: "desc" },
        });

        res.json({ orders });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch orders",
            details: error.message,
        });
    }
};

export const getOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await prisma.order.findFirst({
            where: {
                id,
                userId: req.userId,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                address: true,
                payments: true,
            },
        });

        if (!order) {
            return res.status(404).json({
                error: "Order not found",
            });
        }

        res.json({ order });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch order",
            details: error.message,
        });
    }
};
