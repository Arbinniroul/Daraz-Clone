import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <div className="max-w-screen ">
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
