import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProductActions } from "@/hooks/useProductActions";
import { type AppDispatch, type RootState } from "@/store";

import { fetchProduct } from "@/store/slices/productSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { setIsAuthValue } = useAuth();
    const [quantity, setQuantity] = useState<number>(1);

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { currentProduct, loading, error } = useSelector(
        (state: RootState) => state.products
    );

    const { handleAddToCart, handleBuyNow, isAddingToCart, isBuyingNow } =
        useProductActions();

    const handleBuy = async (): Promise<void> => {
        if (!currentProduct) return;

        if (isAuthenticated) {
            await handleBuyNow(currentProduct,quantity);
        } else {
            setIsAuthValue("login");
        }
    };

    const handleCart = async (): Promise<void> => {
        if (!currentProduct) return;

        if (isAuthenticated) {
            await handleAddToCart(currentProduct.id, quantity);
        } else {
            setIsAuthValue("login");
        }
    };

    const handleQuantityChange = (newQuantity: number): void => {
        if (newQuantity < 1) return;
        if (
            currentProduct?.inventory &&
            newQuantity > currentProduct.inventory.quantity
        ) {
            return;
        }
        setQuantity(newQuantity);
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(id));
        }
    }, [dispatch, id]);

    
    useEffect(() => {
        setQuantity(1);
    }, [currentProduct?.id]);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-64">
                Loading...
            </div>
        );
    if (error)
        return (
            <div className="flex justify-center items-center min-h-64 text-red-600">
                Error: {error}
            </div>
        );
    if (!currentProduct)
        return (
            <div className="flex justify-center items-center min-h-64">
                Product not found
            </div>
        );

    const isOutOfStock: boolean =
        !currentProduct.inventory || currentProduct.inventory.quantity === 0;
    const displayPrice: number = currentProduct.isSaleActive
        ? currentProduct.currentPrice ||
          currentProduct.salePrice ||
          currentProduct.price
        : currentProduct.price;
    const originalPrice: number = currentProduct.isSaleActive
        ? currentProduct.price
        : displayPrice;
    const hasDiscount: boolean =
        currentProduct.isSaleActive && displayPrice < originalPrice;

    return (
        <div className="container lg:px-50 mx-auto py-10">
            <div className="mx-auto shadow-lg px-6 py-8 lg:px-10 lg:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg border bg-gray-50">
                            <img
                                src={
                                    currentProduct.images[0] ||
                                    "https://via.placeholder.com/500"
                                }
                                alt={currentProduct.name}
                                className="h-full w-full object-cover"
                                loading="eager"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {currentProduct.images
                                .slice(0, 4)
                                .map((image, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square overflow-hidden rounded border bg-gray-50 cursor-pointer hover:border-blue-500 transition-colors"
                                        onClick={() => {
                                            
                                        }}
                                    >
                                        <img
                                            src={image}
                                            alt={`${currentProduct.name} ${
                                                index + 1
                                            }`}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                {currentProduct.name}
                            </h1>
                            {currentProduct.seller && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Sold by:{" "}
                                    <span className="font-medium">
                                        {currentProduct.seller.storeName}
                                    </span>
                                    {currentProduct.seller.isVerified && (
                                        <span
                                            className="ml-1 text-blue-500"
                                            title="Verified Seller"
                                        >
                                            ✓ Verified
                                        </span>
                                    )}
                                </p>
                            )}
                        </div>

                        {/* Pricing */}
                        <div className="space-y-2">
                            {hasDiscount ? (
                                <div className="flex items-center gap-4 flex-wrap">
                                    <span className="text-2xl lg:text-3xl font-bold text-red-600">
                                        ${displayPrice.toFixed(2)}
                                    </span>
                                    <span className="text-xl text-gray-500 line-through">
                                        ${originalPrice.toFixed(2)}
                                    </span>
                                    {currentProduct.discount && (
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                                            Save {currentProduct.discount}%
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                                    ${displayPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        {!isOutOfStock && (
                            <div className="flex items-center gap-4">
                                <label
                                    htmlFor="quantity"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Quantity:
                                </label>
                                <div className="flex items-center border rounded-md">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleQuantityChange(quantity - 1)
                                        }
                                        disabled={quantity <= 1}
                                        className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        -
                                    </button>
                                    <input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        max={currentProduct.inventory?.quantity}
                                        value={quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                parseInt(e.target.value) || 1
                                            )
                                        }
                                        className="w-16 text-center border-x py-1 outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleQuantityChange(quantity + 1)
                                        }
                                        disabled={
                                            currentProduct.inventory
                                                ? quantity >=
                                                  currentProduct.inventory
                                                      .quantity
                                                : false
                                        }
                                        className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        +
                                    </button>
                                </div>
                                {currentProduct.inventory && (
                                    <span className="text-sm text-gray-500">
                                        {currentProduct.inventory.quantity}{" "}
                                        available
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">
                                Description
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {currentProduct.description ||
                                    "No description available."}
                            </p>
                        </div>

                        {/* Stock Status */}
                        <div>
                            {!isOutOfStock ? (
                                <p className="text-green-600 font-medium">
                                    ✓ In Stock
                                    {currentProduct.inventory && (
                                        <span className="text-gray-600 ml-2">
                                            ({currentProduct.inventory.quantity}{" "}
                                            available)
                                        </span>
                                    )}
                                </p>
                            ) : (
                                <p className="text-red-600 font-medium">
                                    ✗ Out of Stock
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        {currentProduct.category && (
                            <div>
                                <p className="text-sm text-gray-600">
                                    Category:{" "}
                                    <span className="font-medium">
                                        {currentProduct.category.name}
                                    </span>
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <Button
                                className="flex-1 border bg-[#29bce9] border-gray-300 text-gray-700 py-3 px-6 rounded-none hover:bg-[#1ea8d4] hover:text-white transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                onClick={handleBuy}
                                disabled={isBuyingNow || isOutOfStock}
                            >
                                {isBuyingNow ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </div>
                                ) : (
                                    "Buy Now"
                                )}
                            </Button>
                            <Button
                                disabled={isOutOfStock || isAddingToCart}
                                className="flex-1 text-white py-3 px-6 rounded-none bg-[#f75506] hover:bg-[#e04a05] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                variant={"outline"}
                                onClick={handleCart}
                            >
                                {isAddingToCart ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        Adding...
                                    </div>
                                ) : (
                                    "Add to Cart"
                                )}
                            </Button>
                        </div>

                        {/* Additional Info */}
                        <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                            <p>SKU: {currentProduct.inventory?.sku || "N/A"}</p>
                            <p>
                                Added:{" "}
                                {new Date(
                                    currentProduct.createdAt
                                ).toLocaleDateString()}
                            </p>
                            <p>
                                Last updated:{" "}
                                {new Date(
                                    currentProduct.updatedAt
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                {currentProduct.reviews &&
                    currentProduct.reviews.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-6">
                                Customer Reviews
                            </h2>
                            <div className="space-y-4">
                                {currentProduct.reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="border-b pb-4"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex text-yellow-400">
                                                {"★".repeat(review.rating)}
                                                {"☆".repeat(5 - review.rating)}
                                            </div>
                                            <span className="font-medium">
                                                {review.user.username}
                                            </span>
                                        </div>
                                        {review.comment && (
                                            <p className="text-gray-700">
                                                {review.comment}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(
                                                review.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                {/* Average Rating Summary */}
                {currentProduct.averageRating && (
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="text-3xl font-bold">
                                {currentProduct.averageRating.toFixed(1)}
                            </div>
                            <div>
                                <div className="flex text-yellow-400 text-lg">
                                    {"★".repeat(
                                        Math.round(currentProduct.averageRating)
                                    )}
                                    {"☆".repeat(
                                        5 -
                                            Math.round(
                                                currentProduct.averageRating
                                            )
                                    )}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Based on{" "}
                                    {currentProduct.reviewCount ||
                                        currentProduct.reviews?.length ||
                                        0}{" "}
                                    reviews
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
