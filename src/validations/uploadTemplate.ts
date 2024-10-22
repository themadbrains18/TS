// // validationSchema.ts
// import { z } from 'zod';

// export const uploadTemplate = z.object({
//    name: z.string({message:"Enter Your Name"}),
//    templateType: z.string({message:"Select Template Type"}),
//    subCategory: z.string({message:"Select Category"}),
//    softwareType: z.string({message:"Select Software Type"}),
//    industry: z.array(z.string()).nonempty({ message: "Select at least one Industry Type" }), // Multiple selection allowed
//    version: z.string({message:"Enter Your Version"}),
//    seoTags: z.string({message:"Enter Your Tags"}),
//    dollarPrice: z.number({message:"Enter Your Price"}),
// });

// const validateCredits = (items: any[], itemName: string) => {
//    if (items.length === 0) {
//      return z.custom(() => false, { message: `${itemName} must have at least one entry` });
//    }
//    return z.array(z.object({
//      name: z.string().min(1, `${itemName} name is required`),
//      url: z.string().url(`${itemName} URL must be a valid URL`),
//    }));
//  };
 
//  // Example of how to integrate credits validation
//  const creditsSchema = z.object({
//    fonts: validateCredits([], "Font"),
//    images: validateCredits([], "Image"),
//    icons: validateCredits([], "Icon"),
//    illustrations: validateCredits([], "Illustration"),
//  });


// // Merge the two schemas
// export const fullUploadTemplateSchema = uploadTemplate.merge(creditsSchema);

// // Export the inferred type for the combined schema
// export type FullUploadTemplateSchemaType = z.infer<typeof fullUploadTemplateSchema>;



// validationSchema.ts
import { z } from 'zod';

export const uploadTemplate = z.object({
  name: z.string({ message: "Enter Your Name" }),
  templateType: z.string({ message: "Select Template Type" }),
  templateSubCategory: z.string({ message: "Select Category" }),
  softwareType: z.string({ message: "Select Software Type" }),
  industry: z.array(z.string()).nonempty({ message: "Select at least one Industry Type" }), // Multiple selection allowed
  version: z.string({ message: "Enter Your Version" }),
  seoTags: z.string({ message: "Enter Your Tags" }),
  dollarPrice: z.number().optional().refine(val => val !== undefined || val === 0, { message: "Enter Your Price" }),
  zipfile:z
  .instanceof(File,{message:'please select your file'})
  .refine((file) => {
    const maxSize = file.type === 'application/zip' || file.type === 'application/x-zip-compressed' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    return file.size <= maxSize;
  }, {
    message: 'File size must be less than 10 MB for ZIP files and less than 5 MB for images.',
  }),
  sliderimg:z
  .instanceof(File)
  .refine((file) => {
    const validTypes = [ 'image/jpeg', 'image/png'];
    return validTypes.includes(file.type);
  }, {
    message: 'Invalid file type. Only ZIP, JPG, and PNG files are allowed.',
  }),
  previewimg:z
  .instanceof(File)
  .refine((file) => {
    const validTypes = [ 'image/jpeg', 'image/png'];
    return validTypes.includes(file.type);
  }, {
    message: 'Invalid file type. Only ZIP, JPG, and PNG files are allowed.',
  }),
  mobileimg:z
  .instanceof(File)
  .refine((file) => {
    const validTypes = [ 'image/jpeg', 'image/png'];
    return validTypes.includes(file.type);
  }, {
    message: 'Invalid file type. Only ZIP, JPG, and PNG files are allowed.',
  }),
  
});

const validateCredits = (items: any[], itemName: string) => {
  if (items.length === 0) {
    return z.custom(() => false, { message: `${itemName} must have at least one entry` });
  }
  return z.array(
    z.object({
      name: z.string().min(1, `${itemName} name is required`),
      url: z.string().url(`${itemName} URL must be a valid URL`),
    })
  );
};

// Credits schema for fonts, images, etc.
const creditsSchema = z.object({
  fonts: validateCredits([], "Font"),
  images: validateCredits([], "Image"),
  icons: validateCredits([], "Icon"),
  illustrations: validateCredits([], "Illustration"),
});

// Merging the schemas
export const fullUploadTemplateSchema = uploadTemplate.merge(creditsSchema);

// Exporting the type for full schema validation
export type FullUploadTemplateSchemaType = z.infer<typeof fullUploadTemplateSchema>;
