import { z } from 'zod';

/**
 * Defining the login schema with validation rules
 */
export const loginSchema = z.object({
    // Email validation: must be a string and a valid email format
    email: z.string().email({ message: "Invalid email" }),

    // Password validation: must be a string with at least 8 characters
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" }) // Ensures password has a minimum length of 8 characters
        // Password must match the regex pattern for complexity
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, {
            message: "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character"
        }),
});

// Type definition for login form data using the inferred types from loginSchema
export type loginFormdata = z.infer<typeof loginSchema>;

