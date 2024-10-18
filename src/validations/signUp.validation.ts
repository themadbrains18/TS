// validationSchema.ts
import { z } from 'zod';



export const signupSchema = z.object({
    uname: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, {
            message: "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character"
        }),
    confirmPassword: z.string()
        .min(8, { message: "Confirm password must be at least 8 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


// export const signupSchemaOtp = signupSchema.extend({
//     otp: z.string()
//       .length(6, "OTP must be exactly 6 digits")
//       .regex(/^\d{6}$/, "OTP must be a 6-digit number")
//       .optional(), // Adjust this if you want the OTP to be required
//       date_of_birth : z.object({}).default({}),
//       marital_status : z.number().default(1),
//       newsletter : z.string().default('0'),
//       anniversary_date : z.string().default(''),
//       otp_id: z.string()
//   })

export type SignupFormData = z.infer<typeof signupSchema>;
// export type SignupFormOtpData = z.infer<typeof signupSchemaOtp>;

