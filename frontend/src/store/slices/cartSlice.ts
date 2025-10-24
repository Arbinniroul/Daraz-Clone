// cartSlice.ts

import type { AddToCartRequest, Cart, CartItem, CartState } from "@/types";
import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { toast } from "sonner";

// Async Thunks with TypeScript
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }): Promise<Cart> => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/cart/fetch",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch cart");
            }
            return data.cart;
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (
        { productId, quantity = 1 }: AddToCartRequest,
        { rejectWithValue }
    ): Promise<CartItem> => {
        try {
            const response = await fetch("http://localhost:3000/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ productId, quantity }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to add to cart");
            }
            return data.cartItem;
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const updateCartItem = createAsyncThunk(
    "cart/updateCartItem",
    async (
        { id, quantity }: { id: string; quantity: number },
        { rejectWithValue }
    ): Promise<CartItem> => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/cart/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify({ quantity }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to update cart item");
            }
            return data.cartItem;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (id: string, { rejectWithValue }): Promise<string> => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/cart/remove/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to remove from cart");
            }
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
const calculateTotalItems = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
};

const initialState: CartState = {
    cart: null,
    items: [],
    loading: false,
    error: null,
    lastAction: null,
    totalCartItems: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = null;
            state.items = [];
            state.error = null;
            state.lastAction = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearLastAction: (state) => {
            state.lastAction = null;
        },
        updateLocalQuantity: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        // Optimistic update for immediate UI feedback
        optimisticAddToCart: (
            state,
            action: PayloadAction<{
                productId: string;
                product: CartItem["product"];
                quantity?: number;
            }>
        ) => {
            const { productId, product, quantity = 1 } = action.payload;
            const existingItemIndex = state.items.findIndex(
                (item) => item.productId === productId
            );

            if (existingItemIndex >= 0) {
                state.items[existingItemIndex].quantity += quantity;
            } else {
                const tempId = `temp-${Date.now()}`;
                state.items.push({
                    id: tempId,
                    quantity,
                    productId,
                    product,
                } as CartItem);
            }
            state.lastAction = "added";
        },
        optimisticRemoveFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            state.lastAction = "removed";
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchCart.fulfilled,
                (state, action: PayloadAction<Cart>) => {
                    state.loading = false;
                    state.cart = action.payload;
                    state.items = action.payload.items || [];
                    state.error = null;
                    state.totalCartItems = calculateTotalItems(state.items);
                }
            )
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                addToCart.fulfilled,
                (state, action: PayloadAction<CartItem>) => {
                    state.loading = false;
                    const existingItemIndex = state.items.findIndex(
                        (item) => item.productId === action.payload.productId
                    );

                    if (existingItemIndex >= 0) {
                        // Replace temporary item with real one from server
                        state.items[existingItemIndex] = action.payload;
                    } else {
                        // Add new item
                        state.items.push(action.payload);
                    }
                    state.lastAction = "added";
                    state.error = null;
                    state.totalCartItems = calculateTotalItems(state.items);

                    localStorage.setItem(
                        "TotalCartItems",
                        state.totalCartItems.toString()
                    );

                    toast.message("Added to cart Successfully");
                }
            )
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                // Revert optimistic update on failure
                state.items = state.items.filter(
                    (item) => !item.id.startsWith("temp-")
                );
                state.totalCartItems = calculateTotalItems(state.items);
                localStorage.setItem(
                    "TotalCartItems",
                    state.totalCartItems.toString()
                );
            })

            // Update Cart Item
            .addCase(updateCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateCartItem.fulfilled,
                (state, action: PayloadAction<CartItem>) => {
                    state.loading = false;
                    const index = state.items.findIndex(
                        (item) => item.id === action.payload.id
                    );
                    if (index >= 0) {
                        state.items[index] = action.payload;
                    }
                    console.log("Item added to cart");
                    state.lastAction = "updated";
                    state.error = null;
                    state.totalCartItems = calculateTotalItems(state.items);

                    localStorage.setItem(
                        "TotalCartItems",
                        state.totalCartItems.toString()
                    );
                    toast.success("Updated items successfully");
                }
            )
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Remove from Cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                removeFromCart.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.items = state.items.filter(
                        (item) => item.id !== action.payload
                    );
                    state.lastAction = "removed";
                    state.totalCartItems = calculateTotalItems(state.items);

                    localStorage.setItem(
                        "TotalCartItems",
                        state.totalCartItems.toString()
                    );

                    toast.success("Item removed from cart");
                }
            )
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Selectors with TypeScript
export const selectCart = (state: { cart: CartState }): Cart | null =>
    state.cart.cart;
export const selectCartItems = (state: { cart: CartState }): CartItem[] =>
    state.cart.items;
export const selectCartLoading = (state: { cart: CartState }): boolean =>
    state.cart.loading;
export const selectCartError = (state: { cart: CartState }): string | null =>
    state.cart.error;
export const selectCartLastAction = (state: {
    cart: CartState;
}): string | null => state.cart.lastAction;

export const selectCartTotalPrice = (state: { cart: CartState }): number =>
    state.cart.items.reduce((total, item) => {
        const price = item.product.salePrice || item.product.price;
        return total + price * item.quantity;
    }, 0);
export const selectCartItemById =
    (id: string) =>
    (state: { cart: CartState }): CartItem | undefined =>
        state.cart.items.find((item) => item.id === id);
export const selectCartItemByProductId =
    (productId: string) =>
    (state: { cart: CartState }): CartItem | undefined =>
        state.cart.items.find((item) => item.productId === productId);

export const selectCartTotalItems = (state: { cart: CartState }): number =>
    state.cart.totalCartItems;

export const selectIsProductInCart =
    (productId: string) =>
    (state: { cart: CartState }): boolean =>
        state.cart.items.some((item) => item.productId === productId);

export const {
    clearCart,
    clearError,
    clearLastAction,
    updateLocalQuantity,
    optimisticAddToCart,
    optimisticRemoveFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
