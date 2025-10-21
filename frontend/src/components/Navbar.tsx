import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    LogOut,
    Search,
    ShoppingCartIcon,
    Smile,
    StarIcon,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { AppDispatch, RootState } from "@/store";
import { loginUser, registerUser } from "@/store/thunks/authThunks";
import { authSchema, type AuthSchema } from "@/types";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Auth from "./auth/Auth";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

const Navbar = () => {
    const [isAuthValue, setIsAuthValue] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    );
    const navigate = useNavigate();
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
        try {
            if (isAuthValue === "signup") {
                await dispatch(registerUser(values)).unwrap();
                setIsAuthValue("");
            } else {
                await dispatch(
                    loginUser({
                        email: values.email,
                        password: values.password,
                    })
                ).unwrap();
                setIsAuthValue("");

                console.log("Login successful");
            }
        } catch (error) {
            console.error("Authentication failed:", error);
        }
    }
    return (
        <div className="max-w-screen">
            <div className=" bg-[#f75506] h-30 hidden xl:block">
                <nav className="max-w-7xl mx-auto flex items-center justify-end px-4">
                    <ul className="flex space-x-6 text-white  text-xs cursor-pointer py-2">
                        <li>SAVE MORE ON APP</li>
                        <li>BECOME A SELLER</li>
                        <li>HELP & SUPPORT</li>

                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <li className="cursor-pointer">
                                        {" "}
                                        {user?.username}'s Account
                                    </li>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="px-4 py-4 ">
                                    <DropdownMenuItem>
                                        <Smile className="size-6" /> Manage My
                                        Account{" "}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        {" "}
                                        <Box className="size-6" />
                                        My Orders
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <StarIcon className="size-6" />
                                        My Reviews
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <LogOut className="size-6" />
                                        <li onClick={() => dispatch(logout())}>
                                            Logout
                                        </li>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <li onClick={() => setIsAuthValue("login")}>
                                    LOGIN
                                </li>
                                <li onClick={() => setIsAuthValue("signup")}>
                                    SIGNUP
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
                <div className="max-w-7xl flex  items-center  sm:mx-4 md:mx-20 mx-0 lg:mx-40 px-4 py-3">
                    <div className="flex lg:space-x-2 px-20  items-center gap-20  ">
                        <img
                            src="https://lzd-img-global.slatic.net/us/domino/3b870cb043c7f8a9741cbf66329e294e.png"
                            alt="Daraz Logo"
                            className="h-10 w-32 cursor-pointer
                        "
                            onClick={() => navigate("/")}
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
            <div className="  block xl:hidden ">
                <div className="bg-[#f0f1f7] px-6 py-4">
                    <div className=" bg-[#ffffff ]  rounded-full text-5xl   border-2 flex items-center px-2 h-18 border-[#f75506]">
                        <Search className="text-gray-500 size-10" />
                        <Input className="outline-none border-none text-[22px] h-11 md:h-20 md:text-[25px] shadow-none focus-visible:ring-0" />
                        <Button className="bg-[#f75506] text-2xl rounded-full py-7 ">
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
