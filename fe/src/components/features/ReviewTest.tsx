import React from 'react';
import ProductReviews from './ProductReviews';

// Test component to verify review system works
const ReviewTest: React.FC = () => {
  // Use a mock product ID for testing
  const testProductId = 'test-product-id';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          🧪 Review System Test
        </h1>

        <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
          <p>
            <strong>Product ID:</strong> {testProductId}
          </p>
          <p>
            <strong>Expected behavior:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Should show "Tổng quan đánh giá" and "Tất cả đánh giá" tabs</li>
            <li>Should NOT make API call with undefined productId</li>
            <li>Should show login prompt if not authenticated</li>
            <li>Should show review form if authenticated</li>
          </ul>
        </div>
      </div>

      <ProductReviews
        productId={testProductId}
        averageRating={4.2}
        totalReviews={15}
      />
    </div>
  );
};

export default ReviewTest;
