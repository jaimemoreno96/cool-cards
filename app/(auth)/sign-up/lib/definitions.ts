import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  name: z.string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  lastName: z.string({ required_error: "Last name is required" })
    .min(1, "Last name is required"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .refine((value) => /[A-Z]/.test(value), "Password must contain at least one uppercase letter")
    .refine((value) => /[a-z]/.test(value), "Password must contain at least one lowercase letter")
    .refine((value) => /\d/.test(value), "Password must contain at least one number"),
  confirmPassword: z.string({ required_error: "Confirm password is required" })
    .min(1, "Confirm password is required")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignUpFormInputs = z.infer<typeof signUpSchema>;
