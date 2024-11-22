import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FileUploadProps {
  type?: string;
  // onFileSelect: (files: File[] |{ imageUrl: string; id: string; templateId: string }[]) => void;
  onFileSelect: any;
  supportedfiles: string;
  multiple?: boolean;
  id?: string;
  register: UseFormRegister<any>;
  name: string;
  error?: FieldError;
  initialUrls?: { imageUrl: string; id: string; templateId: string }[]; // Initial images as URLs
  fileNameUrl?: string[]; // Initial filenames
  title?: string
  deleteimages?: any
  setDeleteAll?: any
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
        type='button'
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
      <p className="text-center">{fileName}</p>
      <button
        type='button'
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

const extractFileName = (url: string) => {
  const decodedURL = decodeURIComponent(url);
  return decodedURL.split('/').pop()?.split('?')[0] || '';
};

const FileUpload: React.FC<FileUploadProps> = ({
  type,
  onFileSelect,
  supportedfiles,
  multiple = true,
  id = '1',
  name,
  register,
  error,
  initialUrls = [],
  fileNameUrl = [],
  title,
  deleteimages,
  setDeleteAll
}) => {

  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<{ imageUrl: string; id: string }[]>(
    initialUrls
  );
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileNames, setFileNames] = useState<string[]>(
    fileNameUrl?.map((url) => extractFileName(url))
  );

  const supportedFileTypes = supportedfiles.split(',');

  const MAX_SIZE_MB = 10; // Max total size in MB
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // Convert to bytes

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];

    if (newFiles.length > 0) {
      const validFiles: File[] = [];
      const newPreviewUrls: { imageUrl: string; id: string }[] = [];
      const newFileNames: string[] = [];
      let totalSize = files.reduce((sum, file) => sum + file.size, 0); // Sum size of existing files

      // Calculate the total size of new files
      for (const file of newFiles) {
        totalSize += file.size;
      }

      if (totalSize > MAX_SIZE_BYTES) {
        setFileError(`The total file size exceeds the 10 MB limit. Please select smaller files.`);
        return; // Do not proceed if total size exceeds 10 MB
      }

      // Process valid files
      for (const file of newFiles) {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension && supportedFileTypes.includes(fileExtension)) {
          validFiles.push(file);
          if (fileExtension === 'zip') {
            newFileNames.push(file.name);
          } else {
            const preview = URL.createObjectURL(file);
            newPreviewUrls.push({ imageUrl: preview, id: '' });
          }
        } else {
          setFileError(`Unsupported file type. Supported types: ${supportedfiles}`);
          return;
        }
      }

      if (multiple) {
        setFiles((prev) => [...prev, ...validFiles]);
        setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
        setFileNames((prev) => [...prev, ...newFileNames]);
      } else {
        setFiles(validFiles);
        setPreviewUrls(newPreviewUrls);
        setFileNames(newFileNames);
      }

      console.log(previewUrls, "===previewUrls");

      setFileError(null);
      onFileSelect(multiple ? [...previewUrls, ...validFiles] : validFiles);
    }
  };


  // console.log(previewUrls,"==preview urls");

  const handleRemove = (index: number, id?: string, name?: string) => {
    // console.log(index,"=index",previewUrls);

    console.log(files, "==files");


    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    const updatedFileNames = fileNames.filter((_, i) => i !== index);
    // console.log(updatedFiles,"==updatedFiles");

    setFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
    setFileNames(updatedFileNames);
    onFileSelect(updatedFiles);


    if (type === 'edit' && id && name) {
      let obj = {
        imgId: id,
        imgName: name
      }

      deleteimages(obj)
      // deleteSliderImage(id, name);
    }
  };

  const handleRemoveAll = (name: string) => {
    setPreviewUrls([])
    setDeleteAll(name)
  }



  return (
    <div className="flex flex-col items-center relative">
      <h3 className="text-base text-center capitalize">{title}</h3>
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
        <p className="text-red-500 text-xs mt-2">{fileError || error?.message || 'File is required'}</p>
      )}

      {previewUrls.length > 0 && (
        <>
          <p className='text-red-500 absolute top-[70px] right-0 cursor-pointer' onClick={() => { handleRemoveAll(name) }}>Remove All</p>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {previewUrls?.map((item, index) => (
              <FilePreview
                key={item?.id || index}
                previewUrl={item.imageUrl}
                onRemove={() => { handleRemove(index, item.id, name) }}
              />
            ))}
          </div>
        </>
      )}

      {fileNames.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {fileNames?.map((fileName, index) => (
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
