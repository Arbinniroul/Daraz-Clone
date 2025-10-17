// Address management
export interface AddressFormData {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    isDefault: boolean;
}

// Profile update
export interface ProfileUpdateData {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    dateOfBirth?: string;
}

// Become seller request
export interface BecomeSellerRequest {
    storeName: string;
    storeDescription?: string;
    businessEmail?: string;
    businessPhone?: string;
}

// User statistics (for dashboard)
export interface UserStats {
    totalOrders: number;
    pendingOrders: number;
    totalReviews: number;
    totalSpent: number;
}

export interface SellerStats extends UserStats {
    totalProducts: number;
    totalSales: number;
    totalRevenue: number;
    pendingOrders: number;
}
