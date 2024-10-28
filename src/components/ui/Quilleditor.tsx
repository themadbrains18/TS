// components/RichTextEditor.tsx
import React, { useEffect, useState } from 'react';
import { UseFormClearErrors, UseFormSetError, UseFormSetValue } from 'react-hook-form';

import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
interface EditerProps{
  setValue: UseFormSetValue<any>
  clearErrors:UseFormClearErrors<any>
  setError:UseFormSetError<any>
  initialValue?: string; // Accept initial value as a prop
}

const RichTextEditor: React.FC<EditerProps> = ({setValue,clearErrors, setError,initialValue}) => {
  const [text, setText] = useState<string>('');

  const handleChange = (value: string) => {
    // Remove <p><br></p> when the editor is empty
    if (value === '<p><br></p>') {
      setText('');
      setValue('description', ''); // Set the form value to an empty string
    } else {
      setText(value);
      setValue('description', value); // Update the form value
      clearErrors('description')
    }

    // console.log(value, '==value');
  };

  useEffect(() => {
    if (initialValue) {
      setText(initialValue);
      setValue('description', initialValue); // Set form value to initial value
      clearErrors('description');
    }
  }, [initialValue, setValue]);
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['link', 'image', 'video'],
      ['clean'], // remove formatting button
    ],
  };

  return (
    <div className='h-32'>
      <ReactQuill
        value={text}
        onChange={handleChange}
        modules={modules}
        theme="snow"
        className='h-24'
      /> 
    </div>
  );
};

export default RichTextEditor;

