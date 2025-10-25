// productSlice.ts
import type {
    CreateProductData,
    CreateProductResponse,
    FilterState,
    PaginationInfo,
    Product,
    ProductFilters,
    ProductsResponse,
    ProductWithPricing,
    UpdateProductData,
    UpdateProductResponse,
    UpdateSaleData,
} from "@/types";
import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";

// Initial state
interface ProductState {
    products: ProductWithPricing[];
    saleProducts: ProductWithPricing[];
    categoryProducts: ProductWithPricing[];
    currentProduct: ProductWithPricing | null;
    loading: boolean;
    error: string | null;
    pagination: PaginationInfo;
    filters: FilterState;
}

const initialState: ProductState = {
    products: [],
    saleProducts: [],
    categoryProducts: [],
    currentProduct: null,
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0,
    },
    filters: {
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
    },
};

// Utility functions for pricing
const calculateCurrentPrice = (product: Product): number => {
    if (product.isOnSale && product.salePrice && isSaleActive(product)) {
        return product.salePrice;
    }
    return product.price;
};

const isSaleActive = (product: Product): boolean => {
    if (!product.isOnSale) return false;
    if (!product.saleStart && !product.saleEnd) return true;

    const now = new Date();
    const startValid = !product.saleStart || new Date(product.saleStart) <= now;
    const endValid = !product.saleEnd || new Date(product.saleEnd) >= now;

    return startValid && endValid;
};

const calculateSavings = (
    product: Product
): { amount: number; percentage: number } => {
    const currentPrice = calculateCurrentPrice(product);
    const savingsAmount = product.price - currentPrice;
    const savingsPercentage =
        product.discount ?? (savingsAmount / product.price) * 100;

    return {
        amount: savingsAmount,
        percentage: savingsPercentage,
    };
};

const enhanceProductWithPricing = (product: Product): ProductWithPricing => {
    const isActiveSale = isSaleActive(product);
    const currentPrice = calculateCurrentPrice(product);
    const savings = calculateSavings(product);

    return {
        ...product,
        currentPrice,
        isSaleActive: isActiveSale,
        savingsAmount: isActiveSale ? savings.amount : undefined,
        savingsPercentage: isActiveSale ? savings.percentage : undefined,
    };
};

// Async thunks with proper typing
export const createProduct = createAsyncThunk<
    ProductWithPricing, // Return type
    CreateProductData, // Argument type
    { rejectValue: string } // Reject value type
>(
    "products/create",
    async (productData: CreateProductData, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(
                    error.message || "Failed to create product"
                );
            }

            const data: CreateProductResponse = await response.json();
            return enhanceProductWithPricing(data.product);
        } catch (error: unknown) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Failed to create product"
            );
        }
    }
);

export const fetchProducts = createAsyncThunk<
    ProductsResponse,
    ProductFilters,
    { rejectValue: string }
>(
    "products/fetchAll",
    async (filters: ProductFilters = {}, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams();

            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    queryParams.append(key, value.toString());
                }
            });

            const response = await fetch(
                `http://localhost:3000/api/products/fetchProducts?${queryParams}`
            );

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(
                    error.message || "Failed to fetch products"
                );
            }

            const data: ProductsResponse = await response.json();
            return {
                ...data,
                products: data.products.map(enhanceProductWithPricing),
            };
        } catch (error: unknown) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch products"
            );
        }
    }
);
export const fetchCategoryProducts = createAsyncThunk<
    ProductWithPricing[],
    string,
    { rejectValue: string }
>(
    "products/fetchCategoryProducts",
    async (categoryID: string, { rejectWithValue }) => {
        try {

            if (!categoryID || categoryID.trim() === "") {
                return rejectWithValue("Category ID is required");
            }

            const response = await fetch(
                `http://localhost:3000/api/products/categoryProducts/${categoryID}`
            );


            if (!response.ok) {
                if (response.status === 404) {
                    return rejectWithValue("Category not found");
                }
                if (response.status === 500) {
                    return rejectWithValue("Server error occurred");
                }

                const errorData = await response.json().catch(() => ({}));
                return rejectWithValue(
                    errorData.message ||
                        `HTTP error! status: ${response.status}`
                );
            }

            const data: ProductsResponse = await response.json();


            if (!data.products || data.products.length === 0) {
                return []; 
            }

            return data.products.map((product) =>
                enhanceProductWithPricing(product)
            );
        } catch (error: unknown) {
            console.error("Fetch category products error:", error);
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Network error occurred while fetching products"
            );
        }
    }
);

export const fetchProduct = createAsyncThunk<
    ProductWithPricing,
    string,
    { rejectValue: string }
>("products/fetchOne", async (productId: string, { rejectWithValue }) => {
    try {
        const response = await fetch(
            `http://localhost:3000/api/products/${productId}`
        );

        if (!response.ok) {
            const error = await response.json();
            return rejectWithValue(error.message || "Failed to fetch product");
        }

        const data: { product: Product } = await response.json();
        return enhanceProductWithPricing(data.product);
    } catch (error: unknown) {
        return rejectWithValue(
            error instanceof Error ? error.message : "Failed to fetch product"
        );
    }
});

export const updateProduct = createAsyncThunk<
    ProductWithPricing,
    UpdateProductData,
    { rejectValue: string }
>(
    "products/update",
    async (updateData: UpdateProductData, { rejectWithValue }) => {
        try {
            const { id, ...data } = updateData;
            const response = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(
                    error.message || "Failed to update product"
                );
            }

            const result: UpdateProductResponse = await response.json();
            return enhanceProductWithPricing(result.product);
        } catch (error: unknown) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Failed to update product"
            );
        }
    }
);

export const updateProductSale = createAsyncThunk<
    ProductWithPricing,
    { id: string; saleData: UpdateSaleData },
    { rejectValue: string }
>(
    "products/updateSale",
    async (
        { id, saleData }: { id: string; saleData: UpdateSaleData },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch(`/api/products/${id}/sale`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(saleData),
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(
                    error.message || "Failed to update product sale"
                );
            }

            const result: UpdateProductResponse = await response.json();
            return enhanceProductWithPricing(result.product);
        } catch (error: unknown) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Failed to update product sale"
            );
        }
    }
);

export const fetchSaleProducts = createAsyncThunk<
    ProductsResponse,
    { page?: number; limit?: number; discountMin?: number },
    { rejectValue: string }
>(
    "products/fetchSale",
    async (
        filters: { page?: number; limit?: number; discountMin?: number } = {},
        { rejectWithValue }
    ) => {
        try {
            const queryParams = new URLSearchParams();

            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, value.toString());
                }
            });

            const apiUrl = `http://localhost:3000/api/products/sale/products`;
            console.log("Fetching from:", apiUrl); // Debug log

            const response = await fetch(apiUrl);

            console.log("Response status:", response.status);
            console.log("Response headers:", response.headers);

            const responseText = await response.text();
            console.log("Raw response:", responseText);

            if (!response.ok) {
                console.log("Response not OK, status:", response.status);

                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.message || errorMessage;
                } catch (error: unknown) {
                    errorMessage =
                        responseText ||
                        errorMessage ||
                        (error as Error).message;
                }
                return rejectWithValue(errorMessage);
            }

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error("Failed to parse JSON:", e);
                console.error("Response that failed to parse:", responseText);
                return rejectWithValue("Invalid JSON response from server");
            }

            return {
                ...data,
                products: data.products.map(enhanceProductWithPricing),
            };
        } catch (error: unknown) {
            console.error("Fetch error:", error);
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch sale products"
            );
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearCategoryProducts: (state) => {
            state.categoryProducts = [];
        },
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
        },
        setFilters: (state, action: PayloadAction<ProductFilters>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                page: 1,
                limit: 10,
                sortBy: "createdAt",
                sortOrder: "desc",
            };
        },
        resetProductState: (state) => {
            state.products = [];
            state.currentProduct = null;
            state.loading = false;
            state.error = null;
            state.pagination = {
                page: 1,
                limit: 10,
                total: 0,
                pages: 0,
            };
            state.filters = {
                page: 1,
                limit: 10,
                sortBy: "createdAt",
                sortOrder: "desc",
            };
        },

        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(
                (product) => product.id !== action.payload
            );
            if (state.currentProduct?.id === action.payload) {
                state.currentProduct = null;
            }
        },
        updateProductQuantity: (
            state,
            action: PayloadAction<{ productId: string; quantity: number }>
        ) => {
            const product = state.products.find(
                (p) => p.id === action.payload.productId
            );
            if (product?.inventory) {
                product.inventory.quantity = action.payload.quantity;
            }
            if (
                state.currentProduct?.id === action.payload.productId &&
                state.currentProduct.inventory
            ) {
                state.currentProduct.inventory.quantity =
                    action.payload.quantity;
            }
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.unshift(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to create product";
            })


            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch products";
            })
            .addCase(fetchCategoryProducts.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(
                fetchCategoryProducts.fulfilled,
                (state, action: PayloadAction<ProductWithPricing[]>) => {
                    state.loading = false;
                    state.categoryProducts = action.payload;
                    state.error = null;

                    console.log(
                        `Loaded ${action.payload.length} products for category`
                    );
                }
            )
            .addCase(fetchCategoryProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.categoryProducts = []; 

                console.error(
                    "Failed to fetch category products:",
                    action.payload
                );
            })


            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProduct = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch product";
            })


            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload;
                const index = state.products.findIndex(
                    (p) => p.id === updatedProduct.id
                );
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
                if (
                    state.currentProduct &&
                    state.currentProduct.id === updatedProduct.id
                ) {
                    state.currentProduct = updatedProduct;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to update product";
            })

            // Update Product Sale
            .addCase(updateProductSale.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductSale.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload;
                const index = state.products.findIndex(
                    (p) => p.id === updatedProduct.id
                );
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
                if (
                    state.currentProduct &&
                    state.currentProduct.id === updatedProduct.id
                ) {
                    state.currentProduct = updatedProduct;
                }
            })
            .addCase(updateProductSale.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to update product sale";
            })

            // Fetch Sale Products
            .addCase(fetchSaleProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSaleProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.saleProducts = action.payload.products;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchSaleProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch sale products";
            });
    },
});

export const {
    clearError,
    clearCurrentProduct,
    setFilters,
    clearFilters,
    resetProductState,
    removeProduct,
    updateProductQuantity,
} = productSlice.actions;

export default productSlice.reducer;
