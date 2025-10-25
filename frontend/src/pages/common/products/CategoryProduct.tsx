import ProductCardItem from "@/components/products/ProductCard";
import { type AppDispatch, type RootState } from "@/store";
import { fetchCategoryProducts } from "@/store/slices/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductLayout from "../../../components/products/ProductLayout";

const CategoryProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const { categoryProducts, loading, error } = useSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchCategoryProducts(id));
        }
    }, [dispatch, id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">Error: {error}</p>
                <button
                    onClick={() => id && dispatch(fetchCategoryProducts(id))}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!categoryProducts || categoryProducts.length === 0) {
        return (
            <div className="text-lg flex justify-center items-center h-64">
                No products in this category
            </div>
        );
    }

    return (
        <ProductLayout>
            {categoryProducts.map((product) => (
                <ProductCardItem key={product.id} product={product} />
            ))}
        </ProductLayout>
    );
};

export default CategoryProduct;
