import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "./slices/addressSlice";
import authReducer from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productSlice,
        categories: categorySlice,
        cart: cartSlice,
        address: addressSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
