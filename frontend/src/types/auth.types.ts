import type { Address } from "./order.types";

// User roles
export type UserRole = "CUSTOMER" | "SELLER" | "ADMIN";

// User profile (simplified for frontend)
export interface UserProfile {
    id: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    dateOfBirth?: string;
}

// Seller profile (simplified for frontend)
export interface SellerProfile {
    id: string;
    storeName: string;
    storeDescription?: string;
    isVerified: boolean;
    rating?: number;
}

// Main user type for frontend
export interface User {
    id: string;
    email: string;
    username: string;
    phone?: string;
    role: UserRole;
    createdAt: string;
    profile?: UserProfile;
    sellerProfile?: SellerProfile;
}

// Authentication types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    username: string;
    phone?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    message?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
export interface AddAddressResponse {
    success: boolean;
    data: Address; 
    message?: string;
}


export interface GetAddressesResponse {
    success: boolean;
    address: Address[];
    message?: string;
}
export interface AddAddressResponse {
    message?: string;
    address: Address;
}

export interface GetAddressesResponse {
    addresses: Address[];
}

export type AddressResponse = AddAddressResponse | GetAddressesResponse;