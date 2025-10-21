import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import ProductPage from "./pages/common/products/ProductPage";
import Landing from "./pages/common/Landing";
import AllProducts from "./pages/common/products/AllProducts";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<Landing />} />
                <Route path="about" element={<About />} />
                <Route path="products/:id" element={<ProductPage />} />
                <Route path="allproducts" element={<AllProducts />} />
            </Route>
        </Routes>
    );
}

export default App;
