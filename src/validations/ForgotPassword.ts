import { z } from "zod";

/**
 * Regular expression for validating email format
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 *  Regular expression for validating phone number format (international format)
 */
const phoneRegex = /^\+?\d{10,14}$/;

/**
 * Schema validation for forgot password form
 */
const forgotPassword = z.object({
    // Validates the email or phone field
    email: z
    .string() // The field should be a string
    .min(1, {message:"Email is required"}) // The email or phone is required (min length 1)
    .refine(
      (value) => emailRegex.test(value) || phoneRegex.test(value), // Refining the validation to check if the value matches either the email or phone regex
      "Invalid email " // Custom error message when neither email nor phone number format is matched
    ),
});

// Export the schema for use in other parts of the application
export default forgotPassword;
