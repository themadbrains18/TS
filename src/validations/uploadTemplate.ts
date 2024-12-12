import { z } from 'zod';

/**
 * Constants
 */
const MAX_FILE_COUNT = 15; // Maximum number of files allowed
const MAX_FILE_SIZE = 10 * 1024 * 1024; // Maximum file size (1MB)
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]; // Allowed image MIME types
const ACCEPTED_ZIP_TYPES = ['application/zip', 'application/x-zip-compressed', 'multipart/x-zip']; // Allowed ZIP MIME types

/**
 * Schema to allow File, string (URL), or an object with a 'fileUrl'
 */
const fileObjectSchema = z.union([
  z.instanceof(File),
  z.string().url(),
  z.object({ fileUrl: z.string().url(), id: z.string().optional(), templateId: z.string().optional() })
]);

/**
 *  Schema to allow File, string (URL), or an object with an 'imageUrl'
 */
const imageObjectSchema = z.union([
  z.instanceof(File),
  z.string().url(),
  z.object({ imageUrl: z.string().url(), id: z.string().optional(), templateId: z.string().optional() })
]);

/**
 *  Adjusted file validation schema to allow custom object types and file size check
 */
const fileValidationSchema = (
  min: number,
  max: number,
  acceptedSchema: z.ZodTypeAny,
  fileTypeMessage: string,
  maxTotalSize?: number
) =>
  z.preprocess(
    (input) => (Array.isArray(input) ? input : []), // Fallback to empty array if not an array
    z.array(acceptedSchema)
      .refine(files => files.length >= min && files.length <= max, `Minimum ${min} files required ${max < 10 ? `and Maximum ${max} files allowed` : "."}`)
      .refine(files => files.every(file => fileUrlOrImageUrl(file) ? true : isValidFileType(file)), fileTypeMessage)
      .refine(files => {
        if (maxTotalSize) {
          const totalSize = files.reduce((acc, file) => {

            if (file instanceof File) {
              return acc + file.size;
            }
            return acc; // Non-File types don't contribute to total size
          }, 0);
          return totalSize <= maxTotalSize;
        }
        return true;
      }, `Total size of all files must not exceed ${maxTotalSize! / (1024 * 1024)} MB.`)
  );


/**
 * Helper function to check if file has fileUrl or imageUrl
 */
const fileUrlOrImageUrl = (file: any): file is { fileUrl: string } | { imageUrl: string } => {
  return 'fileUrl' in file || 'imageUrl' in file;
};

/**
 * Checks if the file type matches the accepted types
 */
const isValidFileType = (file: any) => {
  if (file.fileUrl) return ACCEPTED_ZIP_TYPES.includes(file.type);
  if (file.imageUrl) return ACCEPTED_IMAGE_TYPES.includes(file.type);
  return true;
};

/**
 * Helper function to check if the file size is valid
 */
const isFileSizeValid = (file: any) => {
  if (file instanceof File) {
    return file.size <= MAX_FILE_SIZE;
  }
  return true;
};


/**
 * Base template schema (fields shared by both create and update)
 */


const uploadTemplateBase = z.object({
  title: z.string().min(1, { message: "Enter template name" }).max(100),
  titleinfo: z.string().optional().nullable(),
  templateTypeId: z.string().max(200, { message: "Select Template Type" }),
  subCategory: z.string().nullable().optional(),
  subCategoryId: z.string().max(200, { message: "Select Category" }),
  softwareTypeId: z.string().min(1, { message: "Select Software Type" }),
  industry: z.string().min(1, { message: "Select at least one Industry Type" }),
  industryName: z.any().optional().nullable(),
  version: z.string().min(1, { message: "Enter Your Version" }),
  description: z.string().min(50, { message: "Enter description min 50 character" }),
  techDetails: z.array(z.string().min(1, "Detail cannot be empty")).min(4, "At least 4 technical details are required"),
  seoTags: z
    .array(z.string().min(2, { message: "Tags must be at least 2 characters long." }))
    .min(2, "You must include at least 2 tags.")
    .max(5, { message: "Only 5 tags are allowed." }),
  isPaid: z.boolean().optional().default(false),
  price: z.string().optional(),
  metatitle: z
    .string()
    .min(5, "Meta title must be at least 5 characters long.")
    .max(70, "Meta title must be no more than 70 characters."),
  metadescription: z
    .string()
    .min(10, "Meta description must be at least 10 characters long.")
    .max(250, "Meta description must be no more than 250 characters."),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens.")
    .min(3, "Slug must be at least 3 characters long.")
    .max(70, "Slug must be no more than 70 characters."),

});



/**
 * Schema for creating a template
 */
export const uploadTemplateSchema = uploadTemplateBase.extend({
  // Validates the uploaded files
  sourceFiles: z.string().nonempty("Source files are required"),

  sliderImages: fileValidationSchema(3, 5, imageObjectSchema, 'Only .jpg, .jpeg, .png, and .webp are allowed.'),

  previewMobileImages: fileValidationSchema(
    1, // Minimum 1 image
    100,
    imageObjectSchema,
    'Only .jpg, .jpeg, .png, and .webp are allowed.',
    10 * 1024 * 1024 // Maximum total size of 10 MB
  ),
  previewImages: fileValidationSchema(
    0, // Minimum 0 images
    100,
    imageObjectSchema,
    'Only .jpg, .jpeg, .png, and .webp are allowed.',
    10 * 1024 * 1024 // Maximum total size of 10 MB
  ).or(z.null()).or(z.array(z.undefined())),

}).refine((data) => {
  return !data.isPaid || !!data.price;
}, {
  message: "Dollar price is required if it's paid.",
  path: ["price"],
})
  .superRefine((data, ctx) => {

    const { subCategory } = data; // Correctly access parent data via ctx.data

    // If subCategory includes 'mobile', we allow previewImages to be undefined
    if (subCategory?.includes('Mobile')) {
      return; // No validation needed if subCategory is 'mobile'
    }
    if (data?.previewImages && data?.previewImages.length <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least 1 preview image is required.",
        path: ['previewImages'],
      });
    }
  })

/**
 * Schema for updating a template
 */

export const uploadTemplateUpdateSchema = uploadTemplateBase.extend({
  sourceFiles: z.string().optional(),
  sliderImages: fileValidationSchema(3, 5, imageObjectSchema, 'Only .jpg, .jpeg, .png, and .webp are allowed.'),
  previewMobileImages: fileValidationSchema(
    1, // Minimum 1 image
    100,
    imageObjectSchema,
    'Only .jpg, .jpeg, .png, and .webp are allowed.',
    10 * 1024 * 1024 // Maximum total size of 10 MB
  ),
  previewImages: fileValidationSchema(
    0, // Minimum 0 images
    100,
    imageObjectSchema,
    'Only .jpg, .jpeg, .png, and .webp are allowed.',
    10 * 1024 * 1024 // Maximum total size of 10 MB
  ).or(z.null()).or(z.array(z.undefined())),
  // .or(z.null())
  // .or(z.array(z.undefined())),
  price: z.union([z.string(), z.number()]).optional(),
}).superRefine((data, ctx) => {

  const { subCategory, subCategoryId } = data; // Correctly access parent data via ctx.data
  // If subCategory includes 'mobile', we allow previewImages to be undefined
  if (subCategory?.includes('Mobile')) {
    return; // No validation needed if subCategory is 'mobile'
  }
  if (subCategoryId !== "cm48et4wn0004qnnxptj5ioaz" && data?.previewImages && data?.previewImages.length <= 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least 1 preview image is required.",
      path: ['previewImages'],
    });
  }
})

/**
 * Schema for creating a template
 */


// export const uploadTemplateSchema = uploadTemplateBase.extend({
//   // Validates the uploaded files
//   sourceFiles: fileValidationSchema(1, 1, fileObjectSchema, 'Only zip files are allowed.'),
//   sliderImages: fileValidationSchema(3, MAX_FILE_COUNT, imageObjectSchema, 'Only .jpg, .jpeg, .png, and .webp are allowed.'),
//   previewMobileImages: fileValidationSchema(1, MAX_FILE_COUNT, imageObjectSchema, 'Only .jpg, .jpeg, .png, and .webp are allowed.'),
//   previewImages: fileValidationSchema(1, MAX_FILE_COUNT, imageObjectSchema, 'Only .jpg, .jpeg, .png, and .webp are allowed.'),
// }).refine((data) => {
//   return !data.isPaid || !!data.price;
// }, {
//   message: "Dollar price is required if it's paid.",
//   path: ["price"],
// })