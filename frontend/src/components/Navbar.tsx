import { Search, ShoppingCartIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,

    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose

} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";


const Navbar = () => {
        const [isAuthValue, setIsAuthValue] = useState("");
      
       
        const formSchema = z.object({
            name: z.string().min(2, {
                message: "Name must be at least 2 characters.",
            }), 
            number: z.string().min(10, {
                message: "Number must be at least 10 characters.",
            }),
            email: z.string().min(2, {
                message: "Username must be at least 2 characters.",
            }),
            password: z.string().min(6, {
                message: "Password must be at least 6 characters.",
            }),

        });
   const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver (formSchema),
       defaultValues: {
           name: "",
           number:"",
           email: "",
           password: "",
       },
   });
   
      function onSubmit(values: z.infer<typeof formSchema>) {
          // Do something with the form values.
          // ✅ This will be type-safe and validated.
          console.log(values);
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
            <Dialog
                open={isAuthValue === "login" || isAuthValue === "signup"}
                onOpenChange={() => setIsAuthValue("")}
            >
                <DialogContent className="sm:max-w-[425px] bg-[#ffffff] border-none">
                    {isAuthValue === "login" ? (
                        <div>
                            <DialogHeader>
                                <DialogTitle>Login</DialogTitle>

                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-2"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your email"
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your password"
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <span className="text-sm cursor-pointer text-muted-foreground ml-60 mb-20 ">
                                            forgot password?
                                        </span>
                                    </form>
                                    <Button
                                        type="submit"
                                        className="bg-[#f75506] h-11 text-semi-bold text-white text-[15px] hover:bg-[#f75506] hover:opacity-80 cursor-pointer"
                                    >
                                        LOGIN
                                    </Button>
                                    <div className="text-center mt-1">
                                        <span>
                                            Dont have an account?{" "}
                                            <span
                                                className="text-[#f75506] cursor-pointer"
                                                onClick={() =>
                                                    setIsAuthValue("signup")
                                                }
                                            >
                                                Sign Up
                                            </span>
                                        </span>
                                    </div>
                                </Form>
                            </DialogHeader>
                            <div className="grid gap-4"></div>
                            <DialogFooter>
                                <DialogClose asChild></DialogClose>
                            </DialogFooter>
                        </div>
                    ) : (
                        <div>
                            <DialogHeader>
                                <DialogTitle>Signup</DialogTitle>

                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-2"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your name"
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your email"
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your password"
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="number"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your number"
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                      
                                    </form>
                                    <Button
                                        type="submit"
                                        className="bg-[#f75506] h-11 text-semi-bold text-white text-[15px] hover:bg-[#f75506] hover:opacity-80 cursor-pointer"
                                    >
                                        SIGNUP
                                    </Button>
                                    <div className="text-center mt-1">
                                        <span>
                                            Already have an account?{" "}
                                            <span
                                                className="text-[#f75506] cursor-pointer"
                                                onClick={() =>
                                                    setIsAuthValue("login")
                                                }
                                            >
                                               Login
                                            </span>
                                        </span>
                                    </div>
                                </Form>
                            </DialogHeader>
                            <div className="grid gap-4"></div>
                            <DialogFooter>
                                <DialogClose asChild></DialogClose>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Navbar;
