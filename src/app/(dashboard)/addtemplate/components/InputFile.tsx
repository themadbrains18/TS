import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  supportedfiles: string;
  multiple?: boolean;
  id?: string;
}

const SortableItem = ({
  id,
  previewUrl,
  onRemove,
}: {
  id: string;
  previewUrl: string;
  onRemove: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative border p-2 mb-2"
          onClick={() => {
          console.log(`Remove button clicked for item with id: ${id}`); // Debugging line
          onRemove();
        }}
    >
      <img src={previewUrl} alt={`Preview ${id}`} className="w-32 h-32 object-cover mb-2" />
      <button
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

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = previewUrls.indexOf(active.id);
      const newIndex = previewUrls.indexOf(over.id);

      const newPreviewUrls = arrayMove(previewUrls, oldIndex, newIndex);
      const newFiles = arrayMove(files, oldIndex, newIndex);

      setPreviewUrls(newPreviewUrls);
      setFiles(newFiles);
      onFileSelect(newFiles); // Update parent with new order
    }
  };

  const handleRemove = (index: number) => {
    console.log("Removing file at index:", index); // Debugging line
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
    onFileSelect(updatedFiles); // Update parent with remaining files
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className='text-base text-center capitalize'>Upload Source File Here</h3>
      <p className='py-3 text-neutral-500 text-xs'>File Supported: {supportedfiles}</p>
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

      {previewUrls.length > 0 && (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={previewUrls} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {previewUrls.map((url, index) => (
                <SortableItem
                  key={url}
                  id={url}
                  previewUrl={url}
                  onRemove={() => handleRemove(index)} // Call handleRemove with index
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default FileUpload;
