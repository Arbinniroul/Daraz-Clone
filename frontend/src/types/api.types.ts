// Standard API response format
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    code?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

// API error response
export interface ApiError {
    error: string;
    code: string;
    details?: any;
    timestamp?: string;
}

// Pagination parameters
export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

// Search parameters
export interface SearchParams extends PaginationParams {
    query?: string;
    filters?: Record<string, any>;
}
