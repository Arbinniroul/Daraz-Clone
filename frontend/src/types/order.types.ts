// Order status
export type OrderStatus =
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "REFUNDED";

// Payment method
export type PaymentMethod =
    | "CREDIT_CARD"
    | "DEBIT_CARD"
    | "PAYPAL"
    | "STRIPE"
    | "CASH_ON_DELIVERY";

// Payment status
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

// Order item
export interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    product: {
        id: string;
        name: string;
        images: string[];
    };
}

// Payment info
export interface Payment {
    id: string;
    amount: number;
    status: PaymentStatus;
    method: PaymentMethod;
    transactionId?: string;
    createdAt: string;
}

// Shipping address
export interface Address {
    id: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    isDefault: boolean;
}

// Main order type
export interface Order {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    total: number;
    items: OrderItem[];
    address: Address;
    payments: Payment[];
    createdAt: string;
    updatedAt: string;
}

// Order creation request
export interface CreateOrderRequest {
    addressId: string;
    paymentMethod: PaymentMethod;
}

// Order response with pagination
export interface OrdersResponse {
    orders: Order[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
