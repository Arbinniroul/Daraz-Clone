// prisma/seed.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
    {
        id: "661c0a1e4f8a9b2c3d4e5f01",
        name: "Electronics",
        slug: "electronics",
    },
    { id: "661c0a1e4f8a9b2c3d4e5f02", name: "Clothing", slug: "clothing" },
    {
        id: "661c0a1e4f8a9b2c3d4e5f03",
        name: "Home & Kitchen",
        slug: "home-kitchen",
    },
    { id: "661c0a1e4f8a9b2c3d4e5f04", name: "Books", slug: "books" },
    { id: "661c0a1e4f8a9b2c3d4e5f05", name: "Sports", slug: "sports" },
    { id: "661c0a1e4f8a9b2c3d4e5f06", name: "Beauty", slug: "beauty" },
    { id: "661c0a1e4f8a9b2c3d4e5f07", name: "Toys", slug: "toys" },
];

// Create some seller profiles first
const sellerProfiles = [
    {
        id: "661c0c1e4f8a9b2c3d4e5f99",
        storeName: "TechStore",
        storeDescription: "Your one-stop shop for electronics",
        businessEmail: "tech@example.com",
        businessPhone: "+1234567890",
        isVerified: true,
        rating: 4.5,
        userId: "661c0d1e4f8a9b2c3d4e5f88", // You need to create a user first
    },
    {
        id: "661c0c1e4f8a9b2c3d4e5f98",
        storeName: "FashionHub",
        storeDescription: "Trendy clothing for everyone",
        businessEmail: "fashion@example.com",
        businessPhone: "+1234567891",
        isVerified: true,
        rating: 4.3,
        userId: "661c0d1e4f8a9b2c3d4e5f89",
    },
];

const products = [
    // Electronics with sales
    {
        id: "661c0b2e4f8a9b2c3d4e5f11",
        name: "iPhone 15 Pro",
        description:
            "Latest Apple iPhone with A17 Pro chip and titanium design",
        price: 999.99,
        salePrice: 899.99,
        discount: 10,
        isOnSale: true,
        saleStart: new Date("2025-01-01"),
        saleEnd: new Date("2025-12-31"),
        images: [
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f31",
                quantity: 50,
                sku: "IPHONE15PRO-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f12",
        name: "Samsung Galaxy S24",
        description: "Powerful Android smartphone with advanced AI features",
        price: 849.99,
        salePrice: 749.99,
        discount: 12,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f32",
                quantity: 30,
                sku: "SGS24-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f13",
        name: "MacBook Air M3",
        description:
            "Lightweight laptop with Apple M3 chip for ultimate performance",
        price: 1299.99,
        salePrice: 1099.99,
        discount: 15,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f33",
                quantity: 25,
                sku: "MBAM3-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f14",
        name: "Sony WH-1000XM5",
        description: "Industry-leading noise canceling wireless headphones",
        price: 399.99,
        salePrice: 349.99,
        discount: 13,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f34",
                quantity: 15,
                sku: "SONYXM5-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f15",
        name: "iPad Air",
        description: "Versatile tablet with M1 chip and stunning display",
        price: 599.99,
        salePrice: 499.99,
        discount: 17,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f35",
                quantity: 40,
                sku: "IPADAIR-001",
            },
        },
    },

    // Clothing with sales
    {
        id: "661c0b2e4f8a9b2c3d4e5f21",
        name: "Nike Air Max 270",
        description: "Comfortable running shoes with air cushioning",
        price: 150.0,
        salePrice: 120.0,
        discount: 20,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
        sellerId: "661c0c1e4f8a9b2c3d4e5f98",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f36",
                quantity: 100,
                sku: "NIKEAM270-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f22",
        name: "Levi's 501 Jeans",
        description: "Classic straight fit jeans for everyday wear",
        price: 89.99,
        salePrice: 69.99,
        discount: 22,
        isOnSale: true,
        saleStart: new Date("2025-01-15"),
        saleEnd: new Date("2025-02-15"),
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
        sellerId: "661c0c1e4f8a9b2c3d4e5f98",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f37",
                quantity: 75,
                sku: "LEVI501-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f23",
        name: "Adidas Ultraboost",
        description: "High-performance running shoes with boost technology",
        price: 180.0,
        salePrice: 144.0,
        discount: 20,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
        sellerId: "661c0c1e4f8a9b2c3d4e5f98",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f38",
                quantity: 60,
                sku: "ADIDASUB-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f24",
        name: "Uniqlo Cotton T-Shirt",
        description: "Soft cotton t-shirt available in multiple colors",
        price: 14.99,
        salePrice: 11.99,
        discount: 20,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
        sellerId: "661c0c1e4f8a9b2c3d4e5f98",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f39",
                quantity: 200,
                sku: "UNIQLOTS-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f25",
        name: "North Face Jacket",
        description: "Waterproof jacket for outdoor activities",
        price: 199.99,
        salePrice: 159.99,
        discount: 20,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
        sellerId: "661c0c1e4f8a9b2c3d4e5f98",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f3a",
                quantity: 35,
                sku: "TNFJACKET-001",
            },
        },
    },
];

async function main() {
    console.log("Start seeding...");

    try {
        // Create categories
        for (const category of categories) {
            await prisma.category.upsert({
                where: { id: category.id },
                update: {},
                create: category,
            });
        }
        console.log("✅ Created categories");

        // Create products with inventory
        for (const product of products) {
            await prisma.product.upsert({
                where: { id: product.id },
                update: {},
                create: {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    salePrice: product.salePrice,
                    discount: product.discount,
                    isOnSale: product.isOnSale,
                    saleStart: product.saleStart,
                    saleEnd: product.saleEnd,
                    images: product.images,
                    categoryId: product.categoryId,
                    sellerId: product.sellerId,
                    inventory: product.inventory,
                },
            });
        }
        console.log("✅ Created products with inventory");

        console.log("🎉 Seeding finished successfully!");
    } catch (error) {
        console.error("❌ Seeding error:", error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error("💥 Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
