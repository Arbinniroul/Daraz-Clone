import { z } from "zod";

// Auth forms
export const authSchema = z.object({
    username: z.string().min(1, "Username is required"),
    phone: z.string().optional(),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Inferred type for form values
// Product forms
export const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
    price: z.number().min(0.01, "Price must be greater than 0"),
    categoryId: z.string().min(1, "Category is required"),
    images: z.array(z.string().url()).min(1, "At least one image is required"),
    inventory: z.object({
        quantity: z.number().min(0, "Quantity cannot be negative"),
        sku: z.string().optional(),
    }),
});

// Address forms
export const addressSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phonenumber: z.string().min(1, "Phone number is required"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    location: z.enum(["Home", "Office"]).default("Home"),
    isDefault: z.boolean().default(false),
});

// Infer TypeScript types from Zod schemas

export type ProductForm = z.infer<typeof productSchema>;
export type AuthSchema = z.infer<typeof authSchema>;
export type AddressForm = z.infer<typeof addressSchema>;
