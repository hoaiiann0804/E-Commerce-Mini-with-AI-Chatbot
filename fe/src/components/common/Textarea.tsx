import React from 'react';

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  rows?: number;
  cols?: number;
  error?: string;
  required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  className = '',
  id,
  name,
  rows = 4,
  cols,
  error,
  required = false,
}) => {
  const textareaId =
    id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        cols={cols}
        required={required}
        className={`
          w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 
          border border-gray-300 dark:border-gray-600 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          dark:focus:ring-primary-600 dark:focus:border-primary-600
          disabled:opacity-50 disabled:cursor-not-allowed
          resize-vertical
          ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
          ${className}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
