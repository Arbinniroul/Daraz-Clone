import type { AuthResponse, AuthState, User } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { loginUser, registerUser } from "../thunks/authThunks";

const getInitialAuthState = (): AuthState => {
    if (typeof window === "undefined") {
        return {
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
        };
    }

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    return {
        user: user ? JSON.parse(user) : null,
        token: token ? token : null,
        isAuthenticated: !!token,
        isLoading: false,
        error: null,
    };
};

const authSlice = createSlice({
    name: "auth",
    initialState: getInitialAuthState(),
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = null;

            toast.message("Logout succesfully");

            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        },

        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };

                if (typeof window !== "undefined") {
                    localStorage.setItem("user", JSON.stringify(state.user));
                }
            }
        },

        clearError: (state) => {
            state.error = null;
        },

 
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;

            if (typeof window !== "undefined") {
                localStorage.setItem("token", action.payload);
            }
        },

        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;

            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
        },
    },
    extraReducers: (builder) => {
       
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(
                registerUser.fulfilled,
                (state, action: PayloadAction<AuthResponse>) => {
                    state.isLoading = false;
                    state.isAuthenticated = true;
                    state.token = action.payload.token;
                    state.user = action.payload.user;
                    state.error = null;

                    console.log("registration fulfilled:", action.payload);
                    toast.success(action.payload.message);

                    if (typeof window !== "undefined") {
                        localStorage.setItem("token", action.payload.token);
                        localStorage.setItem(
                            "user",
                            JSON.stringify(action.payload.user)
                        );
                    }
                }
            )
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.error = action.payload as string;
                toast.error(action.error as string);

                if (typeof window !== "undefined") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            })

           
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<AuthResponse>) => {
                    state.isLoading = false;
                    state.isAuthenticated = true;
                    state.token = action.payload.token;
                    state.user = action.payload.user;

                    state.error = null;
                    toast.success(action.payload.message);

                    if (typeof window !== "undefined") {
                        localStorage.setItem("token", action.payload.token);
                        localStorage.setItem(
                            "user",
                            JSON.stringify(action.payload.user)
                        );
                    }
                }
            )
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.error = action.payload as string;
                toast.error(action.error as string);

                if (typeof window !== "undefined") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            });
    },
});

export const { logout, updateUser, clearError, setToken, setUser } =
    authSlice.actions;

export default authSlice.reducer;
