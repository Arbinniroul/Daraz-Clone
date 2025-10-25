import CategoryBar from "@/components/categories/CategoryBar";
import Navbar from "@/components/Navbar";

import { Outlet, useLocation } from "react-router-dom";


const Home = () => {
    const location= useLocation()
    const currentPath=location.pathname;
      const hideCategoryBar = ["/checkout", "/orders", "/cart"].includes(
          currentPath
      );
    

    return (
        <div className="relative max-w-screen bg-[#eff0f4] ">
            <Navbar />
            {hideCategoryBar && <CategoryBar />}
            <Outlet />
        </div>
    );
};

export default Home;
