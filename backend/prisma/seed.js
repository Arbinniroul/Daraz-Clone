// prisma/seed.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ========== USERS ==========
const users = [
    {
        id: "661c0d1e4f8a9b2c3d4e5f88",
        email: "tech@example.com",
        username: "Tech Store Owner",
        password: "$2b$10$examplehashedpassword", // You should hash real passwords
        role: "SELLER",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "661c0d1e4f8a9b2c3d4e5f89",
        email: "fashion@example.com",
        username: "Fashion Store Owner",
        password: "$2b$10$examplehashedpassword",
        role: "SELLER",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "661c0d1e4f8a9b2c3d4e5f90",
        email: "home@example.com",
        username: "Home Store Owner",
        password: "$2b$10$examplehashedpassword",
        role: "SELLER",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "661c0d1e4f8a9b2c3d4e5f91",
        email: "books@example.com",
        username: "Book Store Owner",
        password: "$2b$10$examplehashedpassword",
        role: "SELLER",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "661c0d1e4f8a9b2c3d4e5f92",
        email: "customer1@example.com",
        username: "John Customer",
        password: "$2b$10$examplehashedpassword",
        role: "CUSTOMER",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "661c0d1e4f8a9b2c3d4e5f93",
        email: "customer2@example.com",
        username: "Jane Customer",
        password: "$2b$10$examplehashedpassword",
        role: "CUSTOMER",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

// ========== CATEGORIES ==========
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

// ========== SELLER PROFILES ==========
const sellerProfiles = [
    {
        id: "661c0c1e4f8a9b2c3d4e5f99",
        storeName: "TechStore",
        storeDescription: "Your one-stop shop for electronics",
        businessEmail: "tech@example.com",
        businessPhone: "+1234567890",
        isVerified: true,
        rating: 4.5,
        userId: "661c0d1e4f8a9b2c3d4e5f88", // Links to tech user
    },
    {
        id: "661c0c1e4f8a9b2c3d4e5f98",
        storeName: "FashionHub",
        storeDescription: "Trendy clothing for everyone",
        businessEmail: "fashion@example.com",
        businessPhone: "+1234567891",
        isVerified: true,
        rating: 4.3,
        userId: "661c0d1e4f8a9b2c3d4e5f89", // Links to fashion user
    },
    {
        id: "661c0c1e4f8a9b2c3d4e5f97",
        storeName: "HomeEssentials",
        storeDescription: "Everything for your home",
        businessEmail: "home@example.com",
        businessPhone: "+1234567892",
        isVerified: true,
        rating: 4.7,
        userId: "661c0d1e4f8a9b2c3d4e5f90", // Links to home user
    },
    {
        id: "661c0c1e4f8a9b2c3d4e5f96",
        storeName: "BookWorld",
        storeDescription: "Your literary paradise",
        businessEmail: "books@example.com",
        businessPhone: "+1234567893",
        isVerified: true,
        rating: 4.8,
        userId: "661c0d1e4f8a9b2c3d4e5f91", // Links to books user
    },
];

const products = [
    // ========== ELECTRONICS (TechStore - User: 661c0d1e4f8a9b2c3d4e5f88) ==========
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
        userId: "661c0d1e4f8a9b2c3d4e5f88",
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
        userId: "661c0d1e4f8a9b2c3d4e5f88",
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
        userId: "661c0d1e4f8a9b2c3d4e5f88",
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
        userId: "661c0d1e4f8a9b2c3d4e5f88",
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
        userId: "661c0d1e4f8a9b2c3d4e5f88",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f35",
                quantity: 40,
                sku: "IPADAIR-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f16",
        name: "Apple Watch Series 9",
        description: "Advanced smartwatch with health monitoring features",
        price: 399.99,
        salePrice: 349.99,
        discount: 13,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1579586337278-3fecf86104f1?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
        userId: "661c0d1e4f8a9b2c3d4e5f88",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f36",
                quantity: 35,
                sku: "AWS9-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f17",
        name: "Dell XPS 13 Laptop",
        description: "Compact laptop with infinity-edge display",
        price: 1199.99,
        salePrice: 999.99,
        discount: 17,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
        userId: "661c0d1e4f8a9b2c3d4e5f88",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f37",
                quantity: 20,
                sku: "DellXPS13-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f18",
        name: "Samsung 4K Smart TV",
        description: "55-inch 4K UHD Smart TV with HDR",
        price: 699.99,
        salePrice: 599.99,
        discount: 14,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
        userId: "661c0d1e4f8a9b2c3d4e5f88",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f38",
                quantity: 15,
                sku: "SAMSUNGTV55-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f19",
        name: "Nintendo Switch OLED",
        description: "Gaming console with vibrant OLED screen",
        price: 349.99,
        salePrice: 299.99,
        discount: 14,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1556009114-16d4320f695b?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
        userId: "661c0d1e4f8a9b2c3d4e5f88",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f39",
                quantity: 25,
                sku: "NSWITCHOLED-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f1a",
        name: "Bose QuietComfort Earbuds",
        description: "Wireless earbuds with noise cancellation",
        price: 279.99,
        salePrice: 229.99,
        discount: 18,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
        userId: "661c0d1e4f8a9b2c3d4e5f88",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f3a",
                quantity: 40,
                sku: "BoseQC-001",
            },
        },
    },

    // ========== CLOTHING (FashionHub - User: 661c0d1e4f8a9b2c3d4e5f89) ==========
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
        userId: "661c0d1e4f8a9b2c3d4e5f89",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f41",
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
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
        sellerId: "661c0c1e4f8a9b2c3d4e5f98",
        userId: "661c0d1e4f8a9b2c3d4e5f89",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f42",
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
        userId: "661c0d1e4f8a9b2c3d4e5f89",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f43",
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
        userId: "661c0d1e4f8a9b2c3d4e5f89",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f44",
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
        userId: "661c0d1e4f8a9b2c3d4e5f89",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f45",
                quantity: 35,
                sku: "TNFJACKET-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f26",
        name: "Zara Blazer",
        description: "Elegant blazer for formal occasions",
        price: 129.99,
        salePrice: 99.99,
        discount: 23,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
        sellerId: "661c0c1e4f8a9b2c3d4e5f98",
        userId: "661c0d1e4f8a9b2c3d4e5f89",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f46",
                quantity: 45,
                sku: "ZARABLAZER-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f27",
        name: "Under Armour Hoodie",
        description: "Comfortable athletic hoodie for workouts",
        price: 59.99,
        salePrice: 44.99,
        discount: 25,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
        sellerId: "661c0c1e4f8a9b2c3d4e5f98",
        userId: "661c0d1e4f8a9b2c3d4e5f89",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f47",
                quantity: 80,
                sku: "UAHOODIE-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f28",
        name: "H&M Summer Dress",
        description: "Light and breezy dress for summer",
        price: 39.99,
        salePrice: 29.99,
        discount: 25,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
        sellerId: "661c0c1e4f8a9b2c3d4e5f98",
        userId: "661c0d1e4f8a9b2c3d4e5f89",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f48",
                quantity: 120,
                sku: "HMDRESS-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f29",
        name: "Puma Running Shorts",
        description: "Lightweight shorts for running and training",
        price: 34.99,
        salePrice: 24.99,
        discount: 29,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
        sellerId: "661c0c1e4f8a9b2c3d4e5f98",
        userId: "661c0d1e4f8a9b2c3d4e5f89",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f49",
                quantity: 90,
                sku: "PUMASHORTS-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f2a",
        name: "Calvin Klein Underwear Pack",
        description: "3-pack of comfortable cotton underwear",
        price: 45.99,
        salePrice: 34.99,
        discount: 24,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
        sellerId: "661c0c1e4f8a9b2c3d4e5f98",
        userId: "661c0d1e4f8a9b2c3d4e5f89",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f4a",
                quantity: 150,
                sku: "CKUNDER-001",
            },
        },
    },

    // ========== HOME & KITCHEN (HomeEssentials - User: 661c0d1e4f8a9b2c3d4e5f90) ==========
    {
        id: "661c0b2e4f8a9b2c3d4e5f31",
        name: "KitchenAid Stand Mixer",
        description: "Professional stand mixer for baking enthusiasts",
        price: 429.99,
        salePrice: 379.99,
        discount: 12,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
        sellerId: "661c0c1e4f8a9b2c3d4e5f97",
        userId: "661c0d1e4f8a9b2c3d4e5f90",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f51",
                quantity: 25,
                sku: "KITCHENAID-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f32",
        name: "Instant Pot Duo",
        description: "7-in-1 multi-functional pressure cooker",
        price: 99.99,
        salePrice: 79.99,
        discount: 20,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
        sellerId: "661c0c1e4f8a9b2c3d4e5f97",
        userId: "661c0d1e4f8a9b2c3d4e5f90",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f52",
                quantity: 40,
                sku: "INSTANTPOT-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f33",
        name: "Non-Stick Cookware Set",
        description: "10-piece non-stick cookware set",
        price: 199.99,
        salePrice: 149.99,
        discount: 25,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
        sellerId: "661c0c1e4f8a9b2c3d4e5f97",
        userId: "661c0d1e4f8a9b2c3d4e5f90",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f53",
                quantity: 30,
                sku: "COOKWARESET-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f34",
        name: "Memory Foam Mattress",
        description: "Queen size memory foam mattress for better sleep",
        price: 899.99,
        salePrice: 699.99,
        discount: 22,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
        sellerId: "661c0c1e4f8a9b2c3d4e5f97",
        userId: "661c0d1e4f8a9b2c3d4e5f90",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f54",
                quantity: 15,
                sku: "MATTRESS-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f35",
        name: "Dyson Vacuum Cleaner",
        description: "Cordless stick vacuum with powerful suction",
        price: 449.99,
        salePrice: 399.99,
        discount: 11,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
        sellerId: "661c0c1e4f8a9b2c3d4e5f97",
        userId: "661c0d1e4f8a9b2c3d4e5f90",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f55",
                quantity: 20,
                sku: "DYSONVAC-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f36",
        name: "Air Fryer XL",
        description: "Large capacity air fryer for healthy cooking",
        price: 129.99,
        salePrice: 99.99,
        discount: 23,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
        sellerId: "661c0c1e4f8a9b2c3d4e5f97",
        userId: "661c0d1e4f8a9b2c3d4e5f90",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f56",
                quantity: 35,
                sku: "AIRFRYER-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f37",
        name: "Egyptian Cotton Sheets",
        description: "1000 thread count luxury bed sheets",
        price: 149.99,
        salePrice: 119.99,
        discount: 20,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
        sellerId: "661c0c1e4f8a9b2c3d4e5f97",
        userId: "661c0d1e4f8a9b2c3d4e5f90",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f57",
                quantity: 50,
                sku: "SHEETS-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f38",
        name: "Smart Coffee Maker",
        description: "WiFi enabled coffee maker with app control",
        price: 199.99,
        salePrice: 159.99,
        discount: 20,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
        sellerId: "661c0c1e4f8a9b2c3d4e5f97",
        userId: "661c0d1e4f8a9b2c3d4e5f90",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f58",
                quantity: 25,
                sku: "SMARTCOFFEE-001",
            },
        },
    },

    // ========== BOOKS (BookWorld - User: 661c0d1e4f8a9b2c3d4e5f91) ==========
    {
        id: "661c0b2e4f8a9b2c3d4e5f41",
        name: "The Midnight Library",
        description: "Novel by Matt Haig about life choices and regrets",
        price: 24.99,
        salePrice: 19.99,
        discount: 20,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f04",
        sellerId: "661c0c1e4f8a9b2c3d4e5f96",
        userId: "661c0d1e4f8a9b2c3d4e5f91",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f61",
                quantity: 100,
                sku: "BOOK-MIDNIGHT-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f42",
        name: "Atomic Habits",
        description: "James Clear's guide to building good habits",
        price: 27.99,
        salePrice: 22.99,
        discount: 18,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f04",
        sellerId: "661c0c1e4f8a9b2c3d4e5f96",
        userId: "661c0d1e4f8a9b2c3d4e5f91",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f62",
                quantity: 85,
                sku: "BOOK-ATOMIC-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f43",
        name: "The Hobbit",
        description: "J.R.R. Tolkien's classic fantasy adventure",
        price: 18.99,
        salePrice: 14.99,
        discount: 21,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f04",
        sellerId: "661c0c1e4f8a9b2c3d4e5f96",
        userId: "661c0d1e4f8a9b2c3d4e5f91",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f63",
                quantity: 120,
                sku: "BOOK-HOBBIT-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f44",
        name: "Python Programming Guide",
        description: "Complete guide to Python programming for beginners",
        price: 39.99,
        salePrice: 31.99,
        discount: 20,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f04",
        sellerId: "661c0c1e4f8a9b2c3d4e5f96",
        userId: "661c0d1e4f8a9b2c3d4e5f91",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f64",
                quantity: 60,
                sku: "BOOK-PYTHON-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f45",
        name: "Harry Potter Complete Collection",
        description: "All 7 Harry Potter books in a beautiful box set",
        price: 89.99,
        salePrice: 69.99,
        discount: 22,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f04",
        sellerId: "661c0c1e4f8a9b2c3d4e5f96",
        userId: "661c0d1e4f8a9b2c3d4e5f91",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f65",
                quantity: 30,
                sku: "BOOK-HP-COLLECTION-001",
            },
        },
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f46",
        name: "The Alchemist",
        description: "Paulo Coelho's inspirational novel",
        price: 16.99,
        salePrice: 12.99,
        discount: 24,
        isOnSale: true,
        images: [
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f04",
        sellerId: "661c0c1e4f8a9b2c3d4e5f96",
        userId: "661c0d1e4f8a9b2c3d4e5f91",
        inventory: {
            create: {
                id: "661c0b2e4f8a9b2c3d4e5f66",
                quantity: 80,
                sku: "BOOK-ALCHEMIST-001",
            },
        },
    },
];

async function main() {
    console.log("Start seeding...");

    try {
        // Clean up existing data
        console.log("🗑️  Cleaning up existing data...");
        await prisma.productInventory.deleteMany();

        await prisma.sellerProfile.deleteMany();
        await prisma.category.deleteMany();
        await prisma.user.deleteMany(); // Clean users first

        console.log("✅ Database cleaned");

        // Create users first
        console.log("👤 Creating users...");
        for (const user of users) {
            await prisma.user.create({
                data: user,
            });
        }
        console.log("✅ Created users");

        // Create categories
        console.log("📁 Creating categories...");
        for (const category of categories) {
            await prisma.category.create({
                data: category,
            });
        }
        console.log("✅ Created categories");

        // Create seller profiles
        console.log("👨‍💼 Creating seller profiles...");
        for (const seller of sellerProfiles) {
            await prisma.sellerProfile.create({
                data: seller,
            });
        }
        console.log("✅ Created seller profiles");

        // Create products with inventory
        console.log("📦 Creating products...");
        for (const product of products) {
            await prisma.product.create({
                data: {
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
                    userId: product.userId, // Include userId
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
