import dotenv from "dotenv";
import express from "express";
import prisma from "./db/connection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Test database connection on startup
async function testConnection() {
    try {
        await prisma.$connect();
        console.log("✅ Prisma client connected successfully!");

        // For MongoDB, let's try a simpler approach
        // Just list collections or check connection without querying models
        console.log("🔄 Testing database operations...");

        // Try to count users (this will work even if collection is empty)
        const userCount = await prisma.user.count();
        console.log(`✅ Database operations working! User count: ${userCount}`);

        return true;
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);

        // More detailed error information
        if (error.message.includes("fetch failed")) {
            console.log(
                "💡 This usually means MongoDB is not running or connection string is wrong"
            );
            console.log("💡 Check if MongoDB is running: mongod");
            console.log("💡 Check your DATABASE_URL in .env file");
        }

        return false;
    }
}

// Health check route
app.get("/", async (req, res) => {
    try {
        // Simple count query that works with MongoDB
        const userCount = await prisma.user.count();
        res.json({
            message: "Database is connected ✅",
            database: "Connected",
            userCount: userCount,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({
            message: "Database connection failed ❌",
            database: "Disconnected",
            error: error.message,
            timestamp: new Date().toISOString(),
        });
    }
});

// Simple test route that doesn't require database
app.get("/api/test", (req, res) => {
    res.json({
        message: "API server is running ✅",
        timestamp: new Date().toISOString(),
    });
});

// Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
    console.log(`Health check: http://localhost:${PORT}/`);

    // Test connection on startup
    await testConnection();
});
