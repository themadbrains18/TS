// validationSchema.ts
import { z } from 'zod';



export const uploadTemplate = z.object({
   name: z.string({message:"Enter Your Name"}),
   version: z.string({message:"Enter Your Version"}),
   seoTags: z.string({message:"Enter Your Tags"}),
   dollarPrice: z.number({message:"Enter Your Price"}),
   zipFile: z
   .instanceof(FileList)
   .refine((files) => files.length > 0, 'File is required') // Ensure at least one file is selected
   .refine((files) => files[0]?.size <= 2 * 1024 * 1024, 'File size should not exceed 2MB') // Check file size
   .refine((files) => ['image/zip', 'image/zip'].includes(files[0]?.type), 'Only .jpg and .png files are allowed'), // Validate file type
});


export type uploadTemplate = z.infer<typeof uploadTemplate>;
// export type SignupFormOtpData = z.infer<typeof signupSchemaOtp>;

