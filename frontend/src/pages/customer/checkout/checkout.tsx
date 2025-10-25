import ProductComponent from "@/components/products/ProductComponent";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { CartItem } from "@/types";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
    const location = useLocation();
    const { selectedItems } = location.state || { selectedItems: {} };
    console.log(selectedItems)
    const totalItemsPrice = Number(selectedItems
        .filter((item: CartItem) => item)
        .map(
            (item: CartItem) =>
                item.product.salePrice || item.product.price * item.quantity
        )
        .reduce((a: number, b: number) => a + b, 0)
        .toFixed(0))
        const deliveryFee = 143;

    return (
        <div className="container w-full  min-h-screen ">
            <div className="w-full mx-auto max-w-7xl 2xl:mx-56 lg:px-10   ">
                <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    <div className="grid lg:col-span-2 ">
                        <div className="flex flex-col gap-2 ">
                            <div className="px-10 py-10  bg-[#ffff] w-full rounded-md">
                                <h1 className="">Shipping Address</h1>
                            </div>
                            <div>
                                <div className="px-4 py-2 bg-[#fafafa] w-full">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold">
                                            {" "}
                                            Package {selectedItems.length} items
                                            of {selectedItems.length}
                                        </span>
                                        <span className="text-sm text-[#747474]">
                                            Fullfilled by{" "}
                                            <span className="font-semibold">
                                                Daraz
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="px-4 py-2 bg-[#ffff]">
                                    <div className="flex flex-col gap-4 ">
                                        <span className="text-sm">
                                            Choose your delivery option
                                        </span>
                                        <div className="flex">
                                            <div className="flex gap-2  px-4 py-3 border border-[#0094b7] rounded-md cursor-pointer">
                                                <Checkbox className="size-4 my-1 has-checked:bg-[#0094b7]" />
                                                <div className="gap-2 flex flex-col justify-center">
                                                    <span>Rs 143</span>

                                                    <div className="flex flex-col gap-2">
                                                        <span>
                                                            Standard delivery
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
                                        {selectedItems.map((item: CartItem) => (
                                            <div
                                                key={item.id}
                                                className="px-2 py-2"
                                            >
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
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:col-span-1">
                        <div className="px-4 py-5 bg-[#ffff] w-full lg:h-fit rounded-md ">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between">
                                    <span className="text-lg">
                                        Invoice and Contact Info
                                    </span>
                                    <Button
                                        className="text-sm text-[#0094b7] "
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
                                            Items total ({selectedItems.length}{" "}
                                            items)
                                        </span>
                                        <span>Rs {totalItemsPrice}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="flex-1">
                                            Delivery Fee
                                        </span>
                                        <span>{deliveryFee.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-200 pt-4 text-sm">
                                        <span className="flex-1">Total</span>
                                        <span className="text-base  text-[#f65407]">
                                            Rs{" "}
                                            {
                                                (deliveryFee +
                                                    totalItemsPrice) as number
                                            }
                                           
                                        </span>
                                    </div>
                                    <div className="flex justify-end text-xs text-gray-500">
                                        <span>All taxes included</span>

                                    </div>
                                    <Button className="w-full bg-[#f47324] text-white">
                                       Proceed to Pay
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
