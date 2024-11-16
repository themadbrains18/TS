// components/RichTextEditor.tsx
import React, { useEffect, useState } from 'react';
import { UseFormClearErrors, UseFormSetError, UseFormSetValue } from 'react-hook-form';

import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

/**
 * Dynamically import ReactQuill to avoid SSR issues
 */
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
interface EditerProps {
  setValue: UseFormSetValue<any>
  clearErrors: UseFormClearErrors<any>
  setError: UseFormSetError<any>
  initialValue?: string;
}

const RichTextEditor: React.FC<EditerProps> = ({ setValue, clearErrors, setError, initialValue }) => {
  const [text, setText] = useState<string>('');

  /**
   * Remove <p><br></p> when the editor is empty
   */
  const handleChange = (value: string) => {
    if (value === '<p><br></p>') {
      setText('');
      setValue('description', '');
    } else {
      setText(value);
      setValue('description', value);
      clearErrors('description')
    }

  };

  /**
   * useEffect Hook: This effect runs whenever the `initialValue` or `setValue` changes.
   * It performs the following actions when `initialValue` is provided.
   */
  useEffect(() => {
    if (initialValue) {
      setText(initialValue);
      setValue('description', initialValue);
      clearErrors('description');
    }
  }, [initialValue, setValue]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['link',],
      ['clean'],
    ],
  };

  // useEffect(() => {
  //   const editor = document.querySelector('.ql-editor');
  //   if (editor) {
  //     // editor.resize = 'vertical'; // Correct way to set the CSS property
  //   }
  // }, []);

  return (
    <div className='resize-y'>
      <ReactQuill
        value={text}
        onChange={handleChange}
        modules={modules}
        theme="snow"
        className='resize-y h-full'
      />
    </div>
  );
};

export default RichTextEditor;

