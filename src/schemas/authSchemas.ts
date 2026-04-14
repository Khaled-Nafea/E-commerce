import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long") .max(20, "Name must be at most 20 characters long"),

    email: z.string().nonempty("Email is required")
      .email("Invalid email format"),

    password: z.string().nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 chars, include uppercase, lowercase, number & special character"),

    rePassword: z.string().nonempty("Confirm Password is required"),

    phone: z.string().nonempty("Phone is required").regex(/^01[0125][0-9]{8}$/, "Phone must be 11 digits and start with 01"),

  }).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>


export const loginSchema = z.object({
    email: z.string().nonempty("Email is required")
      .email("Invalid email format"),

    password: z.string().nonempty("Password is required"),
  });

export type LoginFormData = z.infer<typeof loginSchema>

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current Password is required"),

  password: z.string().min(1, "Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"),

  rePassword: z.string().min(1, "Confirm Password is required"),
})
.refine((data) => data.currentPassword !== data.password, {
  message: "New password must be different from current password",
  path: ["password"],
})
.refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export const updateProfileSchema = z.object({
  name: z.string().nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must be at most 20 characters long"),

  email: z.string().nonempty("Email is required")
    .email("Invalid email format"),

  phone: z.string().nonempty("Phone is required")
    .regex(/^01[0125][0-9]{8}$/, "Phone must be 11 digits and start with 01"),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>

