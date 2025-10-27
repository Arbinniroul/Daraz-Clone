
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ cart, onPaymentSuccess, onPaymentError }) => {
    const { total, items, shipping, tax } = cart;

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total.toString(),
                        currency_code: "USD",
                        breakdown: {
                            item_total: {
                                value: (total - shipping - tax).toString(),
                                currency_code: "USD",
                            },
                            shipping: {
                                value: shipping.toString(),
                                currency_code: "USD",
                            },
                            tax_total: {
                                value: tax.toString(),
                                currency_code: "USD",
                            },
                        },
                    },
                    items: items.map((item) => ({
                        name: item.name,
                        description: item.description,
                        quantity: item.quantity.toString(),
                        unit_amount: {
                            value: item.price.toString(),
                            currency_code: "USD",
                        },
                        category: "PHYSICAL_GOODS",
                    })),
                    shipping: {
                        name: {
                            full_name: "", // Will be filled by customer
                        },
                        address: {
                            // Address will be collected by PayPal
                        },
                    },
                },
            ],
            application_context: {
                shipping_preference: "GET_FROM_FILE", // Use saved addresses
                user_action: "PAY_NOW",
                brand_name: "Your Store Name",
            },
        });
    };

    const onApprove = async (data, actions) => {
        try {
            const details = await actions.order.capture();

            // Send to your backend
            const paymentData = {
                orderID: data.orderID,
                payerID: data.payerID,
                paymentID: details.id,
                status: details.status,
                email: details.payer.email_address,
                amount: details.purchase_units[0].amount.value,
                shipping: details.purchase_units[0].shipping,
            };

            onPaymentSuccess(paymentData);
        } catch (error) {
            onPaymentError(error);
        }
    };

    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
                currency: "USD",
                intent: "capture",
            }}
        >
            <div className="paypal-checkout">
                <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onPaymentError}
                    style={{
                        layout: "vertical",
                        color: "gold",
                        shape: "rect",
                        label: "paypal",
                        height: 45,
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalCheckout;
