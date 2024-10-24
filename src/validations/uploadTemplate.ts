
// validationSchema.ts
const MAX_FILE_COUNT = 15
const MAX_FILE_SIZE = 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
];

const ACCEPTED_ZIP_TYPES = [
  'application/zip',
  'application/x-zip-compressed',
  'multipart/x-zip',
];
import { z } from 'zod';

export const uploadTemplate = z.object({
  name: z.string().min(1, { message: "Enter template name" }),
  templateType: z.string().max(200, { message: "Enter templateType" }),
  templateSubCategory: z.string().max(200, { message: "Select Category" }),
  softwareType: z.string().min(1, { message: "Select Software Type" }),
  industry: z.array(z.string()).nonempty({ message: "Select at least one Industry Type" }), // Multiple selection allowed
  version: z.string().min(1, { message: "Enter Your Version" }),
  description: z.string().min(10, { message: "Enter description" }),
  techDetails: z
    .array(z.string().min(1, "Detail cannot be empty"))
    .min(4, "At least 4 technical details are required"),

  seoTags: z.string().min(2, { message: "Enter Your Tags" }),
  isPaid: z.boolean().optional().default(false),
  dollarPrice: z.number().optional(),  


  // File validation for ZIP file
  sourceFiles: z
  .array(z.custom<File>()) 
  .refine(
    (files) => (files.length >=1 && files.length <= 2),
    `1 file is allowed.`,
  )
  .refine(
    (files) => {
      return files.every((file) => {  
        // Check that each item is within the acceptable
        return file.size <= MAX_FILE_SIZE
      })
    },
    `File size should be less than 2mb.`,
  )
    .refine((files)=> files.every((file) => ACCEPTED_ZIP_TYPES.includes(file.type)), {
      message: 'Only zip files are allowed.',
    }),

  // File validation for slider image
  sliderImages: z
    .array(z.custom<File>())
    .refine(
      (files) => (files.length >= 3 && files.length <= MAX_FILE_COUNT),
      `Minimum 3 files and maximum ${MAX_FILE_COUNT} files allowed.`,
    )
    .refine(
      (files) => {
        return files.every((file) => file instanceof File);
      },
      {
        message: 'Expected a file',
      },
    )
    .refine(
      (files) => {
        return files.every((file) => {
          // Check that each item is within the acceptable
          return file.size <= MAX_FILE_SIZE
        })
      },
      `File size should be less than 2mb.`,
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only these types are allowed .jpg, .jpeg, .png and .webp',
    ),

  previewMobileImages: z
    .array(z.custom<File>())
    .refine(
      (files) => (files.length >= 1 && files.length <= MAX_FILE_COUNT),
      `Minimum 1 file and maximum ${MAX_FILE_COUNT} files allowed.`,
    )
    .refine(
      (files) => {
        return files.every((file) => file instanceof File);
      },
      {
        message: 'Expected a file',
      },
    )
    .refine(
      (files) => {
        return files.every((file) => {
          // Check that each item is within the acceptable
          return file.size <= MAX_FILE_SIZE
        })
      },
      `File size should be less than 2mb.`,
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only these types are allowed .jpg, .jpeg, .png and .webp',
    ),

  previewImages: z
    .array(z.custom<File>())
    .refine(
      (files) => (files.length >= 1 && files.length <= MAX_FILE_COUNT),
      `Minimum 1 file and maximum ${MAX_FILE_COUNT} files allowed.`,
    )
    .refine(
      (files) => {
        // Check if all items in the array are instances of the File object
        return files.every((file) => file instanceof File);
      },
      {
        // If the refinement fails, throw an error with this message
        message: 'Expected a file',
      },
    )
    .refine(
      (files) => {
        return files.every((file) => {
          // Check that each item is within the acceptable
          return file.size <= MAX_FILE_SIZE
        })
      },
      `File size should be less than 2mb.`,
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only these types are allowed .jpg, .jpeg, .png and .webp',
    ),

}).superRefine((data, ctx) => {
  console.log(data.dollarPrice,"==dollar price");
  
  if (data.isPaid && (data.dollarPrice === undefined || data.dollarPrice === null)) {
    ctx.addIssue({
      path: ['dollarPrice'], // Point to the `dollarPrice` field
      message: "Enter Your Price if it's paid",
      code: z.ZodIssueCode.custom,
    });
  }
});;

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

