import React from 'react';
import { Card } from 'antd';
import '@/styles/description.css';

interface Specification {
  name: string;
  value: string;
}

interface ProductDetailsSectionProps {
  description: string;
  specifications: Specification[];
}

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  description,
  specifications,
}) => {
  // Clean and format HTML content + Fix image URLs
  const cleanDescription = description
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    // Fix incorrect /api/uploads paths to /uploads (static file serving)
    .replace(
      /http:\/\/localhost:8888\/api\/uploads/g,
      'http://localhost:8888/uploads'
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
      {/* Description Section - 2/3 width */}
      <div className="lg:col-span-2">
        <Card
          title={
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                📝
              </span>
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Mô tả sản phẩm
              </span>
            </div>
          }
          className="h-fit shadow-sm border-0"
          bodyStyle={{ padding: '24px' }}
        >
          <div className="description-content">
            <div dangerouslySetInnerHTML={{ __html: cleanDescription }} />
          </div>
        </Card>
      </div>

      {/* Specifications Section - 1/3 width */}
      <div className="lg:col-span-1">
        <Card
          title={
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                ⚙️
              </span>
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Thông số kỹ thuật
              </span>
            </div>
          }
          className="h-fit sticky top-16 sm:top-20 lg:top-24 shadow-sm hover:shadow-lg border-0 transition-all duration-300"
          bodyStyle={{ padding: '16px' }}
          style={{
            maxHeight: 'calc(100vh - 6rem)', // Prevent overflow
            overflowY: 'auto', // Allow scrolling if content is too long
          }}
        >
          {specifications && specifications.length > 0 ? (
            <div className="space-y-0">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className={`
                    flex justify-between items-start py-4 px-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0
                    ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} 
                    transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20
                  `}
                >
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize min-w-0 flex-shrink-0 mr-4">
                    {spec.name}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-gray-100 text-right break-words font-medium">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              <div className="text-5xl mb-4">📋</div>
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">
                Chưa có thông số kỹ thuật
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Thông tin sẽ được cập nhật sớm
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
