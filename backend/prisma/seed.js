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
    // Electronics (10 products)
    {
        id: "661c0b2e4f8a9b2c3d4e5f11",
        name: "iPhone 15 Pro",
        description:
            "Latest Apple iPhone with A17 Pro chip and titanium design",
        price: 999.99,
        images: [
            "https://example.com/iphone15-1.jpg",
            "https://example.com/iphone15-2.jpg",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
        userId: "661c0d1e4f8a9b2c3d4e5f88",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f12",
        name: "Samsung Galaxy S24",
        description: "Powerful Android smartphone with advanced AI features",
        price: 849.99,
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
        images: [
            "https://example.com/macbook-air-1.jpg",
            "https://example.com/macbook-air-2.jpg",
        ],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
        sellerId: "661c0c1e4f8a9b2c3d4e5f99",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f14",
        name: "Sony WH-1000XM5",
        description: "Industry-leading noise canceling wireless headphones",
        price: 399.99,
        images: ["https://example.com/sony-headphones-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f15",
        name: "iPad Air",
        description: "Versatile tablet with M1 chip and stunning display",
        price: 599.99,
        images: ["https://example.com/ipad-air-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f16",
        name: "Apple Watch Series 9",
        description: "Advanced smartwatch with health monitoring features",
        price: 399.99,
        images: ["https://example.com/apple-watch-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f17",
        name: "Dell XPS 13",
        description: "Compact laptop with infinity edge display",
        price: 1099.99,
        images: ["https://example.com/dell-xps-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f18",
        name: "AirPods Pro",
        description: "Wireless earbuds with active noise cancellation",
        price: 249.99,
        images: ["https://example.com/airpods-pro-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f19",
        name: "Canon EOS R5",
        description: "Professional mirrorless camera for photography",
        price: 3899.99,
        images: ["https://example.com/canon-r5-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f1a",
        name: "PlayStation 5",
        description: "Next-gen gaming console with 4K graphics",
        price: 499.99,
        images: ["https://example.com/ps5-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f01",
    },

    // Clothing (10 products)
    {
        id: "661c0b2e4f8a9b2c3d4e5f21",
        name: "Nike Air Max 270",
        description: "Comfortable running shoes with air cushioning",
        price: 150.0,
        images: ["https://example.com/nike-airmax-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f22",
        name: "Levi's 501 Jeans",
        description: "Classic straight fit jeans for everyday wear",
        price: 89.99,
        images: ["https://example.com/levis-jeans-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f23",
        name: "Adidas Ultraboost",
        description: "High-performance running shoes with boost technology",
        price: 180.0,
        images: ["https://example.com/adidas-ultraboost-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f24",
        name: "North Face Jacket",
        description: "Waterproof jacket for outdoor activities",
        price: 199.99,
        images: ["https://example.com/northface-jacket-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f25",
        name: "Uniqlo Cotton T-Shirt",
        description: "Soft cotton t-shirt available in multiple colors",
        price: 14.99,
        images: ["https://example.com/uniqlo-tshirt-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f26",
        name: "Ray-Ban Aviator Sunglasses",
        description: "Classic aviator style sunglasses with UV protection",
        price: 153.0,
        images: ["https://example.com/rayban-aviator-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f27",
        name: "Patagonia Fleece Jacket",
        description: "Sustainable fleece jacket for outdoor enthusiasts",
        price: 139.0,
        images: ["https://example.com/patagonia-fleece-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f28",
        name: "Converse Chuck Taylor",
        description: "Iconic canvas sneakers for casual wear",
        price: 55.0,
        images: ["https://example.com/converse-chucks-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f29",
        name: "Calvin Klein Underwear Pack",
        description: "3-pack of comfortable cotton underwear",
        price: 35.0,
        images: ["https://example.com/ck-underwear-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f2a",
        name: "Zara Blazer",
        description: "Elegant blazer for formal occasions",
        price: 89.99,
        images: ["https://example.com/zara-blazer-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f02",
    },

    // Home & Kitchen (10 products)
    {
        id: "661c0b2e4f8a9b2c3d4e5f31",
        name: "Instant Pot Duo",
        description: "7-in-1 multi-functional pressure cooker",
        price: 99.99,
        images: ["https://example.com/instant-pot-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f32",
        name: "KitchenAid Stand Mixer",
        description: "Professional stand mixer for baking enthusiasts",
        price: 429.99,
        images: ["https://example.com/kitchenaid-mixer-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f33",
        name: "Ninja Air Fryer",
        description: "Digital air fryer with multiple cooking functions",
        price: 129.99,
        images: ["https://example.com/ninja-airfryer-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f34",
        name: "Dyson V11 Vacuum",
        description: "Cordless stick vacuum with powerful suction",
        price: 599.99,
        images: ["https://example.com/dyson-v11-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f35",
        name: "All-Clad Cookware Set",
        description: "10-piece stainless steel cookware set",
        price: 799.99,
        images: ["https://example.com/allclad-cookware-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f36",
        name: "Tempur-Pedic Pillow",
        description: "Memory foam pillow for neck support",
        price: 89.99,
        images: ["https://example.com/tempur-pillow-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f37",
        name: "Vitamix Blender",
        description: "Professional-grade blender for smoothies and soups",
        price: 449.99,
        images: ["https://example.com/vitamix-blender-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f38",
        name: "Cuisinart Coffee Maker",
        description: "Programmable coffee maker with thermal carafe",
        price: 149.99,
        images: ["https://example.com/cuisinart-coffee-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f39",
        name: "Bodum French Press",
        description: "Classic French press for coffee brewing",
        price: 29.99,
        images: ["https://example.com/bodum-frenchpress-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f3a",
        name: "Lodge Cast Iron Skillet",
        description: "Pre-seasoned cast iron skillet for versatile cooking",
        price: 24.99,
        images: ["https://example.com/lodge-skillet-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f03",
    },

    // Books (5 products)
    {
        id: "661c0b2e4f8a9b2c3d4e5f41",
        name: "Atomic Habits",
        description: "Build good habits and break bad ones",
        price: 13.99,
        images: ["https://example.com/atomic-habits-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f04",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f42",
        name: "The Midnight Library",
        description: "Novel about life choices and second chances",
        price: 15.99,
        images: ["https://example.com/midnight-library-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f04",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f43",
        name: "Dune",
        description: "Science fiction classic by Frank Herbert",
        price: 9.99,
        images: ["https://example.com/dune-book-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f04",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f44",
        name: "Harry Potter Box Set",
        description: "Complete collection of all 7 Harry Potter books",
        price: 79.99,
        images: ["https://example.com/harry-potter-set-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f04",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f45",
        name: "The Hobbit",
        description: "Fantasy novel by J.R.R. Tolkien",
        price: 12.99,
        images: ["https://example.com/hobbit-book-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f04",
    },

    // Sports (5 products)
    {
        id: "661c0b2e4f8a9b2c3d4e5f51",
        name: "Yoga Mat Premium",
        description: "Non-slip yoga mat for exercise and meditation",
        price: 29.99,
        images: ["https://example.com/yoga-mat-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f05",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f52",
        name: "Wilson Basketball",
        description: "Official size basketball for indoor and outdoor play",
        price: 49.99,
        images: ["https://example.com/wilson-basketball-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f05",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f53",
        name: "Adidas Soccer Ball",
        description: "Professional soccer ball for training and matches",
        price: 34.99,
        images: ["https://example.com/adidas-soccer-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f05",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f54",
        name: "Fitbit Charge 6",
        description: "Advanced fitness tracker with heart rate monitoring",
        price: 149.99,
        images: ["https://example.com/fitbit-charge-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f05",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f55",
        name: "Under Armour Running Shorts",
        description: "Lightweight running shorts with moisture-wicking",
        price: 24.99,
        images: ["https://example.com/ua-shorts-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f05",
    },

    // Beauty (5 products)
    {
        id: "661c0b2e4f8a9b2c3d4e5f61",
        name: "La Mer Moisturizing Cream",
        description: "Luxury face cream with hydrating formula",
        price: 185.0,
        images: ["https://example.com/la-mer-cream-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f06",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f62",
        name: "Dyson Supersonic Hair Dryer",
        description: "Professional hair dryer with intelligent heat control",
        price: 429.99,
        images: ["https://example.com/dyson-hair-dryer-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f06",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f63",
        name: "Charlotte Tilbury Pillow Talk Lipstick",
        description: "Iconic nude pink lipstick for everyday wear",
        price: 34.0,
        images: ["https://example.com/ct-lipstick-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f06",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f64",
        name: "Olaplex Hair Perfector",
        description: "Repair treatment for damaged and compromised hair",
        price: 28.0,
        images: ["https://example.com/olaplex-treatment-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f06",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f65",
        name: "Drunk Elephant Skincare Set",
        description: "Complete skincare routine for healthy skin",
        price: 78.0,
        images: ["https://example.com/drunk-elephant-set-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f06",
    },

    // Toys (5 products)
    {
        id: "661c0b2e4f8a9b2c3d4e5f71",
        name: "LEGO Star Wars Millennium Falcon",
        description: "Detailed LEGO set of the iconic spaceship",
        price: 159.99,
        images: ["https://example.com/lego-millennium-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f07",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f72",
        name: "Barbie Dreamhouse",
        description: "3-story dollhouse with furniture and accessories",
        price: 199.99,
        images: ["https://example.com/barbie-dreamhouse-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f07",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f73",
        name: "Nerf Elite Disruptor Blaster",
        description: "Dart blaster with 6-dart rotating drum",
        price: 19.99,
        images: ["https://example.com/nerf-blaster-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f07",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f74",
        name: "Play-Doh 10-Pack",
        description: "Assorted colors of modeling compound for kids",
        price: 7.99,
        images: ["https://example.com/playdoh-pack-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f07",
    },
    {
        id: "661c0b2e4f8a9b2c3d4e5f75",
        name: "Hot Wheels 20-Car Pack",
        description: "Collection of 20 different die-cast cars",
        price: 24.99,
        images: ["https://example.com/hot-wheels-pack-1.jpg"],
        categoryId: "661c0a1e4f8a9b2c3d4e5f07",
    },
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
