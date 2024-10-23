// validationSchema.ts
import { z } from 'zod';

export const newChangePassword = z.object({
    newPassword: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, {
            message: "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character"
        }),
        confirmPassword: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, {
            message: "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character"
        }),
});

export type changePassword = z.infer<typeof newChangePassword>;
// export type SignupFormOtpData = z.infer<typeof signupSchemaOtp>;

