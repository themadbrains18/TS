// validationSchema.ts
import { z } from 'zod';



export const uploadTemplate = z.object({
   name: z.string({message:"Enter Your Name"}),
   templateType: z.string({message:"Select Template Type"}),
   subCategory: z.string({message:"Select Category"}),
   softwareType: z.string({message:"Select Software Type"}),
   industry: z.array(z.string()).nonempty({ message: "Select at least one Industry Type" }), // Multiple selection allowed
   version: z.string({message:"Enter Your Version"}),
   seoTags: z.string({message:"Enter Your Tags"}),
   dollarPrice: z.number({message:"Enter Your Price"}),
 

});

const validateCredits = (items: any[], itemName: string) => {
   if (items.length === 0) {
     return z.custom(() => false, { message: `${itemName} must have at least one entry` });
   }
   return z.array(z.object({
     name: z.string().min(1, `${itemName} name is required`),
     url: z.string().url(`${itemName} URL must be a valid URL`),
   }));
 };
 
 // Example of how to integrate credits validation
 const creditsSchema = z.object({
   fonts: validateCredits([], "Font"),
   images: validateCredits([], "Image"),
   icons: validateCredits([], "Icon"),
   illustrations: validateCredits([], "Illustration"),
 });


export type uploadTemplate = z.infer<typeof uploadTemplate>;
// export type SignupFormOtpData = z.infer<typeof signupSchemaOtp>;

