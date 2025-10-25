// types/cart.ts
export interface CartItem {
    id: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        price: number;
        salePrice?: number ;
        images: string[];
        inventory?: {
            quantity: number;
        };
        hasDiscount?:boolean ;
        discountPercentage?: number;
        seller?: {
            storeName: string;
            user?: {
                username: string;
            };
        };
    };
}

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
}

export interface AddToCartRequest {
    productId: string;
    quantity: number;
}

export interface UpdateCartItemRequest {
    quantity: number;
}

// Redux state
export interface CartState {
    cart: Cart | null;
    items: CartItem[];
    loading: boolean;
    error: string | null;
    lastAction: "added" | "updated" | "removed" | null;
    totalCartItems:number 
}
