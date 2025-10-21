// Product inventory
export interface ProductInventory {
    id: string;
    quantity: number;
    sku?: string;
}

// Product category
export interface Category {
    id: string;
    name: string;
    slug: string;
    parentId?: string;
    children?: Category[];
    productCount?: number;
}

// Simplified seller info for products
export interface ProductSeller {
    id: string;
    storeName: string;
    isVerified: boolean;
    rating?: number;
    user: {
        username: string;
        email: string;
    };
}

// Review with user info
export interface Review {
    id: string;
    rating: number;
    comment?: string;
    createdAt: string;
    user: {
        username: string;
        profile?: {
            firstName?: string;
            lastName?: string;
            avatar?: string;
        };
    };
}

// Base product type (from Prisma schema)
export interface BaseProduct {
    id: string;
    name: string;
    description?: string;
    price: number;
    salePrice?: number;
    discount?: number;
    isOnSale: boolean;
    saleStart?: string;
    saleEnd?: string;
    images: string[];
    categoryId: string;
    createdAt: string;
    updatedAt: string;
}

// Main product type for frontend with relationships
export interface Product extends BaseProduct {
    category: Category;
    seller?: ProductSeller;
    inventory?: ProductInventory;
    reviews: Review[];
    averageRating?: number;
    reviewCount?: number;
}

// Product with additional details (for detailed views)
export interface ProductWithDetails extends Omit<Product, "seller"> {
    seller: ProductSeller & {
        storeDescription?: string;
        businessEmail?: string;
        businessPhone?: string;
        user: {
            username: string;
            email: string;
        };
    };
    _count?: {
        reviews: number;
    };
}

// Product with computed pricing for frontend display
export interface ProductWithPricing extends Product {
    currentPrice: number;
    isSaleActive: boolean;
    savingsAmount?: number;
    savingsPercentage?: number;
}

// Product filters and pagination
export interface ProductFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    onSale?: boolean;
    discountMin?: number;
    discountMax?: number;
    inStock?: boolean;
    sortBy?: "price" | "name" | "rating" | "createdAt" | "discount" | "savings";
    sortOrder?: "asc" | "desc";
}

export interface ProductQuery extends ProductFilters {
    page?: number;
    limit?: number;
}

export interface ProductsResponse {
    products: ProductWithPricing[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

// Product form data for create/update
export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    salePrice?: number;
    discount?: number;
    isOnSale?: boolean;
    saleStart?: string;
    saleEnd?: string;
    categoryId: string;
    images: string[];
    inventory: {
        quantity: number;
        sku?: string;
    };
}

// Sale update data
export interface ProductSaleUpdate {
    salePrice?: number;
    discount?: number;
    isOnSale: boolean;
    saleStart?: string;
    saleEnd?: string;
}

// Product creation response
export interface CreateProductResponse {
    message: string;
    product: Product;
}

// Product update response
export interface UpdateProductResponse {
    message: string;
    product: Product;
}

// Sale products specific response
export interface SaleProductsResponse {
    products: ProductWithPricing[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
    saleStats?: {
        totalProductsOnSale: number;
        averageDiscount: number;
        maxDiscount: number;
    };
}

// Utility types for price calculations
export interface PriceBreakdown {
    originalPrice: number;
    salePrice?: number;
    currentPrice: number;
    discountPercentage?: number;
    savingsAmount?: number;
    isOnSale: boolean;
    isSaleActive: boolean;
}

// Product card props for UI components
export interface ProductCardProps {
    product: ProductWithPricing;
    showSeller?: boolean;
    showCategory?: boolean;
    showSaleBadge?: boolean;
    onAddToCart?: (product: ProductWithPricing) => void;
    onQuickView?: (product: ProductWithPricing) => void;
}

// Product grid props
export interface ProductGridProps {
    products: ProductWithPricing[];
    loading?: boolean;
    emptyMessage?: string;
    columns?: number;
}

// Sale countdown timer (optional)
export interface SaleCountdown {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
}
// Add these to your existing product.types.ts file

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface CreateProductData {
    name: string;
    description?: string;
    price: number;
    salePrice?: number;
    discount?: number;
    isOnSale?: boolean;
    saleStart?: string;
    saleEnd?: string;
    images: string[];
    categoryId: string;
    inventory: {
        quantity: number;
        sku?: string;
    };
}

export interface UpdateProductData extends Partial<CreateProductData> {
    id: string;
}
export interface FilterState extends ProductFilters {
    page: number;
    limit: number;
}

export interface UpdateSaleData {
    salePrice?: number;
    discount?: number;
    isOnSale?: boolean;
    saleStart?: string;
    saleEnd?: string;
}
