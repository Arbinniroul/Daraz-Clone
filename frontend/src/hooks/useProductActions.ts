// hooks/useProductActions.ts
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";
import { type AddToCartRequest } from "@/types";
import { useDispatch, useSelector } from "react-redux";

interface UseProductActionsReturn {
    handleAddToCart: (productId: string, quantity?: number) => Promise<boolean>;
    handleBuyNow: (productId: string, quantity?: number) => Promise<boolean>;
    isAddingToCart: boolean;
    isBuyingNow: boolean;
}

type AuthAction = "buy-now" | "add-to-cart";

export const useProductActions = (): UseProductActionsReturn => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );
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

    const handleBuyNow = useCallback(
        async (productId: string, quantity: number = 1): Promise<boolean> => {
            if (!isAuthenticated) {
                handleAuthRedirect("buy-now", productId);
                return false;
            }

            setIsBuyingNow(true);
            try {
                const addToCartRequest: AddToCartRequest = {
                    productId,
                    quantity,
                };
                await dispatch(addToCart(addToCartRequest)).unwrap();
                navigate("/checkout");
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

    return {
        handleAddToCart,
        handleBuyNow,
        isAddingToCart,
        isBuyingNow,
    };
};
