import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{10,14}$/;

const forgotPassword = z.object({
    email: z
    .string()
    .min(1, {message:"Email or phone number is required"}) // Equivalent of `required` in Yup
    .refine(
      (value) => emailRegex.test(value) || phoneRegex.test(value),
      "Invalid email or phone number"
    ),
});

export default forgotPassword;
