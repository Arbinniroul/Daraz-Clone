import { Button } from "@/components/ui/Button";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentCashier = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { total, quantity, selectedItems } = location.state || {};

    
    const handlePaymentMethod = (method) => {
        if (method === "paypal") {
            navigate("/pay", {
                state: {
                    total,
                    quantity,
                    selectedItems,
                    paymentMethod: "paypal",
                },
            });
        } else if (method === "esewa") {

            console.log("eSewa selected");
        } else if (method === "khalti") {
            // Handle Khalti integration
            console.log("Khalti selected");
        }
    };

    return (
        <div className="container w-full px-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 w-full">
                 
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <span className="text-2xl font-semibold text-gray-900">
                                Select payment method
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            
                            <Button
                                onClick={() => handlePaymentMethod("paypal")}
                                className="flex flex-col items-center justify-center p-6 bg-[#f5f6f9] rounded-lg hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent transition-all duration-200 w-32"
                            >
                                <div className="w-12 h-12 mb-2 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-bold text-sm">
                                        PP
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                    PayPal
                                </span>
                            </Button>

                            {/* eSewa Option */}
                            <Button
                                onClick={() => handlePaymentMethod("esewa")}
                                className="flex flex-col items-center justify-center p-6 bg-[#f5f6f9] rounded-lg hover:bg-green-50 hover:border-green-200 border-2 border-transparent transition-all duration-200 w-32"
                            >
                                <div className="w-12 h-12 mb-2 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-green-600 font-bold text-sm">
                                        ES
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                    eSewa
                                </span>
                            </Button>


                            {/* Khalti Option */}
                            <Button
                            variant={"ghost"}
                                onClick={() => handlePaymentMethod("khalti")}
                                className="flex flex-col items-center justify-center p-6 bg-[#f5f6f9] rounded-lg hover:bg-purple-50 hover:border-purple-200 border-2 border-transparent transition-all duration-200 w-32"
                            >
                                <div className="w-12 h-12 mb-2 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-purple-600 font-bold text-sm">
                                        KH
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                    Khalti
                                </span>
                            </Button>
                        </div>

                        {/* Payment Method Details */}
                        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Secure Payment
                            </h3>
                            <p className="text-gray-600 text-sm">
                                All payments are processed securely. Your
                                financial information is encrypted and
                                protected.
                            </p>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white w-full rounded-lg border border-gray-200 shadow-sm">
                            <div className="p-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-3 w-full">
                                        <span className="text-xl font-semibold text-gray-900">
                                            Order Summary
                                        </span>
                                        <span className="text-gray-600 text-sm">
                                            Subtotal ({quantity || 0} items with
                                            shipping fee included)
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <span className="flex-1 text-gray-700">
                                                Total Amount
                                            </span>
                                            <span className="text-xl font-bold text-gray-900">
                                                ${Number(total || 0).toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex justify-end">
                                            <span className="text-xs text-gray-500">
                                                All taxes included
                                            </span>
                                        </div>
                                    </div>

                                    {/* Selected Items Preview */}
                                    {selectedItems &&
                                        Object.keys(selectedItems).length >
                                            0 && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <span className="text-sm font-medium text-gray-700 mb-2 block">
                                                    Items in order:
                                                </span>
                                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                                    {Object.values(
                                                        selectedItems
                                                    ).map((item: any) => (
                                                        <div
                                                            key={item.id}
                                                            className="flex justify-between text-sm"
                                                        >
                                                            <span className="text-gray-600 truncate flex-1">
                                                                {item.name}
                                                            </span>
                                                            <span className="text-gray-900 font-medium ml-2">
                                                                ${item.price} x{" "}
                                                                {item.quantity}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCashier;
