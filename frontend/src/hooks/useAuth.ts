import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "@/store";
import type { LoginCredentials, RegisterCredentials } from "@/types";
import { clearError, logout } from "../store/slices/authSlice";
import { loginUser, registerUser } from "../store/thunks/authThunks";

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { isAuthenticated, user, token, isLoading, error } = useSelector(
        (state: RootState) => state.auth
    );

    const register = useCallback(
        async (credentials: RegisterCredentials) => {
            const result = await dispatch(registerUser(credentials)).unwrap();
            navigate("/");
            return result;
        },
        [dispatch, navigate]
    );

    const login = useCallback(
        async (credentials: LoginCredentials) => {
            const result = await dispatch(loginUser(credentials)).unwrap();
            navigate("/");
            return result;
        },
        [dispatch, navigate]
    );

    const logoutUser = useCallback(() => {
        dispatch(logout());
        navigate("/");
    }, [dispatch, navigate]);

    const clearAuthError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const isSeller = user?.role === "SELLER";
    const isAdmin = user?.role === "ADMIN";

    return {

        isAuthenticated,
        user,
        token,
        isLoading,
        error,


        register,
        login,
        logout: logoutUser,
        clearError: clearAuthError,


        isSeller,
        isAdmin,
    };
};
