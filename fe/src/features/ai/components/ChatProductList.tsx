import React from 'react';
import { ProductRecommendation } from '../services/chatbotApi';
import ChatProductCard from './ChatProductCard';

interface ChatProductListProps {
  products: ProductRecommendation[];
  sessionId: string;
  title?: string;
  onProductClick?: (product: ProductRecommendation) => void;
}

const ChatProductList: React.FC<ChatProductListProps> = ({
  products,
  sessionId,
  title,
  onProductClick,
}) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      {title && (
        <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
          {title}
        </h4>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {products.map((product) => (
          <ChatProductCard
            key={product.id}
            product={product}
            sessionId={sessionId}
            onProductClick={onProductClick}
          />
        ))}
      </div>

      {/* Show more products button if there are many */}
      {products.length > 4 && (
        <div className="mt-4 text-center">
          <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
            Xem thêm sản phẩm →
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatProductList;
