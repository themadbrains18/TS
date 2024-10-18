// validationSchema.ts
import { z } from 'zod';



export const uploadTemplate = z.object({
   name: z.string({message:"Enter Your Name"}),
   version: z.string({message:"Enter Your Version"}),
   seoTags: z.string({message:"Enter Your Tags"}),
   dollarPrice: z.number({message:"Enter Your Price"}),
  

   zipFile: z
   .instanceof(FileList)
   .refine((files) => files.length > 0, 'File is required') // Ensure a file is selected
   .refine(
     (files) => files[0]?.size <= 10 * 1024 * 1024, // File size limit (5MB max)
     'File size should not exceed 10MB'
   )
   .refine(
     (files) => files[0]?.name.endsWith('.zip'), // Check file extension
     'Only .zip files are allowed'
   )
   .refine(
     (files) => files[0]?.type === 'application/zip', // Check MIME type for ZIP
     'Only ZIP files are allowed'
   ),
   mobilepic: z
   .instanceof(FileList)
   .refine((files) => files.length > 0, 'File is required') // Ensure at least one file is selected
   .refine((files) => files[0]?.size <= 10 * 1024 * 1024, 'File size should not exceed 10MB') // Check file size
   .refine((files) => ['image/jpeg', 'image/png'].includes(files[0]?.type), 'Only .jpg and .png files are allowed'), // Validate file type
   preview: z
   .instanceof(FileList)
   .refine((files) => files.length > 0, 'File is required') // Ensure at least one file is selected
   .refine((files) => files[0]?.size <= 10 * 1024 * 1024, 'File size should not exceed 10MB') // Check file size
   .refine((files) => ['image/jpeg', 'image/png'].includes(files[0]?.type), 'Only .jpg and .png files are allowed'), // Validate file type
   slides: z
   .instanceof(FileList)
   .refine((files) => files.length > 0, 'File is required') // Ensure at least one file is selected
   .refine((files) => files[0]?.size <= 10 * 1024 * 1024, 'File size should not exceed 10MB') // Check file size
   .refine((files) => ['image/jpeg', 'image/png'].includes(files[0]?.type), 'Only .jpg and .png files are allowed'), // Validate file type

});


export type uploadTemplate = z.infer<typeof uploadTemplate>;
// export type SignupFormOtpData = z.infer<typeof signupSchemaOtp>;

