import Image from 'next/image';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  supportedfiles: string;
  multiple?: boolean;
  id?: string;
}

const FilePreview = ({
  previewUrl,
  onRemove,
  provided,
  innerRef,
}: {
  previewUrl: string;
  onRemove: () => void;
  provided: any;
  innerRef: (element: HTMLElement | null) => any;
}) => {
  return (
    <div
      className="relative border p-2 mb-2 z-50"
      ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
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

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  supportedfiles,
  multiple = true,
  id = '1',
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

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
          setError(`Unsupported file type. Please upload one of the following: ${supportedfiles}`);
          return;
        }
      }

      // Update state based on whether multiple files are allowed
      if (multiple) {
        setFiles((prev) => [...prev, ...validFiles]);
        setPreviewUrls((prev) => [...prev, ...previewList]);
      } else {
        setFiles(validFiles);
        setPreviewUrls(previewList);
      }

      setError(null);
      onFileSelect(multiple ? [...files, ...validFiles] : validFiles); // Update parent with files
    }
  };

  const handleRemove = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
    onFileSelect(updatedFiles); // Update parent with remaining files
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const newFiles = Array.from(files);
    const [movedFile] = newFiles.splice(result.source.index, 1);
    newFiles.splice(result.destination.index, 0, movedFile);

    const newPreviews = Array.from(previewUrls);
    const [movedPreview] = newPreviews.splice(result.source.index, 1);
    newPreviews.splice(result.destination.index, 0, movedPreview);

    setFiles(newFiles);
    setPreviewUrls(newPreviews);
    onFileSelect(newFiles); // Update parent with reordered files
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-base text-center capitalize">Upload Source File Here</h3>
      <p className="py-3 text-neutral-500 text-xs">
        File Supported: {supportedfiles}
      </p>
      <label
        htmlFor={`file-upload${id}`}
        className="bg-primary-100 text-white capitalize font-semibold leading-6 transition-all duration-300 hover:bg-[#872fcb] py-2 px-[30px] cursor-pointer mb-3"
      >
        Choose file{multiple ? 's' : ''}
      </label>

      <input
        id={`file-upload${id}`}
        type="file"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="files-droppable" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-3 gap-2 mt-3"
            >
              {previewUrls.length > 0 &&
                previewUrls.map((url, index) => (
                  <Draggable key={url} draggableId={url} index={index}>
                    {(provided) => (
                      <FilePreview
                        previewUrl={url}
                        onRemove={() => handleRemove(index)}
                        provided={provided}
                        innerRef={provided.innerRef} // Pass innerRef to FilePreview
                      />
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FileUpload;
