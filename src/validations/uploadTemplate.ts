import { z } from 'zod';

// Constants
const MAX_FILE_COUNT = 15;
const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_ZIP_TYPES = ['application/zip', 'application/x-zip-compressed', 'multipart/x-zip'];

// Type guards and helper functions
// const isFile = (file: unknown): file is File => file instanceof File;
// const isImageObject = (file: unknown): file is { imageUrl: string } =>
//   typeof file === 'object' && file !== null && 'imageUrl' in file;

// const validateFileSize = (files: (string | File | { imageUrl: string })[]) =>
//   files.every((file) => isFile(file) ? file.size <= MAX_FILE_SIZE : true);

// const validateFileType = (files: (string | File | { imageUrl: string })[], acceptedTypes: string[]) =>
//   files.every((file) => isFile(file) ? acceptedTypes.includes(file.type) : true);

// Schema to allow File, string (URL), or an object with an imageUrl
const fileObjectSchema  = z.union([
  z.instanceof(File),
  z.string().url(),
  z.object({ fileUrl: z.string().url(), id: z.string().optional(), templateId: z.string().optional() })
]);
// Schema to allow File, string (URL), or an object with an imageUrl
const imageObjectSchema  = z.union([
  z.instanceof(File),
  z.string().url(),
  z.object({ imageUrl: z.string().url(), id: z.string().optional(), templateId: z.string().optional() })
]);

// Adjusted file validation schema to allow custom object types
const fileValidationSchema = (min: number, max: number, acceptedSchema: z.ZodTypeAny, fileTypeMessage: string) =>
  z.array(acceptedSchema)
    .refine((files) => files.length >= min && files.length <= max, `Minimum ${min} and maximum ${max} files allowed.`)
    .refine((files) => files.every((file) => fileUrlOrImageUrl(file) ? true : isValidFileType(file)), fileTypeMessage);

// Helper function to validate if file has fileUrl or imageUrl
const fileUrlOrImageUrl = (file: any): file is { fileUrl: string } | { imageUrl: string } => {
  return 'fileUrl' in file || 'imageUrl' in file;
};

// Checks if the file type matches the accepted types
const isValidFileType = (file: any) => {
  if (file.fileUrl) return ACCEPTED_ZIP_TYPES.includes(file.type);
  if (file.imageUrl) return ACCEPTED_IMAGE_TYPES.includes(file.type);
  return true;
};

// Base template schema
const uploadTemplateBase = z.object({
  title: z.string().min(1, { message: "Enter template name" }),
  templateTypeId: z.string().max(200, { message: "Enter templateType" }),
  subCategoryId: z.string().max(200, { message: "Select Category" }),
  softwareTypeId: z.string().min(1, { message: "Select Software Type" }),
  industry: z.string().min(1, { message: "Select at least one Industry Type" }),
  version: z.string().min(1, { message: "Enter Your Version" }),
  description: z.string().min(10, { message: "Enter description" }),
  techDetails: z.array(z.string().min(1, "Detail cannot be empty")).min(4, "At least 4 technical details are required"),
  seoTags: z.string().min(2, { message: "Enter Your Tags" }),
  isPaid: z.boolean().optional().default(false),
  price: z.string().optional(),});

// Schema for creating a template
export const uploadTemplateSchema = uploadTemplateBase.extend({
  sourceFiles: fileValidationSchema(1, 2, fileObjectSchema, 'Only zip files are allowed.'),
  sliderImages: fileValidationSchema(3, MAX_FILE_COUNT, imageObjectSchema, 'Only .jpg, .jpeg, .png, and .webp are allowed.'),
  previewMobileImages: fileValidationSchema(1, MAX_FILE_COUNT, imageObjectSchema, 'Only .jpg, .jpeg, .png, and .webp are allowed.'),
  previewImages: fileValidationSchema(1, MAX_FILE_COUNT, imageObjectSchema, 'Only .jpg, .jpeg, .png, and .webp are allowed.'),
}).refine((data) => {
  return !data.isPaid || !!data.price;
}, {
  message: "Dollar price is required if it's paid.",
  path: ["price"],
});

// Schema for updating a template
export const uploadTemplateUpdateSchema = uploadTemplateBase.extend({
  sourceFiles: fileValidationSchema(1, 2, fileObjectSchema, 'Only zip files are allowed.').nullable(),
  sliderImages: fileValidationSchema(3, MAX_FILE_COUNT, imageObjectSchema, 'Only .jpg, .jpeg, .png, and .webp are allowed.')
    .or(z.null())
    .or(z.array(z.undefined())),
  previewMobileImages: fileValidationSchema(1, MAX_FILE_COUNT, imageObjectSchema, 'Only .jpg, .jpeg, .png, and .webp are allowed.')
    .or(z.null())
    .or(z.array(z.undefined())),
  previewImages: fileValidationSchema(1, MAX_FILE_COUNT, imageObjectSchema, 'Only .jpg, .jpeg, .png, and .webp are allowed.')
    .or(z.null())
    .or(z.array(z.undefined())),
  price: z.coerce.number().optional(),
}).partial();
