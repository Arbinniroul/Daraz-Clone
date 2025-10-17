import { zodResolver } from "@hookform/resolvers/zod";
import { Search, ShoppingCartIcon } from "lucide-react";
import {  useState } from "react";
import { useForm } from "react-hook-form";


import { useNavigate } from "react-router-dom";
import Auth from "./auth/Auth";
import { authSchema, type AuthSchema } from "@/types";


const Navbar = () => {
    const navigate = useNavigate();
    const [isAuthValue, setIsAuthValue] = useState("");
    
    const form = useForm<AuthSchema>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            username: "",
            phone: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: AuthSchema) {
        if (isAuthValue === "signup") {
            // Handle login logic here
            const response = await fetch(
                "http://localhost:3000/api/auth/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                }
            );
            const data = await response.json();
            const token = data.token;
            localStorage.setItem("token", token);
            if (response.ok) {
                setIsAuthValue("");
                navigate("/");
            }
            console.log("Signup response:", data);
            console.log("Logging in with:", values);
        } else {
            // Handle signup logic here

            console.log("Signing up with:", values);
        }
    }
    return (
        <div className="min-w-7xl bg-[#f75506] h-30 ">
            <nav className="max-w-7xl mx-auto flex items-center justify-end px-4">
                <ul className="flex space-x-6 text-white font-semibold cursor-pointer py-2">
                    <li>Save More On App</li>
                    <li>Become a Seller</li>
                    <li>Help and Support</li>

                    <li onClick={() => setIsAuthValue("login")}>LOGIN</li>
                    <li onClick={() => setIsAuthValue("signup")}>SIGNUP</li>
                </ul>
            </nav>
            <div className="max-w-7xl flex  items-center  sm:mx-4 md:mx-20 mx-0 lg:mx-40 px-4 py-3">
                <div className="flex lg:space-x-2  items-center gap-20  ">
                    <img
                        src="https://lzd-img-global.slatic.net/us/domino/3b870cb043c7f8a9741cbf66329e294e.png"
                        alt="Daraz Logo"
                        className="h-10 w-32
                        "
                    />
                    <div className="flex items-center space-x-4 gap-3">
                        <div className="h-10 w-[600px] flex items-center bg-white">
                            <input
                                type="text"
                                className="h-full w-full rounded-xs px-4 focus:outline-none  placeholder:tracking-tight placeholder:text-sm placeholder:text-gray-350"
                                placeholder="Search in Daraz"
                            />
                            <button className="cursor-pointer h-full px-2 bg- flex items-center text-[#f75506] bg-[#ffe1d2]  ">
                                <Search />
                            </button>
                        </div>
                        <ShoppingCartIcon className="text-white size-7" />
                    </div>
                </div>
            </div>
            <Auth
                onSubmit={onSubmit}
                isAuthValue={isAuthValue}
                setIsAuthValue={setIsAuthValue}
                form={form}
                formSchema={authSchema}
            />
        </div>
    );
};

export default Navbar;
