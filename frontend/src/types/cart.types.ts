// Cart item with product details
export interface CartItem {
    id: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        price: number;
        images: string[];
        inventory?: {
            quantity: number;
        };
        seller?: {
            storeName: string;
        };
    };
}

// Shopping cart
export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    createdAt: string;
    updatedAt: string;
}

// Cart operations
export interface AddToCartRequest {
    productId: string;
    quantity: number;
}

export interface UpdateCartItemRequest {
    quantity: number;
}
