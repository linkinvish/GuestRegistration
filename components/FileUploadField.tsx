
import React, { useRef } from 'react';

interface FileUploadFieldProps {
  label: string;
  name: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  name,
  file,
  onChange,
  required = false,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={handleClick}
        className={`w-full flex items-center px-3 py-2 border rounded-md shadow-sm cursor-pointer transition ${
          error
            ? 'border-red-500'
            : 'border-slate-300 hover:border-teal-500'
        }`}
      >
        <span className="bg-slate-100 text-slate-600 text-sm font-semibold px-3 py-1 rounded-md border border-slate-200">
          Choose File
        </span>
        <span className="ml-3 text-sm text-slate-500 truncate">
          {file ? file.name : 'No file chosen...'}
        </span>
      </div>
      <input
        type="file"
        id={name}
        name={name}
        ref={inputRef}
        onChange={onChange}
        className="hidden"
        accept="image/jpeg, image/png"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FileUploadField;
