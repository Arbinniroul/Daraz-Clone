// Checkout.tsx
import React, { useEffect, useState, useRef } from "react";

const Checkout: React.FC = () => {
    const [clientToken, setClientToken] = useState<string | null>(null);
    const paypalContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        async function fetchToken() {
            const resp = await fetch("/api/paypal/client-token");
            const data = await resp.json();
            setClientToken(data.clientToken);
        }
        fetchToken();
    }, []);

    useEffect(() => {
        if (!clientToken) return;
        
        const script = document.createElement("script");
        script.src = "https://www.sandbox.paypal.com/web-sdk/v6/core";
        script.async = true;
        script.onload = async () => {
            if (!(window as any).paypal) {
                console.error("PayPal SDK not available");
                return;
            }
            const paypal = (window as any).paypal;

            // 3. Create SDK instance
            const sdkInstance = await paypal.createInstance({
                clientToken: clientToken,
                components: ["paypal-payments"],
                currency: "USD",
                pageType: "checkout",
            });

        
            const paymentSession =
                sdkInstance.createPayPalOneTimePaymentSession({
                    onApprove: async (session, { orderId }) => {
                        console.log("Payment approved, orderId:", orderId);
                      
                        await fetch("/api/paypal/capture", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ orderId }),
                        });
                    },
                    onCancel: () => {
                        console.log("Payment cancelled");
                    },
                    onError: (err) => {
                        console.error("Payment error:", err);
                    },
                });

           
            const buttonEl = document.createElement("paypal-button");
            buttonEl.setAttribute("type", "pay");
            buttonEl.addEventListener("click", async () => {
                await paymentSession.start({ presentationMode: "auto" });
            });

            if (paypalContainerRef.current) {
                paypalContainerRef.current.innerHTML = "";
                paypalContainerRef.current.appendChild(buttonEl);
            }
        };
        document.body.appendChild(script);
    }, [clientToken]);

    return (
        <div>
            <h2>Checkout</h2>
            <div ref={paypalContainerRef}></div>
        </div>
    );
};

export default Checkout;
