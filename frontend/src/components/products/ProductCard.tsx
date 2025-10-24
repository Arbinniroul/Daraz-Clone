
import type { ProductWithPricing } from "@/types";
import { useNavigate } from "react-router-dom";


// Individual product card component
interface ProductCardItemProps {
    product: ProductWithPricing;
}

const ProductCardItem = ({ product }: ProductCardItemProps) => {
 const navigate=useNavigate()
    const handleProduct = () => {
        navigate(`/products/${product.id}`)
 
     
    };

    return (
        <div
            className="w-50 p-4 flex flex-col gap-1 hover:shadow-lg cursor-pointer bg-[#ffffff]"
            onClick={() => {
                handleProduct();
            }}
        >
            {/* Product Image */}
            <div className="relative">
                <img
                    src={
                        product.images[0] ||
                        "https://static-01.daraz.com.np/p/1d3f2b1f6f3e2e2f4e4f4e4f4e4f4e4f.jpg"
                    }
                    alt={product.name}
                    className="h-50  w-50 object-cover rounded-md"
                />

                {/* Sale Badge */}
                {product.isSaleActive && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {product.discount
                            ? `-${Math.round(product.discount)}%`
                            : "Sale"}
                    </span>
                )}

                {/* Out of Stock Badge */}
                {product.inventory && product.inventory.quantity === 0 && (
                    <span className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                        Out of Stock
                    </span>
                )}
            </div>
            <h3 className=" text-lg font-semibold line-clamp-2 overflow-hidden">
                {product.name}
            </h3>

            <div className="flex justify-center flex-col gap-1">
                {product.isSaleActive ? (
                    <>
                        <span className="text-xl font-bold text-blue-600">
                            ${product.currentPrice.toFixed(2)}
                        </span>
                        <div className="flex">
                            <span className="text-sm text-gray-500 line-through">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.savingsAmount && (
                                <span className="text-xs text-green-600 font-medium">
                                    Save ${product.savingsAmount.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </>
                ) : (
                    <span className="text-xl font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                    </span>
                )}

                {/* Rating */}
                {product.averageRating && (
                    <div className="flex items-center mt-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600 ml-1">
                            {product.averageRating.toFixed(1)} (
                            {product.reviewCount || 0})
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCardItem;
