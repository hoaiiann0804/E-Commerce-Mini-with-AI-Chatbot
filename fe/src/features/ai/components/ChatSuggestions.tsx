import React from 'react';

interface ChatSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({
  suggestions,
  onSuggestionClick,
}) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <div className="text-xs text-neutral-600 dark:text-neutral-400 font-semibold">
          Gợi ý cho bạn
        </div>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="group text-xs bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 hover:from-primary-100 hover:via-primary-200 hover:to-primary-100 dark:from-primary-900/30 dark:via-primary-800/40 dark:to-primary-900/30 dark:hover:from-primary-800/50 dark:hover:via-primary-700/60 dark:hover:to-primary-800/50 text-primary-700 dark:text-primary-300 rounded-xl px-4 py-2.5 transition-all duration-300 border border-primary-200/60 dark:border-primary-700/60 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg hover:shadow-primary-500/20 transform hover:scale-105 font-medium backdrop-blur-sm"
          >
            <span className="flex items-center space-x-2">
              <span>{suggestion}</span>
              <svg
                className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSuggestions;
