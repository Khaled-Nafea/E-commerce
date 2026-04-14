import * as z from "zod"

export const checkoutSchema = z.object({
    details: z.string().nonempty("Address is required").min(10, "Address details must be at least 10 characters"),
    phone: z.string().nonempty("Phone is required").regex(/^01[0125][0-9]{8}$/, "Invalid phone number"),
    city: z.string().nonempty("City is required"),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>


export const addressSchema = z.object({
    name: z.string().nonempty("Name is required").min(3, "Name must be at least 3 characters long"),
    details: z.string().nonempty("Address is required").min(10, "Address details must be at least 10 characters"),
    phone: z.string().nonempty("Phone is required").regex(/^01[0125][0-9]{8}$/, "Invalid phone number"),
    city: z.string().nonempty("City is required"),
})

export type AddressFormData = z.infer<typeof addressSchema>