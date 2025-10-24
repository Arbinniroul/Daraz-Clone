import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Landing from "./pages/common/Landing";
import AllProductsPage from "./pages/common/products/AllProductsPage";
import ProductPage from "./pages/common/products/ProductPage";
import CartPage from "./pages/customer/cart/CartPage";
import type { AppDispatch, RootState } from "./store";
import { fetchCart } from "./store/slices/cartSlice";

const useAppInitializer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated,token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated && token ) {
            console.log("AppInitializer: Fetching cart for authenticated user");
            dispatch(fetchCart());
        } else {
            console.log(
                "AppInitializer: User not authenticated, clearing cart data"
            );
            localStorage.removeItem("TotalCartItems");
        }
    }, [dispatch, isAuthenticated,token]);
};

function App() {
    useAppInitializer();

    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<Landing />} />
                <Route path="about" element={<About />} />
                <Route path="products/:id" element={<ProductPage />} />
                <Route path="/allproducts" element={<AllProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Route>
        </Routes>
    );
}

export default App;
