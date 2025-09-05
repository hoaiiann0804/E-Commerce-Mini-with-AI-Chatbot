import React, { useMemo, useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: number;
  readonly?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'Nhập nội dung...',
  height = 200,
  readonly = false,
}) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange || (() => {})}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={readonly}
        style={{ height: `${height}px`, marginBottom: '50px' }}
      />
      <style>{`
        .rich-text-editor .ql-editor {
          min-height: ${height - 42}px;
        }
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
        }
        .rich-text-editor .ql-container {
          border-bottom: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
        }
        .rich-text-editor .ql-editor img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 10px 0;
        }
        .rich-text-editor .ql-editor p {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
