import type { CartItem } from "@/types";
import { TrashIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface ProductComponentProps {
    item: CartItem;
    displayPrice: number | undefined;
    originalPrice: number;
    hasDiscount: boolean | number | undefined;
    handleRemoveItem: (itemId: string) => void;
}
const ProductComponent = ({
    item,
    displayPrice,
    originalPrice,
    hasDiscount,
    handleRemoveItem,
}: ProductComponentProps) => {
    const location = useLocation();
    const checkoutPage = ["/checkout"].includes(location.pathname);

    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/products/${item.product.id}`)}
            className="flex flex-col md:flex-row justify-center items-start md:items-center  w-full"
        >
            <img
                src={
                    item.product.images[0] ||
                    item.product.images[1] ||
                    "https://via.placeholder.com/80"
                }
                alt={item.product.name}
                className="w-20 md:mr-10 h-20 object-cover rounded-lg border"
            />
            <div className="md:flex-1 min-w-0">
                <p className="font-semibold text-gray-800 line-clamp-2">
                    {item.product.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    In stock: {item.product.inventory?.quantity || "N/A"}
                </p>
            </div>

            <div className="flex flex-col lg:mx-10  items-end text-right min-w-[100px]">
                <p className="text-orange-600 font-semibold text-lg">
                    ${displayPrice?.toFixed(2)}
                </p>
                {hasDiscount && (
                    <p className="text-gray-400 text-sm line-through">
                        $ {originalPrice.toFixed(2)}
                    </p>
                )}

                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-red-600"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(item.id);
                    }}
                >
                    <TrashIcon className="w-5 h-5" />
                </Button>
            </div>
            {checkoutPage && (
                <div>
                    <span className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProductComponent;
