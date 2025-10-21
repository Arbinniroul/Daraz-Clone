

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        products:productSlice,
        categories:categorySlice
    },
    
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
