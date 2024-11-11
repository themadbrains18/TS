// validationSchema.ts
import { z } from 'zod';

/**
 * Defining the signup schema with validation rules
 */
export const signupSchema = z.object({
    // Name validation: ensures the name field is not empty
    name: z
        .string() // Ensure it's a string
        .min(1, { message: "Name is required" }) // Minimum length of 1 character
        .max(30, { message: "Name must be less than or equal to 30 characters" }) // Maximum length of 30 characters
        .regex(/^[A-Za-z\s]+$/, { message: "Name can only contain alphabetic characters and spaces" }),

    // Email validation: ensures the email field is not empty and has a valid email format
    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Please enter a valid email address" }),

    // Password validation: must be at least 8 characters, include at least one lowercase letter, one uppercase letter, one number, and one special character
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(20, "Password must be no more than 16 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
            'Password must include one lowercase letter, one uppercase letter, one number, and one special character',
        ),

    // Confirm password validation: must be at least 8 characters
    confirmPassword: z.string()
        .min(8, { message: "Confirm password must be at least 8 characters" }),
})
    /**
     * Ensures the password and confirm password match
     */
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type SignupFormData = z.infer<typeof signupSchema>;
