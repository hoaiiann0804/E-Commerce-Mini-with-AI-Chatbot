import { useState } from 'react';
import ReviewSummary from './ReviewSummary';
import ReviewSection from './ReviewSection';

interface ProductReviewsProps {
  productId: string;
  averageRating?: number;
  totalReviews?: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  averageRating = 0,
  totalReviews = 0,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'reviews'>('summary');

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-neutral-200 dark:border-neutral-700 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'summary'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            Tổng quan đánh giá
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'reviews'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            Tất cả đánh giá ({totalReviews})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'summary' && (
          <ReviewSummary
            productId={productId}
            averageRating={averageRating}
            totalReviews={totalReviews}
          />
        )}

        {activeTab === 'reviews' && <ReviewSection productId={productId} />}
      </div>
    </div>
  );
};

export default ProductReviews;
