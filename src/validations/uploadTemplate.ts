// validationSchema.ts
import { z } from 'zod';



export const uploadTemplate = z.object({
   name: z.string({message:"Enter Your Name"}),
   version: z.string({message:"Enter Your Version"}),
   seoTags: z.string({message:"Enter Your Tags"}),
   dollarPrice: z.number({message:"Enter Your Price"}),
 

});


export type uploadTemplate = z.infer<typeof uploadTemplate>;
// export type SignupFormOtpData = z.infer<typeof signupSchemaOtp>;

