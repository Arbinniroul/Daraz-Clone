import type { Category } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CategoryState {
    category: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    category: [],
    loading: false,
    error: null,
};

export const createCategory = createAsyncThunk<
    Category,
    Category,
    { rejectValue: string }
>("category/create", async (categoryData, { rejectWithValue }) => {
    try {
        const response = await fetch("/api/category/createCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(categoryData),
        });

        if (!response.ok) {
            const error = await response.json();
            return rejectWithValue(
                error.message || "Failed to create category"
            );
        }

        const category = await response.json();
        return category;
    } catch (error: unknown) {
        return rejectWithValue(
            error instanceof Error ? error.message : "Failed to create category"
        );
    }
});

export const getCategories = createAsyncThunk<
    Category[],
    void,
    { rejectValue: string }
>("category/fetch", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(
            "http://localhost:3000/api/category/getCategory",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const error = await response.json();
            return rejectWithValue(error.message || "Failed to get Category");
        }

        const data = await response.json();
        return data.categories;
    } catch (error: unknown) {
        return rejectWithValue(
            error instanceof Error ? error.message : "Failed to get Category"
        );
    }
});
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category.unshift(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to create category";
            })
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch products";
            });
    },
});

export const { clearError } = categorySlice.actions;

export default categorySlice.reducer;
