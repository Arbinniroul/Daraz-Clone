import CarouselBody from "@/components/CarouselBody";
import CategoryContainer from "@/components/categories/CategoryContainer";

import SaleProducts from "@/components/products/SaleProducts";
import AllProductsPage from "./products/AllProducts";

const Landing = () => {
    return (
        <div className="flex flex-col xl:px-50 px-2  bg-[#f4f4f4]">
            <CarouselBody />
            <SaleProducts />
            <CategoryContainer />
            <div className="flex flex-col gap-2 mt-10 ">
                <span className="font-semibold px-4 text-2xl ">
                    Just For You
                </span>
                <AllProductsPage />
            </div>
        </div>
    );
};

export default Landing;
