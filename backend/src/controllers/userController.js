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
        const {
            street,
            city,
            phonenumber,
            state,
            country,
            zipCode,
            location,
            isDefault,
            name,
        } = req.body;

        if (!street || !city || !state || !country || !zipCode || !location) {
            return res
                .status(400)
                .json({ error: "All address fields are required" });
        }

        if (isDefault) {
            await prisma.address.updateMany({
                where: { userId: req.userId },
                data: { isDefault: false },
            });
        }

        const address = await prisma.address.create({
            data: {
                name,
                street,
                phonenumber,
                city,
                state,
                country,
                zipCode,
                location: location.toUpperCase(),
                isDefault: !!isDefault,
                userId: req.userId,
            },
        });

        res.status(201).json({
            message: "Address added successfully",
            address,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to add address",
            details: error.message,
        });
    }
};

export const getAddresses = async (req, res) => {
    try {
        const {id}=req.params;
        const addresses = await prisma.address.findMany({
            where: { userId:id },
            orderBy: { isDefault: "desc" },
        });

        res.status(200).json({ addresses });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve addresses",
            details: error.message,
        });
    }
};
