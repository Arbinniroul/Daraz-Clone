import Navbar from "@/components/Navbar";
import type { RootState } from "@/store";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Home = () => {
    const { isLogoutLoading } = useSelector((state: RootState) => state.auth);
    return (
        <div className="relative max-w-screen ">
            <Navbar />
            <div>
                <Outlet />
            </div>
            {isLogoutLoading && (
                <div className="absolute flex justify-center items-center bg-amber-100 h-screen w-screen">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
            )}
        </div>
    );
};

export default Home;
