// validationSchema.ts
import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, {
            message: "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character"
        }),
});

export type loginFormdata = z.infer<typeof loginSchema>;
// export type SignupFormOtpData = z.infer<typeof signupSchemaOtp>;

