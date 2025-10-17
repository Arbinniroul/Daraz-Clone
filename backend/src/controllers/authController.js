import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../db/connection.js";

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res) => {
    try {
        const { email, password, username, phone } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({
                error: "Email, username and password are required",
            });
        }


        // Check if user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            return res.status(400).json({
                error: "User with this email or username already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username,
                phone,
                role: "CUSTOMER",
            },
            select: {
                id: true,
                email: true,
                username: true,
                phone: true,
                role: true,
                createdAt: true,
            },
        });

        // Generate token
        const token = generateToken(user.id);

        res.status(201).json({
            message: "User registered successfully",
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            error: "Registration failed",
            details: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
            include: { profile: true },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        // Generate token
        const token = generateToken(user.id);

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                profile: user.profile,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({
            error: "Login failed",
            details: error.message,
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            include: {
                profile: true,
                sellerProfile: true,
                addresses: true,
            },
        });

        res.json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                profile: user.profile,
                sellerProfile: user.sellerProfile,
                addresses: user.addresses,
            },
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch profile",
            details: error.message,
        });
    }
};
