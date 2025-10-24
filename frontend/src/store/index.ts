import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productSlice,
        categories: categorySlice,
        cart: cartSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
