// hooks/useProductActions.ts
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";
import { type AddToCartRequest, type ProductWithPricing } from "@/types";
import { useDispatch, useSelector } from "react-redux";

interface UseProductActionsReturn {
    handleAddToCart: (productId: string, quantity?: number) => Promise<boolean>;
    handleBuyNow: (product: ProductWithPricing) => Promise<boolean>;
    isAddingToCart: boolean;
    isBuyingNow: boolean;
}

type AuthAction = "buy-now" | "add-to-cart";

export const useProductActions = (): UseProductActionsReturn => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
    const [isBuyingNow, setIsBuyingNow] = useState<boolean>(false);

    const handleAuthRedirect = useCallback(
        (action: AuthAction, productId?: string): void => {
            const returnUrl = action === "buy-now" ? "/checkout" : "/cart";
            const searchParams = new URLSearchParams({
                returnUrl,
                action,
                ...(productId && { productId }),
            });
            navigate(`/auth?${searchParams.toString()}`);
        },
        [navigate]
    );

    const handleBuyNow = useCallback(
        async (product: ProductWithPricing): Promise<boolean> => {
            if (!isAuthenticated) {
                handleAuthRedirect("buy-now", product.id);
                return false;
            }

            setIsBuyingNow(true);
            console.log(product, "product");
            try {
               
                const cartItem = {
                    id: `buynow-${product.id}-${Date.now()}`, // Unique ID
                    quantity: 1,
                    product: product,
                    productId: product.id,
                    cartId: `temp-cart-${product.id}`, // Temporary cart ID
                };

                navigate("/checkout", {
                    state: {
                        selectedItems: [cartItem], // Send as array with proper structure
                    },
                });
                return true;
            } catch (error) {
                console.error("Failed to buy now:", error);
                return false;
            } finally {
                setIsBuyingNow(false);
            }
        },
        [isAuthenticated, handleAuthRedirect, dispatch, navigate]
    );
    const handleAddToCart = useCallback(
        async (productId: string, quantity: number = 1): Promise<boolean> => {
            if (!isAuthenticated) {
                handleAuthRedirect("add-to-cart", productId);
                return false;
            }

            setIsAddingToCart(true);
            try {
                const addToCartRequest: AddToCartRequest = {
                    productId,
                    quantity,
                };
                await dispatch(addToCart(addToCartRequest)).unwrap();
                return true;
            } catch (error) {
                console.error("Failed to add to cart:", error);
                return false;
            } finally {
                setIsAddingToCart(false);
            }
        },
        [isAuthenticated, handleAuthRedirect, dispatch]
    );

    return {
        handleAddToCart,
        handleBuyNow,
        isAddingToCart,
        isBuyingNow,
    };
};
