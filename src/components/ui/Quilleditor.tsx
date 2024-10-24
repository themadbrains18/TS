// components/RichTextEditor.tsx
import React, { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

interface EditerProps{
  setValue: UseFormSetValue<any>
}

const RichTextEditor: React.FC<EditerProps> = ({setValue}) => {
  const [text, setText] = useState<string>('');

  const handleChange = (value: string) => {
    setText(value);
    setValue("description",value)
  };

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

