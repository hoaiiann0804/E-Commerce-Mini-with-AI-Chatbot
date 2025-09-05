import React, { useState } from 'react';
import CreateProductForm from './CreateProductForm';
import CreateProductWizard from './CreateProductWizard';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';

interface ProductFormSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ProductFormSelector: React.FC<ProductFormSelectorProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [selectedForm, setSelectedForm] = useState<'tabs' | 'wizard' | null>(
    null
  );

  const handleSelectForm = (formType: 'tabs' | 'wizard') => {
    setSelectedForm(formType);
  };

  const handleClose = () => {
    setSelectedForm(null);
    onClose();
  };

  const handleSuccess = () => {
    setSelectedForm(null);
    onSuccess?.();
  };

  if (selectedForm === 'tabs') {
    return (
      <CreateProductForm
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    );
  }

  if (selectedForm === 'wizard') {
    return (
      <CreateProductWizard
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chọn cách tạo sản phẩm"
      size="md"
    >
      <div className="p-4">
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Vui lòng chọn cách bạn muốn tạo sản phẩm mới:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary-500 dark:hover:border-primary-400 cursor-pointer transition-colors"
            onClick={() => handleSelectForm('tabs')}
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 h-32 flex items-center justify-center">
              <img
                src="/images/tabs-form.svg"
                alt="Form dạng tab"
                className="h-24 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxheW91dC1kYXNoYm9hcmQiPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjkiIHg9IjMiIHk9IjMiIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iNSIgeD0iMTQiIHk9IjMiIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iOSIgeD0iMTQiIHk9IjEyIiByeD0iMSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjUiIHg9IjMiIHk9IjE2IiByeD0iMSIvPjwvc3ZnPg==';
                }}
              />
            </div>
            <h3 className="font-medium text-lg text-center mb-2">
              Form dạng tab
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Tất cả các trường trong một trang, phân chia theo tab để dễ điều
              hướng.
            </p>
          </div>

          <div
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary-500 dark:hover:border-primary-400 cursor-pointer transition-colors"
            onClick={() => handleSelectForm('wizard')}
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 h-32 flex items-center justify-center">
              <img
                src="/images/wizard-form.svg"
                alt="Form dạng wizard"
                className="h-24 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN0ZXBzIj48cGF0aCBkPSJNMyA5aDZ2LTZoMnY2aDZhMiAyIDAgMCAxIDIgMnYyYTIgMiAwIDAgMS0yIDJoLTZ2NmgtMnYtNkgzYTIgMiAwIDAgMS0yLTJ2LTJhMiAyIDAgMCAxIDItMnoiLz48L3N2Zz4=';
                }}
              />
            </div>
            <h3 className="font-medium text-lg text-center mb-2">
              Form dạng wizard
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Tạo sản phẩm từng bước một, với hướng dẫn chi tiết và gợi ý.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-neutral-700 dark:text-neutral-300"
          >
            <span className="inline-block">Hủy</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductFormSelector;
