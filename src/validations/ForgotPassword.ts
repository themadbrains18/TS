// validationSchema.ts
import { z } from 'zod';

export const forgotPassword = z.object({
    email: z.string().email({ message: "Invalid email" }),
});


export type forgotPassword = z.infer<typeof forgotPassword>;
// export type SignupFormOtpData = z.infer<typeof signupSchemaOtp>;

