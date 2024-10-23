// import Image from 'next/image';
// import React, { useState } from 'react';
// import { UseFormRegister } from 'react-hook-form';

// interface FileUploadProps {
//   onFileSelect: (files: File[]) => void;
//   supportedfiles: string;
//   multiple?: boolean;
//   id?: string;
//   register: UseFormRegister<any>,
//   name: string
// }

// const FilePreview = ({
//   previewUrl,
//   onRemove,
// }: {
//   previewUrl: string;
//   onRemove: () => void;
// }) => {
//   return (
//     <div className="relative border p-2 mb-2 z-50">
//       <Image src={previewUrl} width={128} height={128} alt='File Preview' className='object-cover mb-2' />
//       {/* <img src={} alt="File Preview" className="w-32 h-32 object-cover mb-2" /> */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onRemove();
//         }}
//         className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1" >
//         Remove
//       </button>
//     </div>
//   );
// };

// const FileUpload: React.FC<FileUploadProps> = ({
//   onFileSelect,
//   supportedfiles,
//   multiple = true,
//   id = "1",
//   name,
//   register
// }) => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const supportedFileTypes = supportedfiles.split(',');

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newFiles = event.target.files ? Array.from(event.target.files) : null;

//     if (newFiles && newFiles.length > 0) {
//       const validFiles: File[] = [];
//       const previewList: string[] = [];

//       for (const file of newFiles) {
//         const fileExtension = file.name.split('.').pop()?.toLowerCase();

//         if (fileExtension && supportedFileTypes.includes(fileExtension)) {
//           validFiles.push(file);
//           const preview = URL.createObjectURL(file);
//           previewList.push(preview);
//         } else {
//           setError(`Unsupported file type. Please upload one of the following: ${supportedfiles}`);
//           return;
//         }
//       }

//       // Update state based on whether multiple files are allowed
//       if (multiple) {
//         setFiles((prev) => [...prev, ...validFiles]);
//         setPreviewUrls((prev) => [...prev, ...previewList]);
//       } else {
//         setFiles(validFiles);
//         setPreviewUrls(previewList);
//       }

//       setError(null);
//       onFileSelect(multiple ? [...files, ...validFiles] : validFiles); // Update parent with files
//     }
//   };

//   const handleRemove = (index: number) => {
//     const updatedFiles = files.filter((_, i) => i !== index);
//     const updatedPreviews = previewUrls.filter((_, i) => i !== index);

//     setFiles(updatedFiles);
//     setPreviewUrls(updatedPreviews);
//     onFileSelect(updatedFiles); // Update parent with remaining files
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <h3 className='text-base text-center capitalize'>Upload Source File Here</h3>
//       <p className='py-3 text-neutral-500 text-xs'>File Supported: {supportedfiles}</p>
//       <label
//         htmlFor={`file-upload${id}`}
//         className="bg-primary-100 text-white capitalize font-semibold leading-6 transition-all duration-300 hover:bg-[#872fcb] py-2 px-[30px] cursor-pointer mb-3"
//       >
//         Choose file{multiple ? 's' : ''}
//       </label>

//       <input
//         {...register(name)}
//         name={name}
//         id={`file-upload${id}`}
//         type="file"
//         multiple={multiple}
//         onChange={handleFileChange}
//         className="hidden"
//       />

//       {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

//       {previewUrls.length > 0 && (
//         <div className="grid grid-cols-3 gap-2 mt-3">
//           {previewUrls.map((url, index) => (
//             <FilePreview
//               key={url}
//               previewUrl={url}
//               onRemove={() => handleRemove(index)} // Call handleRemove with index
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;




import Image from 'next/image';
import React, { useState } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  supportedfiles: string;
  multiple?: boolean;
  id?: string;
  register: UseFormRegister<any>;
  name: string;
  error?: FieldError;
}

const FilePreview = ({
  previewUrl,
  onRemove,
}: {
  previewUrl: string;
  onRemove: () => void;
}) => {
  return (
    <div className="relative border p-2 mb-2 z-50">
      <Image src={previewUrl} width={128} height={128} alt="File Preview" className="object-cover mb-2" />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1"
      >
        Remove
      </button>
    </div>
  );
};

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  supportedfiles,
  multiple = true,
  id = "1",
  name,
  register,
  error,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  const supportedFileTypes = supportedfiles.split(',');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : null;

    if (newFiles && newFiles.length > 0) {
      const validFiles: File[] = [];
      const previewList: string[] = [];

      for (const file of newFiles) {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (fileExtension && supportedFileTypes.includes(fileExtension)) {
          validFiles.push(file);
          const preview = URL.createObjectURL(file);
          previewList.push(preview);
        } else {
          setFileError(`Unsupported file type. Please upload one of the following: ${supportedfiles}`);
          return;
        }
      }

      if (multiple) {
        setFiles((prev) => [...prev, ...validFiles]);
        setPreviewUrls((prev) => [...prev, ...previewList]);
      } else {
        setFiles(validFiles);
        setPreviewUrls(previewList);
      }

      setFileError(null);
      onFileSelect(multiple ? [...files, ...validFiles] : validFiles);
    }
  };

  const handleRemove = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
    onFileSelect(updatedFiles);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-base text-center capitalize">Upload Source File Here</h3>
      <p className="py-3 text-neutral-500 text-xs">File Supported: {supportedfiles}</p>
      <label
        htmlFor={`file-upload${id}`}
        className="bg-primary-100 text-white capitalize font-semibold leading-6 transition-all duration-300 hover:bg-[#872fcb] py-2 px-[30px] cursor-pointer mb-3"
      >
        Choose file{multiple ? 's' : ''}
      </label>

      <input
        {...register(name, { required: true })}
        name={name}
        id={`file-upload${id}`}
        type="file"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {(fileError || error) && (
        <p className="text-red-500 text-xs mt-2">
          {fileError || error?.message || 'File is required'}
        </p>
      )}

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {previewUrls.map((url, index) => (
            <FilePreview
              key={url}
              previewUrl={url}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
