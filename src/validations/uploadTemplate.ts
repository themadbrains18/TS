// // // validationSchema.ts
// // import { z } from 'zod';

// // export const uploadTemplate = z.object({
// //    name: z.string({message:"Enter Your Name"}),
// //    templateType: z.string({message:"Select Template Type"}),
// //    subCategory: z.string({message:"Select Category"}),
// //    softwareType: z.string({message:"Select Software Type"}),
// //    industry: z.array(z.string()).nonempty({ message: "Select at least one Industry Type" }), // Multiple selection allowed
// //    version: z.string({message:"Enter Your Version"}),
// //    seoTags: z.string({message:"Enter Your Tags"}),
// //    dollarPrice: z.number({message:"Enter Your Price"}),
// // });

// // const validateCredits = (items: any[], itemName: string) => {
// //    if (items.length === 0) {
// //      return z.custom(() => false, { message: `${itemName} must have at least one entry` });
// //    }
// //    return z.array(z.object({
// //      name: z.string().min(1, `${itemName} name is required`),
// //      url: z.string().url(`${itemName} URL must be a valid URL`),
// //    }));
// //  };

// //  // Example of how to integrate credits validation
// //  const creditsSchema = z.object({
// //    fonts: validateCredits([], "Font"),
// //    images: validateCredits([], "Image"),
// //    icons: validateCredits([], "Icon"),
// //    illustrations: validateCredits([], "Illustration"),
// //  });


// // // Merge the two schemas
// // export const fullUploadTemplateSchema = uploadTemplate.merge(creditsSchema);

// // // Export the inferred type for the combined schema
// // export type FullUploadTemplateSchemaType = z.infer<typeof fullUploadTemplateSchema>;



// // validationSchema.ts

const MAX_FILE_SIZE = 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
];
import { z } from 'zod';

export const uploadTemplate = z.object({
  name: z.string().min(1, { message: "Enter template name" }),
  templateType: z.string().max(200, { message: "Enter templateType" }),
  templateSubCategory: z.string().max(200, { message: "Select Category" }),
  softwareType: z.string().min(1, { message: "Select Software Type" }),
  // industry: z.array(z.string()).nonempty({ message: "Select at least one Industry Type" }), // Multiple selection allowed
  // version: z.string().min(1, { message: "Enter Your Version" }),
  seoTags: z.string().min(2, { message: "Enter Your Tags" }),
  // dollarPrice: z.number().optional().refine(val => val !== undefined || val === 0, { message: "Enter Your Price" }),

  // File validation for ZIP file
  // zipfile: z
  //   .instanceof(File, { message: 'Please select your ZIP file' })
  //   .refine((file) => {
  //     const maxSize = 10 * 1024 * 1024; // 10 MB for ZIP files
  //     return file.size <= maxSize;
  //   }, {
  //     message: 'ZIP file size must be less than 10 MB.',
  //   }),

  // File validation for slider image
  // sliderimg: z
  //   .instanceof(File)
  //   .refine((file) => {
  //     const validTypes = ['image/jpeg', 'image/png'];
  //     return validTypes.includes(file.type);
  //   }, {
  //     message: 'Invalid file type. Only JPG and PNG files are allowed for images.',
  //   }),

  // File validation for preview image
  // previewimg: z
  //   .instanceof(File)
  //   .refine((file) => {
  //     const validTypes = ['image/jpeg', 'image/png'];
  //     return validTypes.includes(file.type);
  //   }, {
  //     message: 'Invalid file type. Only JPG and PNG files are allowed for images.',
  //   }),

  // File validation for mobile image
  // mobileimg: z.custom<File>()
  //   .refine((file) => file?.size <= MAX_FILE_SIZE, {
  //     message: 'File size should be less than 1mb.',
  //   })
  //   .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
  //     message: 'Only these types are allowed .jpg, .jpeg, .png and .webp',
  //   }),
});

// // Helper function to validate credits (dynamically checks the array length)
// const validateCredits = (itemName: string) => {
//   return z.array(
//     z.object({
//       name: z.string().min(1, `${itemName} name is required`),
//       url: z.string().url(`${itemName} URL must be a valid URL`),
//     })
//   ).nonempty({ message: `${itemName} must have at least one entry` });
// };

// // Credits schema for fonts, images, icons, etc.
// const creditsSchema = z.object({
//   fonts: validateCredits("Font"),
//   images: validateCredits("Image"),
//   icons: validateCredits("Icon"),
//   illustrations: validateCredits("Illustration"),
// });

// // Merging the schemas
// export const fullUploadTemplateSchema = uploadTemplate.merge(creditsSchema);

// // Exporting the type for full schema validation
// export type FullUploadTemplateSchemaType = z.infer<typeof fullUploadTemplateSchema>;

