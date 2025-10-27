import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Landing from "./pages/common/Landing";
import AllProductsPage from "./pages/common/products/AllProducts";
import CategoryProduct from "./pages/common/products/CategoryProduct";
import ProductPage from "./pages/common/products/ProductPage";
import CartPage from "./pages/customer/cart/CartPage";
import type { AppDispatch, RootState } from "./store";
import { fetchCart } from "./store/slices/cartSlice";
import CheckoutPage from "./pages/customer/checkout/checkout";
import PaymentCashier from "./pages/customer/payment/PaymentCashier";
import Checkout from "./pages/customer/payment/PaymentCheckout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const useAppInitializer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, token } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (isAuthenticated && token) {
            console.log("AppInitializer: Fetching cart for authenticated user");
            dispatch(fetchCart());
        } else {
            console.log(
                "AppInitializer: User not authenticated, clearing cart data"
            );
            localStorage.removeItem("TotalCartItems");
        }
    }, [dispatch, isAuthenticated, token]);
};

function App() {
    useAppInitializer();

    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<Landing />} />
                <Route path="about" element={<About />} />
                <Route path="products/:id" element={<ProductPage />} />
                <Route
                    path="products/category/:id"
                    element={<CategoryProduct />}
                />
                <Route path="/allproducts" element={<AllProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/payment-cashier" element={<PaymentCashier />} />
                <Route
                    path="/pay"
                    element={
                        <PayPalScriptProvider
                            options={{
                                
                                "data-client-token": "",
                                
                                currency: "USD",
                            }}
                            deferLoading={true} 
                        >
                            <Checkout />
                        </PayPalScriptProvider>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
