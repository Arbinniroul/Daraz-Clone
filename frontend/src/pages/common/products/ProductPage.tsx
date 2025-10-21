import { Button } from "@/components/ui/button";
import { type AppDispatch, type RootState } from "@/store";
import { fetchProduct } from "@/store/slices/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const { currentProduct, loading, error } = useSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(id));
        }
    }, [dispatch, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!currentProduct) return <div>Product not found</div>;

    return (
        <div className="container lg:px-50 mx-auto py-10 ">
            <div className=" mx-auto shadow-lg px-10 py-10 ">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg border">
                            <img
                                src={
                                    currentProduct.images[0] ||
                                    "https://via.placeholder.com/500"
                                }
                                alt={currentProduct.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {currentProduct.images
                                .slice(0, 4)
                                .map((image, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square overflow-hidden rounded border"
                                    >
                                        <img
                                            src={image}
                                            alt={`${currentProduct.name} ${
                                                index + 1
                                            }`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {currentProduct.name}
                            </h1>
                            {currentProduct.seller && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Sold by:{" "}
                                    <span className="font-medium">
                                        {currentProduct.seller.storeName}
                                    </span>
                                    {currentProduct.seller.isVerified && (
                                        <span className="ml-1 text-blue-500">
                                            ✓ Verified
                                        </span>
                                    )}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            {currentProduct.isSaleActive ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl font-bold text-red-600">
                                        $
                                        {currentProduct.currentPrice?.toFixed(
                                            2
                                        ) ||
                                            currentProduct.salePrice?.toFixed(
                                                2
                                            )}
                                    </span>
                                    <span className="text-xl text-gray-500 line-through">
                                        ${currentProduct.price.toFixed(2)}
                                    </span>
                                    {currentProduct.discount && (
                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                                            Save {currentProduct.discount}%
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <span className="text-3xl font-bold text-gray-900">
                                    ${currentProduct.price.toFixed(2)}
                                </span>
                            )}
                        </div>

                     
                        <div>
                            <h3 className="text-lg font-semibold mb-2">
                                Description
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {currentProduct.description ||
                                    "No description available."}
                            </p>
                        </div>

                       
                        <div>
                            {currentProduct.inventory &&
                            currentProduct.inventory.quantity > 0 ? (
                                <p className="text-green-600 font-medium">
                                    In Stock (
                                    {currentProduct.inventory.quantity}{" "}
                                    available)
                                </p>
                            ) : (
                                <p className="text-red-600 font-medium">
                                    Out of Stock
                                </p>
                            )}
                        </div>

                  
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

                        <div className="flex gap-4 pt-4">
                            <Button
                                className="flex-1 border
                            bg-[#29bce9] border-gray-300 text-gray-700 py-3 px-6 rounded-none hover:bg-gray-50 transition-colors"
                            >
                                Buy Now
                            </Button>
                            <Button
                                disabled={
                                    !currentProduct.inventory ||
                                    currentProduct.inventory.quantity === 0
                                }
                                className="flex-1  text-white py-3 px-6 rounded-none  bg-[#f75506] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                variant={"outline"}
                            >
                                Add to Cart
                            </Button>
                        </div>

                        <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                            <p>SKU: {currentProduct.inventory?.sku || "N/A"}</p>
                            <p>
                                Added:{" "}
                                {new Date(
                                    currentProduct.createdAt
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

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
