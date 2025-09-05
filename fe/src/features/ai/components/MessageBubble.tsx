import React from 'react';
import { Message } from '../types/Message';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { GridIcon } from './icons/index';

interface MessageBubbleProps {
  message: Message;
  onSuggestionClick: (suggestion: string) => void;
}

/**
 * Component hiển thị một tin nhắn trong chat
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onSuggestionClick,
}) => {
  return (
    <div
      className={`max-w-[85%] rounded-2xl p-3.5 chat-bubble ${
        message.sender === 'user'
          ? 'bg-primary-500 text-white order-1 mr-2 rounded-tr-none shadow-md'
          : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white shadow-md rounded-tl-none border border-neutral-100 dark:border-neutral-700'
      }`}
    >
      {message.isLoading ? (
        <div className="flex items-center justify-center py-2">
          <div className="flex space-x-1.5">
            <div
              className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            ></div>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>

          {/* Hiển thị sản phẩm nếu có */}
          {message.products && message.products.length > 0 && (
            <div className="mt-4 space-y-3">
              <p className="font-medium text-xs text-neutral-500 dark:text-neutral-400 flex items-center">
                <GridIcon className="mr-1.5" />
                <span>Sản phẩm gợi ý cho bạn</span>
              </p>
              <div className="grid grid-cols-1 gap-3">
                {message.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Hiển thị actions nếu có */}
          {message.actions && message.actions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.actions.map((action, index) => (
                <Link
                  key={index}
                  to={action.url || '#'}
                  className="text-xs bg-white/30 hover:bg-white/40 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-full px-3 py-1.5 transition-all duration-200 font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          )}

          {/* Hiển thị gợi ý */}
          {message.suggestions && message.suggestions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSuggestionClick(suggestion);
                  }}
                  className="text-xs bg-white/20 hover:bg-white/30 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-full px-3 py-1.5 transition-all duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MessageBubble;
