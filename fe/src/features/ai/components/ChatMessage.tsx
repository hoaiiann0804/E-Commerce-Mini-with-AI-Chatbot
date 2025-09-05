import React from 'react';
import { useTranslation } from 'react-i18next';
import { Message } from '../types/Message';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { t } = useTranslation();
  const { sender, text, isLoading } = message;

  const isAI = sender === 'ai';

  // Hiển thị icon phù hợp với người gửi
  const renderAvatar = () => {
    if (isAI) {
      return (
        <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center mr-3 shadow-lg ring-2 ring-primary-500/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          {/* AI indicator dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white shadow-lg">
            <div className="absolute inset-1 bg-green-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-neutral-400 via-neutral-500 to-neutral-600 dark:from-neutral-600 dark:via-neutral-700 dark:to-neutral-800 flex items-center justify-center ml-3 shadow-lg ring-2 ring-neutral-400/20 dark:ring-neutral-600/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      );
    }
  };

  return (
    <div
      className={`flex items-start my-4 ${isAI ? 'justify-start' : 'justify-end'} group`}
    >
      {isAI && <div className="relative flex-shrink-0">{renderAvatar()}</div>}

      <div
        className={`max-w-[80%] sm:max-w-[75%] rounded-2xl px-5 py-4 shadow-lg transition-all duration-200 group-hover:shadow-xl ${
          isAI
            ? 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60 backdrop-blur-sm'
            : 'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white shadow-primary-500/25'
        }`}
      >
        {isLoading ? (
          <div className="flex space-x-2 items-center justify-center h-8">
            <div
              className="w-2.5 h-2.5 bg-current rounded-full animate-bounce opacity-60"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="w-2.5 h-2.5 bg-current rounded-full animate-bounce opacity-80"
              style={{ animationDelay: '150ms' }}
            ></div>
            <div
              className="w-2.5 h-2.5 bg-current rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            ></div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium">
            {text}
          </div>
        )}

        {/* Message timestamp */}
        {!isLoading && (
          <div
            className={`text-xs mt-3 flex items-center ${
              isAI ? 'text-neutral-400 dark:text-neutral-500' : 'text-white/70'
            }`}
          >
            <svg
              className="w-3 h-3 mr-1 opacity-60"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            {new Date().toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        )}
      </div>

      {!isAI && <div className="relative flex-shrink-0">{renderAvatar()}</div>}
    </div>
  );
};

export default ChatMessage;
