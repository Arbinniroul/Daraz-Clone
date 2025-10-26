import type { AppDispatch } from "@/store";
import { addressSchema, type AddressForm } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Form, FormField, FormItem } from "../ui/form";

import { addAddress } from "@/store/thunks/authThunks";
import { toast } from "sonner";

interface AddressFormProps {
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;

}

const AddressFormContainer = ({ setOpenDialog }: AddressFormProps) => {
    const form = useForm({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            name: "",
            phonenumber: "",
            street: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
            location: "Home",
            isDefault: false,
        },
    });
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (data: AddressForm) => {
        dispatch(addAddress(data))
            .unwrap()
            .then(() => {
                toast.success("Address added successfully");
            })
            .catch((err) => {
                toast.error("Failed to add address:", err);
            });
        setOpenDialog(false);
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Full Name */}
                    <div className="flex gap-4 ">
                        {" "}
                        <div className="space-y-4 w-full ">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your first and last name"
                                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </FormItem>
                                )}
                            />
                            {/* Phone Number */}
                            <FormField
                                control={form.control}
                                name="phonenumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Please enter your Phone Number"
                                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </FormItem>
                                )}
                            />
                            {/* Street */}
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Street Address"
                                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {form.formState.errors.street && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    form.formState.errors.street
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            {/* Street */}
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="City"
                                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-4 w-full">
                            {["state", "country", "zipCode"].map(
                                (fieldName) => (
                                    <FormField
                                        key={fieldName}
                                        control={form.control}
                                        name={fieldName as keyof AddressForm}
                                        render={({ field }) => (
                                            <FormItem>
                                                <input
                                                    {...field}
                                                    type="text"
                                                    value={
                                                        field.value as string
                                                    }
                                                    placeholder={
                                                        fieldName
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        fieldName.slice(1)
                                                    }
                                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </FormItem>
                                        )}
                                    />
                                )
                            )}

                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex gap-4">
                                            {["Home", "Office"].map(
                                                (option) => (
                                                    <label
                                                        key={option}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="radio"
                                                            value={option}
                                                            checked={
                                                                field.value ===
                                                                option
                                                            }
                                                            onChange={() =>
                                                                field.onChange(
                                                                    option
                                                                )
                                                            }
                                                        />
                                                        {option}
                                                    </label>
                                                )
                                            )}
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            variant={"ghost"}
                            type="submit"
                            onClick={() => setOpenDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant={"ghost"} type="submit">
                            Save Address
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AddressFormContainer;
