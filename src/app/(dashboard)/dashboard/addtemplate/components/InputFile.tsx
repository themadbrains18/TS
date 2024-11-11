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
  initialUrls?: string[]; // New prop for initial images
  fileNameUrl?: string[]; // New prop for initial images
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
      <Image
        src={previewUrl}
        width={128}
        height={128}
        alt="File Preview"
        className="object-cover mb-2"
      />
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

const FileNameDisplay = ({
  fileName,
  onRemove,
}: {
  fileName: string;
  onRemove: () => void;
}) => {
  return (
    <div className="relative border p-2 mb-2 z-50 mx-auto w-full">
      <p className='text-center'>{fileName}</p>

    </div>
  );
};

const extractFileName = (url: string) => {
  const decodedURL = decodeURIComponent(url);
  return decodedURL.split('/').pop()?.split('?')[0] || '';
};

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  supportedfiles,
  multiple = true,
  id = '1',
  name,
  register,
  error,
  initialUrls = [], // default to an empty array
  fileNameUrl=[]
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(initialUrls || []);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileNames, setFileNames] = useState<string[]>(fileNameUrl.map(url => extractFileName(url)));


  const supportedFileTypes = supportedfiles.split(',');


  /*
   * Handles file input changes, including file validation, preview generation, and managing multiple file uploads.
   * 
   * This function is triggered when the user selects files through an input element and performs the following actions:
   * 
   * @param event - The change event that contains the selected files in `event.target.files`.
   * 
  */

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : null;

    if (newFiles && newFiles.length > 0) {
      const validFiles: File[] = [];
      const previewList: string[] = [];
      const fileNameList: string[] = [];

      for (const file of newFiles) {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (fileExtension && supportedFileTypes.includes(fileExtension)) {
          validFiles.push(file);

          // If the file is a zip file, store the file name only
          if (fileExtension === 'zip') {
            fileNameList.push(file.name);
          } else {
            const preview = URL.createObjectURL(file);
            previewList.push(preview);
          }
        } else {
          setFileError(
            `Unsupported file type. Please upload one of the following: ${supportedfiles}`
          );
          return;
        }
      }

      if (multiple) {
        setFiles((prev) => [...prev, ...validFiles]);
        setPreviewUrls((prev) => [...prev, ...previewList]);
        setFileNames((prev) => [...prev, ...fileNameList]);
      } else {
        setFiles(validFiles);
        setPreviewUrls(previewList);
        setFileNames(fileNameList);
      }

      setFileError(null);
      onFileSelect(multiple ? [...files, ...validFiles] : validFiles);
    }
  };



  /*
   * Handles the removal of a file from the list of selected files.
   *
   * This function is triggered when a user removes a file from the list. It performs the following actions:
   *
   * @param index - The index of the file to be removed from the lists of files, previews, and file names.
   *
   */

  const handleRemove = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    const updatedFileNames = fileNames.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
    setFileNames(updatedFileNames);
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

      {fileNames.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {fileNames.map((fileName, index) => (
            <FileNameDisplay
              key={fileName}
              fileName={fileName}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
