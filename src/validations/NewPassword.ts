
import { z } from 'zod';

/**
 * Defining the change password schema with validation rules
 */
export const newChangePassword = z.object({
    // newPassword validation: must be at least 8 characters, include at least one lowercase letter, one uppercase letter, one number, and one special character
    newPassword: z.string()
        .min(8, { message: "Password must be at least 8 characters" }) 
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, {
            message: "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character"
        }),

    // confirmPassword validation: must be at least 8 characters, include at least one lowercase letter, one uppercase letter, one number, and one special character
    confirmPassword: z.string()
        .min(8, { message: "Password must be at least 8 characters" }) 
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, {
            message: "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character"
        }),
})
/**
 * Ensures the newPassword and confirmPassword fields match
 */
.refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
});

export type changePassword = z.infer<typeof newChangePassword>;
