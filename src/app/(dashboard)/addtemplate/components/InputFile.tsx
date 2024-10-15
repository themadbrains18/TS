import React, { useState } from 'react';

interface FileUploadProps {
    onFileSelect: (file: File | null) => void;
    buttonLabel?: string;
    className?: string;
    supportedfiles?:string
}

const FileUpload: React.FC<FileUploadProps> = ({
    onFileSelect,
    buttonLabel = 'File Name:',
    className = '',
    supportedfiles
}) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setFileName(file ? file.name : null);
        onFileSelect(file);
    };

    return (
        <div className={`flex flex-col items-center ${className}`}>
            {/* Custom label styled like a button */}
            <h3 className='text-base text-center capitalize'>upload source file here</h3>
            <p className='py-3 text-neutral-500 text-xs'>File Supported : {supportedfiles}</p>
            <label
                htmlFor="file-upload"
                className="bg-primary-100 text-white capitalize font-semibold leading-6 transition-all duration-300 hover:bg-[#872fcb] py-2 px-[30px] cursor-pointer mb-3"
            >
                choose file
            </label>
            {fileName ? `File Name: ${fileName}` : buttonLabel}

            {/* Hidden file input */}
            <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default FileUpload;
