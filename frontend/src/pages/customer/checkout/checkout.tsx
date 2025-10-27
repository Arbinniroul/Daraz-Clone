import AddressContainer from "@/components/checkout/address/addressContainer";
import { Sheethandler } from "@/components/checkout/Sheethandler";
import ProductComponent from "@/components/products/ProductComponent";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { AppDispatch, RootState } from "@/store";
import { getAddresses } from "@/store/thunks/authThunks";
import type { Address, CartItem } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
    const location = useLocation();
    const { selectedItems } = location.state || { selectedItems: [] };
    console.log(selectedItems, "loaded");

    const [selectedAddress, setSelectedAddress] = useState<Address | null>(
        null
    );
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const { addresses } = useSelector((state: RootState) => state.address);

    const normalizedItems = (() => {
        if (!selectedItems) return [];

        console.log("Raw selectedItems:", selectedItems);

        if (Array.isArray(selectedItems) && selectedItems.length > 0) {
            if (
                selectedItems[0].product &&
                selectedItems[0].quantity !== undefined
            ) {
                return selectedItems as CartItem[];
            }

            if (selectedItems[0].id && selectedItems[0].name) {
                return selectedItems.map((product) => ({
                    id: `buynow-${product.id}`,
                    quantity: 1,
                    product: product,
                    productId: product.id,
                    cartId: `temp-${product.id}`,
                })) as CartItem[];
            }
        }

        if (selectedItems.id && selectedItems.name) {
            return [
                {
                    id: `buynow-${selectedItems.id}`,
                    quantity: 1,
                    product: selectedItems,
                    productId: selectedItems.id,
                    cartId: `temp-${selectedItems.id}`,
                },
            ] as CartItem[];
        }

        return [];
    })();

    useEffect(() => {
        console.log(user, "user");
        if (user?.id) {
            dispatch(getAddresses(user.id));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (addresses && addresses.length > 0 && !selectedAddress) {
            const defaultAddress =
                addresses.find((addr) => addr.isDefault) || addresses[0];
            setSelectedAddress(defaultAddress);
        }
    }, [addresses, selectedAddress]);

    const totalItemsPrice = Number(
        normalizedItems
            .filter((item: CartItem) => item)
            .map(
                (item: CartItem) =>
                    (item.product.salePrice || item.product.price || 0) *
                    item.quantity
            )
            .reduce((a: number, b: number) => a + b, 0)
            .toFixed(0)
    );

    const deliveryFee = 143;

    const handleAddressSelect = (address: Address) => {
        console.log("Address selected:", address);
        setSelectedAddress(address);
    };

    if (!normalizedItems || normalizedItems.length === 0) {
        return (
            <div className="container w-full min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">No items selected</h2>
                    <p>Please go back and select items to checkout</p>
                </div>
            </div>
        );
    }

    return (
        <div className=" w-full ">
            <div className="w-full mx-auto max-w-7xl 2xl:mx-56 lg:px-10">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    <div className="grid lg:col-span-2">
                        <div className="flex flex-col gap-2">
                            <div>
                                <div className="px-4 py-2 bg-[#fafafa] w-full">
                                    <div className="flex items-center justify-between">
                                        <span>Shipping Address</span>
                                        <Sheethandler
                                            addresses={addresses}
                                            onAddressSelect={
                                                handleAddressSelect
                                            }
                                            selectedAddress={selectedAddress}
                                        />
                                    </div>
                                </div>
                                <div className="px-4 py-4 bg-white border border-gray-200 rounded-lg">
                                    {selectedAddress ? (
                                        <div>
                                            <div className="mb-2 text-sm font-medium text-gray-700">
                                                Selected Shipping Address:
                                            </div>
                                            <AddressContainer
                                                address={selectedAddress}
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-gray-500">
                                            No address selected. Please add a
                                            shipping address.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {normalizedItems.map(
                                (item: CartItem, index: number) => (
                                    <div key={item.id}>
                                        <div className="px-4 py-2 bg-[#fafafa] w-full">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold">
                                                    Package {index + 1} of{" "}
                                                    {normalizedItems.length}
                                                </span>
                                                <span className="text-sm text-[#747474]">
                                                    Fulfilled by{" "}
                                                    {item.product?.seller
                                                        ?.storeName || "Daraz"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="px-4 py-2 bg-white">
                                            <div className="flex flex-col gap-4">
                                                <span className="text-sm">
                                                    Choose your delivery option
                                                </span>
                                                <div className="flex">
                                                    <div className="flex gap-2 px-4 py-3 border border-[#0094b7] rounded-md cursor-pointer">
                                                        <Checkbox
                                                            checked
                                                            className="size-4 my-1 has-checked:bg-[#0094b7]"
                                                        />
                                                        <div className="gap-2 flex flex-col justify-center">
                                                            <span>$143</span>
                                                            <div className="flex flex-col gap-2">
                                                                <span>
                                                                    Standard
                                                                    delivery
                                                                </span>
                                                                <span>
                                                                    Get by{" "}
                                                                    {new Date(
                                                                        Date.now() +
                                                                            5 *
                                                                                24 *
                                                                                60 *
                                                                                60 *
                                                                                1000
                                                                    ).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="px-2 py-2">
                                                    <ProductComponent
                                                        item={item}
                                                        displayPrice={
                                                            item.product
                                                                .salePrice ||
                                                            item.product.price
                                                        }
                                                        originalPrice={
                                                            item.product.price
                                                        }
                                                        hasDiscount={
                                                            item.product
                                                                .discountPercentage
                                                        }
                                                        handleRemoveItem={() => {}}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="grid lg:col-span-1">
                        <div className="px-4 py-5 bg-white w-full lg:h-fit rounded-md border border-gray-200">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between">
                                    <span className="text-lg">
                                        Invoice and Contact Info
                                    </span>
                                    <Button
                                        className="text-sm text-[#0094b7]"
                                        variant={"ghost"}
                                    >
                                        Edit
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-lg">
                                        Order Detail
                                    </span>
                                    <div className="flex justify-between">
                                        <span className="flex-1">
                                            Items total (
                                            {normalizedItems.length} items)
                                        </span>
                                        <span>${totalItemsPrice}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="flex-1">
                                            Delivery Fee
                                        </span>
                                        <span>${deliveryFee.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-200 pt-4 text-sm">
                                        <span className="flex-1">Total</span>
                                        <span className="text-base text-[#f65407]">
                                            ${deliveryFee + totalItemsPrice}
                                        </span>
                                    </div>
                                    <div className="flex justify-end text-xs text-gray-500">
                                        <span>All taxes included</span>
                                    </div>
                                    <Button
                                        className="w-full bg-[#f47324] text-white hover:bg-[#e3661d]"
                                        disabled={!selectedAddress}
                                    >
                                        {selectedAddress
                                            ? "Proceed to Pay"
                                            : "Select Shipping Address"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
