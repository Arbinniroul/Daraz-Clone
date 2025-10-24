import type { AppDispatch, RootState } from "@/store";

import { fetchSaleProducts } from "@/store/slices/productSlice";

import { ArrowRightIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import ProductCardItem from "./ProductCard";

const SaleProducts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { saleProducts, loading, error, pagination } = useSelector(
        (state: RootState) => state.products
    );

    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchSaleProducts({ page: 1, limit: 20 }));
    }, [dispatch]);

    const handleRetry = () => {
        dispatch(fetchSaleProducts({ page: 1, limit: 20 }));
    };

    const handleProducts = () => {
        navigate("/allProducts");
    };
    // Handle loading state
    if (loading && saleProducts.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Handle error state
    if (error && saleProducts.length === 0) {
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
        <div className=" flex flex-col  my-5  text-lg">
            <span className="tracking-normal text-[25px] hidden lg:block  ">
                Flash Sale
            </span>

            <div className=" bg-white my-3 h-full w-full shadow-lg ">
                <div className=" justify-between px-4 flex-col lg:flex-row  items-center hidden lg:flex  ">
                    <span className="text-sm text-[#f75506] ">On sale now</span>

                    <Button
                        variant={"ghost"}
                        className="border border-[#f75506] text-[#f75506] cursor-pointer rounded-none"
                        onClick={handleProducts}
                    >
                        SHOP ALL PRODUCTS
                    </Button>
                </div>
                <div className="shadow-2xl  lg:shadow-none mx-10 lg:mx-0 lg:rounded-none rounded-md py-4 lg:py-0">
                    <div className=" justify-between px-10 flex lg:hidden">
                        <span className="font-semibold flex text-lg sm:text-base md:text-xl lg:text-2xl">
                            FLASH SALE
                        </span>
                        <div className="flex items-center">
                            <Button
                                variant={"ghost"}
                                className="text-base sm:text-base md:text-xl lg:text-2xl "
                                onClick={handleProducts}
                            >
                                SHOP MORE
                            </Button>
                            <span className="size-">
                                <ArrowRightIcon />
                            </span>
                        </div>
                    </div>
                    <div className=" flex justify-center border-0 lg:border-t-2 my-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5 ">
                            {saleProducts.map((product) => (
                                <ProductCardItem
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaleProducts;
