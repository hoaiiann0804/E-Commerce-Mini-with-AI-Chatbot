import React, { useState } from 'react';
import CreateProductForm from './CreateProductForm';

const CreateProductFormDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 Form Tạo Sản Phẩm Mới
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Giao diện đã được thiết kế lại hoàn toàn với màu sắc đẹp và dễ sử
            dụng
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Thông tin cơ bản
                </h3>
                <p className="text-sm text-gray-500">Tên, mô tả, SKU</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Giá & Kho hàng
                </h3>
                <p className="text-sm text-gray-500">Giá bán, tồn kho</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏷️</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Phân loại
                </h3>
                <p className="text-sm text-gray-500">Danh mục, trạng thái</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🖼️</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Hình ảnh
                </h3>
                <p className="text-sm text-gray-500">URL ảnh sản phẩm</p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                ✨ Tính năng nổi bật
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Giao diện hiện đại với gradient
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Hover effects mượt mà
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Progress steps indicator
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Price preview real-time
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Image preview grid
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Dark mode support
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            🚀 Mở Form Tạo Sản Phẩm
          </button>
        </div>
      </div>

      <CreateProductForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => {
          setIsOpen(false);
          alert('✅ Tạo sản phẩm thành công!');
        }}
      />
    </div>
  );
};

export default CreateProductFormDemo;
