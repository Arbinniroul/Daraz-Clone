import CarouselBody from "@/components/CarouselBody";
import CategoryContainer from "@/components/categories/CategoryContainer";

import SaleProducts from "@/components/products/SaleProducts";


const Landing = () => {
    return (
        <div className="flex flex-col xl:px-50 px-2 py-1">
            <CarouselBody />
            <SaleProducts /> 
            <CategoryContainer/>
        </div>
    );
};

export default Landing;
