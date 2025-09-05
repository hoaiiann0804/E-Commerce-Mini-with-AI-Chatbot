import React from 'react';
import { ResizeIcon } from './icons';

const ChatResizeIndicator: React.FC = () => {
  return (
    <div className="absolute bottom-2 right-2 text-neutral-400 dark:text-neutral-600 pointer-events-none group">
      <ResizeIcon size={16} />

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg text-xs text-neutral-700 dark:text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-neutral-200 dark:border-neutral-700">
        <p className="font-medium">Kéo góc để thay đổi kích thước</p>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">
          Nhấn "Apply" để lưu kích thước
        </p>
      </div>
    </div>
  );
};

export default ChatResizeIndicator;
