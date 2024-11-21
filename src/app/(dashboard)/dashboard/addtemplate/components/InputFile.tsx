import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FileUploadProps {
  type?: string;
  onFileSelect: (files: File[]) => void;
  supportedfiles: string;
  multiple?: boolean;
  id?: string;
  register: UseFormRegister<any>;
  name: string;
  error?: FieldError;
  initialUrls?: { url: string; id: string }[]; // Initial images as URLs
  fileNameUrl?: string[]; // Initial filenames
title?: string
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
  title
}) => {
  const {data:session} = useSession()
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<{ url: string; id: string }[]>(
    initialUrls
  );
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileNames, setFileNames] = useState<string[]>(
    fileNameUrl?.map((url) => extractFileName(url))
  );

  const supportedFileTypes = supportedfiles.split(',');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];

    if (newFiles.length > 0) {
      const validFiles: File[] = [];
      const newPreviewUrls: { url: string; id: string }[] = [];
      const newFileNames: string[] = [];

      for (const file of newFiles) {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension && supportedFileTypes.includes(fileExtension)) {
          validFiles.push(file);
          if (fileExtension === 'zip') {
            newFileNames.push(file.name);
          } else {
            const preview = URL.createObjectURL(file);
            newPreviewUrls.push({ url: preview, id: '' });
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

      setFileError(null);
      onFileSelect(multiple ? [...files, ...validFiles] : validFiles);
    }
  };

  const handleRemove = (index: number, id?: string,name?:string) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    const updatedFileNames = fileNames.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
    setFileNames(updatedFileNames);
    onFileSelect(updatedFiles);

    console.log("hereere", type,id,name);
    
    if (type === 'edit' && id && name) {
      deleteSliderImage(id, name);
    }
  };

  const deleteSliderImage = async (id: string,name:string) => {
    try {
      console.log(name,"==name");
      
      const response = await fetch(`${process?.env?.NEXT_PUBLIC_APIURL}/${name}/${id}`, {
        method: 'DELETE',
        headers:{
        'Authorization': `Bearer ${session?.token}`,
        }
      });
      if (response.ok) {
        console.log('Image deleted successfully');
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
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
        <div className="grid grid-cols-3 gap-2 mt-3">
          {previewUrls?.map((item, index) => (
            <FilePreview
              key={item?.id || index}
              previewUrl={item.url}
              onRemove={() => handleRemove(index, item.id,name)}
            />
          ))}
        </div>
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
