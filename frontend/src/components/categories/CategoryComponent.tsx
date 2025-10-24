import type { AppDispatch, RootState } from "@/store";
import { clearError, getCategories } from "@/store/slices/categorySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoryComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    const { category, loading, error } = useSelector(
        (state: RootState) => state.categories
    );
    if (loading) return <div>Loading categories...</div>;

    if (error)
        return (
            <div>
                Error: {error}
                <button onClick={() => dispatch(clearError())}>
                    Clear Error
                </button>
            </div>
        );
    return (
        <div className=" mx-auto max-w-5xl">

            <div className="h-full w-full">
                <div className=" grid   grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-3 sm:gap-0">
                    {category.map((cat) => (
                        <div
                            key={cat.id}
                            className="cursor-pointer rounded-lg bg-white px-4 py-8 sm:px-3 sm:py-6 md:px-4 md:py-8 hover:shadow-xl border border-gray-200 transition-all duration-300  hover:scale-105"
                        >
                            <div className="flex justify-center items-center h-full">
                                <span className="text-sm sm:text-base font-medium text-gray-800 text-center">
                                    {cat.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryComponent;
