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

// Main product type for frontend
export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    images: string[];
    categoryId: string;
    category: Category;
    seller?: ProductSeller;
    inventory?: ProductInventory;
    reviews: Review[];
    averageRating?: number;
    reviewCount?: number;
    createdAt: string;
    updatedAt: string;
}

// Product filters and pagination
export interface ProductFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: "price" | "name" | "rating" | "createdAt";
    sortOrder?: "asc" | "desc";
    inStock?: boolean;
}

export interface ProductQuery extends ProductFilters {
    page?: number;
    limit?: number;
}

export interface ProductsResponse {
    products: Product[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

// Product form data
export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    categoryId: string;
    images: string[];
    inventory: {
        quantity: number;
        sku?: string;
    };
}
