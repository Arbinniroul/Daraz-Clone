import type { AppDispatch, RootState } from "@/store";
import { fetchProducts } from "@/store/slices/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCardItem from "@/components/products/ProductCard";
import ProductLayout from "../../../components/products/ProductLayout";

const AllProductsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        dispatch(
            fetchProducts({
                page: 1,
                limit: 20,
            })
        );
    }, [dispatch]);

    const handleRetry = () => {
        dispatch(
            fetchProducts({
                page: 1,
                limit: 20,
            })
        );
    };

    if (loading && products.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error && products.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500 text-center">
                    <p>Failed to load products</p>
                    <p className="text-sm mt-1">{error}</p>
                    <button
                        onClick={handleRetry}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }
    return (
        <ProductLayout>
            {products.map((product) => (
                <ProductCardItem key={product.id} product={product} />
            ))}
        </ProductLayout>
    );
};

export default AllProductsPage;
