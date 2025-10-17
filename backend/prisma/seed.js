// prisma/seed.js
import {PrismaClient} from "@prisma/client";

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
        saleStart: new Date("2024-01-01"),
        saleEnd: new Date("2024-12-31"),
        images: [
            "https://example.com/iphone15-1.jpg",
            "https://example.com/iphone15-2.jpg",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f12",
        name: "Samsung Galaxy S24",
        description: "Powerful Android smartphone with advanced AI features",
        price: 849.99,
        salePrice: 749.99,
        discount: 12,
        isOnSale: true,
        images: ["https://example.com/galaxy-s24-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f13",
        name: "MacBook Air M3",
        description:
            "Lightweight laptop with Apple M3 chip for ultimate performance",
        price: 1299.99,
        // No sale - regular price
        isOnSale: false,
        images: [
            "https://example.com/macbook-air-1.jpg",
            "https://example.com/macbook-air-2.jpg",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f14",
        name: "Sony WH-1000XM5",
        description: "Industry-leading noise canceling wireless headphones",
        price: 399.99,
        salePrice: 349.99,
        discount: 13,
        isOnSale: true,
        images: ["https://example.com/sony-headphones-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f15",
        name: "iPad Air",
        description: "Versatile tablet with M1 chip and stunning display",
        price: 599.99,
        // No sale
        isOnSale: false,
        images: ["https://example.com/ipad-air-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
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
        images: ["https://example.com/nike-airmax-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f22",
        name: "Levi's 501 Jeans",
        description: "Classic straight fit jeans for everyday wear",
        price: 89.99,
        salePrice: 69.99,
        discount: 22,
        isOnSale: true,
        saleStart: new Date("2024-01-15"),
        saleEnd: new Date("2024-02-15"),
        images: ["https://example.com/levis-jeans-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
    },
    // ... continue with other products mixing sale and non-sale items
];

async function main() {
    console.log("Start seeding...");

    // Create categories
    for (const category of categories) {
        await prisma.category.upsert({
            where: { id: category.id },
            update: {},
            create: category,
        });
    }
    console.log("Created categories");

    // Create products
    for (const product of products) {
        await prisma.product.upsert({
            where: { id: product.id },
            update: {},
            create: product,
        });
    }
    console.log("Created products");

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
