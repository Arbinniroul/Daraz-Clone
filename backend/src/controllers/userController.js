import prisma from "../db/connection.js";

export const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, avatar, dateOfBirth } = req.body;

        const profile = await prisma.userProfile.upsert({
            where: { userId: req.userId },
            update: { firstName, lastName, avatar, dateOfBirth },
            create: {
                firstName,
                lastName,
                avatar,
                dateOfBirth,
                userId: req.userId,
            },
        });

        res.json({
            message: "Profile updated successfully",
            profile,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to update profile",
            details: error.message,
        });
    }
};

export const becomeSeller = async (req, res) => {
    try {
        const { storeName, storeDescription, businessEmail, businessPhone } =
            req.body;

        // Update user role to SELLER
        await prisma.user.update({
            where: { id: req.userId },
            data: { role: "SELLER" },
        });

        // Create seller profile
        const sellerProfile = await prisma.sellerProfile.create({
            data: {
                storeName,
                storeDescription,
                businessEmail,
                businessPhone,
                userId: req.userId,
            },
        });

        res.json({
            message: "Seller account created successfully",
            sellerProfile,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to create seller account",
            details: error.message,
        });
    }
};

export const addAddress = async (req, res) => {
    try {
        const { street, city, state, country, zipCode, isDefault } = req.body;

        if (isDefault) {
            // Remove default from other addresses
            await prisma.address.updateMany({
                where: { userId: req.userId },
                data: { isDefault: false },
            });
        }

        const address = await prisma.address.create({
            data: {
                street,
                city,
                state,
                country,
                zipCode,
                isDefault: isDefault || false,
                userId: req.userId,
            },
        });

        res.status(201).json({
            message: "Address added successfully",
            address,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to add address",
            details: error.message,
        });
    }
};

export const getAddresses = async (req, res) => {
    try {
        const addresses = await prisma.address.findMany({
            where: { userId: req.userId },
        });

        res.json({ addresses });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch addresses",
            details: error.message,
        });
    }
};
