import { Button } from "@/components/ui/button";
import { Loader2, MinusIcon, PlusIcon, TrashIcon } from "lucide-react";

import type { AppDispatch } from "@/store";
import {
    removeFromCart,
    selectCartItems,
    selectCartLoading,
    updateCartItem,
} from "@/store/slices/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Types
interface CartItem {
    id: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        price: number;
        salePrice?: number;
        images: string[];
        inventory?: {
            quantity: number;
        };
        seller?: {
            storeName: string;
        };
    };
}

interface SelectedItems {
    [key: string]: boolean;
}

const CartPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const cartItems = useSelector(selectCartItems);

    const loading = useSelector(selectCartLoading);

    const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
    const [selectAll, setSelectAll] = useState<boolean>(false);

    useEffect(() => {
        localStorage.setItem(
            "cart-selected-items",
            JSON.stringify(selectedItems)
        );
    }, [selectedItems]);

    const selectedItemsTotal = cartItems.reduce((total, item) => {
        if (selectedItems[item.id]) {
            const price = item.product.salePrice || item.product.price;
            return total + price * item.quantity;
        }
        return total;
    }, 0);

    const selectedItemsCount =
        Object.values(selectedItems).filter(Boolean).length;

    // Handle select all
    const handleSelectAll = (checked: boolean) => {
        setSelectAll(checked);
        const newSelectedItems: SelectedItems = {};
        if (checked) {
            cartItems.forEach((item) => {
                newSelectedItems[item.id] = true;
            });
        }
        setSelectedItems(newSelectedItems);
    };

    // Handle individual item selection
    const handleItemSelect = (itemId: string, checked: boolean) => {
        setSelectedItems((prev) => ({
            ...prev,
            [itemId]: checked,
        }));
    };

    // Update select all when individual items change
    useEffect(() => {
        const allSelected =
            cartItems.length > 0 &&
            cartItems.every((item) => selectedItems[item.id]);
        setSelectAll(allSelected);
    }, [selectedItems, cartItems]);

    const handleQuantityUpdate = async (
        itemId: string,
        newQuantity: number
    ) => {
        if (newQuantity < 1) return;
        console.log(cartItems);

        const item = cartItems.find((item) => item.id === itemId);
        if (
            item &&
            item.product.inventory &&
            newQuantity > item.product.inventory.quantity
        ) {
            return;
        }

        try {
            await dispatch(
                updateCartItem({ id: itemId, quantity: newQuantity })
            ).unwrap();
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };

    const handleRemoveItem = async (itemId: string) => {
        try {
            await dispatch(removeFromCart(itemId)).unwrap();

            setSelectedItems((prev) => {
                const newSelected = { ...prev };
                delete newSelected[itemId];
                return newSelected;
            });
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    };

    const handleBulkDelete = async () => {
        const selectedIds = Object.keys(selectedItems).filter(
            (id) => selectedItems[id]
        );
        if (selectedIds.length === 0) return;

        try {
            for (const itemId of selectedIds) {
                await dispatch(removeFromCart(itemId)).unwrap();
            }
            setSelectedItems({});
            setSelectAll(false);
        } catch (error) {
            console.error("Failed to delete items:", error);
        }
    };

    const handleCheckout = () => {
        if (selectedItemsCount === 0) {
            alert("Please select at least one item to checkout");
            return;
        }
        navigate("/checkout", {
            state: {
                selectedItems: cartItems.filter(
                    (item) => selectedItems[item.id]
                ),
            },
        });
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-center items-center min-h-64">
                    <div className="text-lg">
                        <Loader2 className="animate-spin size-5" />
                    </div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        There are no items in this cart
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Add some items to get started!
                    </p>
                    <Button
                        variant={"outline"}
                        onClick={() => navigate("/")}
                        className="border-orange-500 border text-orange-500  px-3 py-2"
                    >
                        Continue Shopping
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="font-medium text-gray-700">
                            SELECT ALL ({selectedItemsCount} ITEM
                            {selectedItemsCount !== 1 ? "S" : ""})
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 text-red-500 hover:text-red-700"
                        onClick={handleBulkDelete}
                        disabled={selectedItemsCount === 0}
                    >
                        <TrashIcon className="w-4 h-4" />
                        Delete Selected
                    </Button>
                </div>

                {/* Group items by seller */}
                {Object.entries(
                    cartItems.reduce(
                        (acc: { [key: string]: CartItem[] }, item) => {
                            const sellerName =
                                item.product.seller?.storeName ||
                                "Unknown Seller";
                            if (!acc[sellerName]) {
                                acc[sellerName] = [];
                            }
                            acc[sellerName].push(item);
                            return acc;
                        },
                        {}
                    )
                ).map(([sellerName, items]) => (
                    <div
                        key={sellerName}
                        className="bg-white rounded-xl shadow p-4 space-y-4 border border-gray-200"
                    >
                        <div className="flex items-center gap-2 text-gray-600 font-semibold">
                            <input
                                type="checkbox"
                                checked={items.every(
                                    (item) => selectedItems[item.id]
                                )}
                                onChange={(e) => {
                                    items.forEach((item) => {
                                        handleItemSelect(
                                            item.id,
                                            e.target.checked
                                        );
                                    });
                                }}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span>{sellerName}</span>
                        </div>

                        {/* Product Items */}
                        {items.map((item) => {
                            const displayPrice =
                                item.product.salePrice || item.product.price;
                            const originalPrice = item.product.salePrice
                                ? item.product.price
                                : displayPrice;
                            const hasDiscount =
                                item.product.salePrice &&
                                item.product.salePrice < item.product.price;

                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 border-t pt-4 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={!!selectedItems[item.id]}
                                        onChange={(e) =>
                                            handleItemSelect(
                                                item.id,
                                                e.target.checked
                                            )
                                        }
                                        className="w-4 h-4 text-blue-600 rounded"
                                    />
                                    <div
                                        onClick={() =>
                                            navigate(
                                                `/products/${item.product.id}`
                                            )
                                        }
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
                                                In stock:{" "}
                                                {item.product.inventory
                                                    ?.quantity || "N/A"}
                                            </p>
                                        </div>

                                        <div className="flex flex-col lg:mx-10  items-end text-right min-w-[100px]">
                                            <p className="text-orange-600 font-semibold text-lg">
                                                Rs. {displayPrice.toFixed(2)}
                                            </p>
                                            {hasDiscount && (
                                                <p className="text-gray-400 text-sm line-through">
                                                    Rs.{" "}
                                                    {originalPrice.toFixed(2)}
                                                </p>
                                            )}

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-gray-500 hover:text-red-600"
                                                onClick={(e) =>
                                                  {  e.stopPropagation();
                                                  handleRemoveItem(item.id);}
                                                }
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 border rounded-md px-2">
                                        <button
                                            className="px-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                            onClick={() =>
                                                handleQuantityUpdate(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                            disabled={item.quantity <= 1}
                                        >
                                            <MinusIcon className="w-4 h-4" />
                                        </button>
                                        <span className="min-w-[2rem] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            className="px-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                            onClick={() =>
                                                handleQuantityUpdate(
                                                    item.id,
                                                    item.quantity + 1
                                                )
                                            }
                                            disabled={
                                                item.product.inventory
                                                    ? item.quantity >=
                                                      item.product.inventory
                                                          .quantity
                                                    : false
                                            }
                                        >
                                            <PlusIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Right Section - Order Summary */}
            <div className="bg-white rounded-xl shadow p-6 h-fit border border-gray-200 sticky top-6">
                <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                    Order Summary
                </h2>

                <div className="flex justify-between text-sm mb-2">
                    <span>
                        Subtotal ({selectedItemsCount} item
                        {selectedItemsCount !== 1 ? "s" : ""})
                    </span>
                    <span>Rs. {selectedItemsTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm mb-4">
                    <span>Shipping Fee</span>
                    <span className="text-green-600">Rs. 0</span>
                </div>

                <div className="flex justify-between font-semibold text-lg mb-4 border-t pt-4">
                    <span>Total</span>
                    <span className="text-orange-600">
                        Rs. {selectedItemsTotal.toFixed(2)}
                    </span>
                </div>

                <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
                    onClick={handleCheckout}
                    disabled={selectedItemsCount === 0}
                >
                    Proceed to Checkout ({selectedItemsCount})
                </Button>

                {/* Clear cart button */}
                <Button
                    variant="outline"
                    className="w-full mt-3 text-red-500 border-red-200 hover:bg-red-50"
                    onClick={handleBulkDelete}
                >
                    Clear Entire Cart
                </Button>
            </div>
        </div>
    );
};

export default CartPage;
