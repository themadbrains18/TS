// validationSchema.ts
import { z } from 'zod';

/**
 * Defining the signup schema with validation rules
 */
export const signupSchema = z.object({
    // Name validation: ensures the name field is not empty
    name: z.string().min(1, { message: "Name is required" }),

    // Email validation: ensures the email field is not empty and has a valid email format
    email: z.string()
        .min(1, { message: "Email is required" }) 
        .email({ message: "Please enter a valid email address" }),

    // Password validation: must be at least 8 characters, include at least one lowercase letter, one uppercase letter, one number, and one special character
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" }) 
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, {
            message: "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character"
        }),

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
