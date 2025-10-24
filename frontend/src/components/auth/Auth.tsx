import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import type { RootState } from "@/store";
import type { AuthSchema } from "@/types";
import type { UseFormReturn } from "react-hook-form";
import { useSelector } from "react-redux";

interface AuthProps {
    onSubmit: (values: AuthSchema) => Promise<void>;
    isAuthValue: string;
    setIsAuthValue: (value: string) => void;
    formSchema: object;
    form: UseFormReturn<AuthSchema>;
}

const Auth = ({ onSubmit, isAuthValue, setIsAuthValue, form }: AuthProps) => {
    const { isLoading } = useSelector((state: RootState) => state.auth);
    return (
        <div>
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
                                        <Button
                                            type="submit"
                                            className="w-full bg-[#f75506] h-11 text-semi-bold text-white text-[15px] hover:bg-[#f75506] hover:opacity-80 cursor-pointer"
                                            disabled={isLoading}
                                        >
                                            LOGIN
                                        </Button>
                                    </form>

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
                                            name="username"
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
                                            name="phone"
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
                                        <Button
                                            type="submit"
                                            className="bg-[#f75506] w-full h-11 text-semi-bold text-white text-[15px] hover:bg-[#f75506] hover:opacity-80 cursor-pointer"
                                            disabled={isLoading}
                                        >
                                            SIGNUP
                                        </Button>
                                    </form>

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

export default Auth;
