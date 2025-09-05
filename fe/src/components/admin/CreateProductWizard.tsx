import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Modal from '@/components/common/Modal';
import Select from '@/components/common/Select';
import { useCreateProductMutation } from '@/services/adminProductApi';
import { useGetCategoriesQuery } from '@/services/categoryApi';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  PlusIcon,
  SwatchIcon,
  TagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';

interface CreateProductWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const statusOptions = [
  { value: 'active', label: '✅ Đang bán' },
  { value: 'inactive', label: '⏸️ Tạm dừng' },
  { value: 'draft', label: '📝 Bản nháp' },
];

interface Attribute {
  id: string;
  name: string;
  value: string;
}

interface Variant {
  id: string;
  name: string;
  price: string | number;
  stock: string | number;
}

// Định nghĩa các bước trong wizard
const STEPS = [
  {
    id: 'basic',
    title: 'Thông tin cơ bản',
    icon: <DocumentTextIcon className="w-5 h-5" />,
    description: 'Nhập thông tin cơ bản về sản phẩm',
  },
  {
    id: 'pricing',
    title: 'Giá & Kho hàng',
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
    description: 'Thiết lập giá bán và số lượng tồn kho',
  },
  {
    id: 'categories',
    title: 'Phân loại',
    icon: <TagIcon className="w-5 h-5" />,
    description: 'Chọn danh mục và trạng thái sản phẩm',
  },
  {
    id: 'images',
    title: 'Hình ảnh',
    icon: <PhotoIcon className="w-5 h-5" />,
    description: 'Thêm hình ảnh sản phẩm',
  },
  {
    id: 'attributes',
    title: 'Thông số tuỳ chỉnh',
    icon: <SwatchIcon className="w-5 h-5" />,
    description: 'Thêm thông số tuỳ chỉnh cho sản phẩm',
  },
  {
    id: 'seo',
    title: 'SEO & Hoàn tất',
    icon: <MagnifyingGlassIcon className="w-5 h-5" />,
    description: 'Tối ưu SEO và hoàn tất tạo sản phẩm',
  },
];

const CreateProductWizard: React.FC<CreateProductWizardProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  // State quản lý bước hiện tại
  const [currentStep, setCurrentStep] = useState(0);

  // State quản lý trạng thái hoàn thành của từng bước
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(
    {}
  );

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    comparePrice: '',
    stock: '',
    sku: '',
    status: 'active',
    categoryIds: [] as string[],
    images: '',
    thumbnail: '',
    featured: false,
    searchKeywords: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  });

  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-fill SEO fields when name and description change
  useEffect(() => {
    if (formData.name && !formData.seoTitle) {
      setFormData((prev) => ({ ...prev, seoTitle: prev.name }));
    }
    if (formData.description && !formData.seoDescription) {
      setFormData((prev) => ({
        ...prev,
        seoDescription: prev.description.substring(0, 160),
      }));
    }
    if (formData.description && !formData.shortDescription) {
      setFormData((prev) => ({
        ...prev,
        shortDescription: prev.description.substring(0, 200),
      }));
    }
  }, [formData.name, formData.description]);

  // Form handlers
  const handleInputChange = (
    field: string,
    value: string | string[] | boolean
  ) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  // Attribute handlers
  const addAttribute = () => {
    setAttributes([
      ...attributes,
      { id: Date.now().toString(), name: '', value: '' },
    ]);
  };

  const updateAttribute = (id: string, field: string, value: string) => {
    setAttributes(
      attributes.map((attr) =>
        attr.id === id ? { ...attr, [field]: value } : attr
      )
    );
  };

  const removeAttribute = (id: string) => {
    setAttributes(attributes.filter((attr) => attr.id !== id));
  };

  // Variant handlers
  const addVariant = () => {
    setVariants([
      ...variants,
      { id: Date.now().toString(), name: '', price: '', stock: '' },
    ]);
  };

  const updateVariant = (id: string, field: string, value: string | number) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  const removeVariant = (id: string) => {
    setVariants(variants.filter((variant) => variant.id !== id));
  };

  // Validate từng bước
  const validateStep = (stepId: string): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepId === 'basic') {
      if (!formData.name.trim()) {
        newErrors.name = 'Vui lòng nhập tên sản phẩm';
      }

      if (!formData.sku.trim()) {
        newErrors.sku = 'Vui lòng nhập mã SKU';
      }

      if (!formData.shortDescription.trim()) {
        newErrors.shortDescription = 'Vui lòng nhập mô tả ngắn';
      }

      if (!formData.description.trim()) {
        newErrors.description = 'Vui lòng nhập mô tả sản phẩm';
      }
    }

    if (stepId === 'pricing') {
      if (!formData.price || Number(formData.price) <= 0) {
        newErrors.price = 'Giá sản phẩm phải lớn hơn 0';
      }

      if (!formData.stock || Number(formData.stock) < 0) {
        newErrors.stock = 'Số lượng tồn kho không được âm';
      }
    }

    if (stepId === 'categories') {
      if (formData.categoryIds.length === 0) {
        newErrors.categoryIds = 'Vui lòng chọn ít nhất một danh mục';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate toàn bộ form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên sản phẩm';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Vui lòng nhập mô tả sản phẩm';
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Vui lòng nhập mô tả ngắn';
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'Giá sản phẩm phải lớn hơn 0';
    }

    if (!formData.stock || Number(formData.stock) < 0) {
      newErrors.stock = 'Số lượng tồn kho không được âm';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'Vui lòng nhập mã SKU';
    }

    if (formData.categoryIds.length === 0) {
      newErrors.categoryIds = 'Vui lòng chọn ít nhất một danh mục';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Tìm bước đầu tiên có lỗi và chuyển đến đó
      if (
        newErrors.name ||
        newErrors.sku ||
        newErrors.description ||
        newErrors.shortDescription
      ) {
        setCurrentStep(0); // Basic
      } else if (newErrors.price || newErrors.stock) {
        setCurrentStep(1); // Pricing
      } else if (newErrors.categoryIds) {
        setCurrentStep(2); // Categories
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  // Xử lý chuyển bước
  const handleNext = () => {
    const currentStepId = STEPS[currentStep].id;

    if (validateStep(currentStepId)) {
      // Đánh dấu bước hiện tại là đã hoàn thành
      setCompletedSteps((prev) => ({
        ...prev,
        [currentStepId]: true,
      }));

      // Chuyển đến bước tiếp theo
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoToStep = (stepIndex: number) => {
    // Chỉ cho phép chuyển đến các bước đã hoàn thành hoặc bước hiện tại
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        shortDescription: formData.shortDescription.trim(),
        price: Number(formData.price),
        comparePrice: formData.comparePrice
          ? Number(formData.comparePrice)
          : undefined,
        stockQuantity: Number(formData.stock),
        sku: formData.sku.trim(),
        status: formData.status as 'active' | 'inactive' | 'draft',
        categoryIds: formData.categoryIds,
        images: formData.images
          ? formData.images.split(',').map((img) => img.trim())
          : [],
        thumbnail:
          formData.thumbnail ||
          (formData.images ? formData.images.split(',')[0]?.trim() : ''),
        featured: formData.featured,
        searchKeywords: formData.searchKeywords
          ? formData.searchKeywords.split(',').map((kw) => kw.trim())
          : [],
        seoTitle: formData.seoTitle || formData.name.trim(),
        seoDescription:
          formData.seoDescription || formData.shortDescription.trim(),
        seoKeywords: formData.seoKeywords
          ? formData.seoKeywords.split(',').map((kw) => kw.trim())
          : [],
        attributes: attributes
          .filter((attr) => attr.name.trim() && attr.value.trim())
          .map((attr) => ({
            name: attr.name.trim(),
            value: attr.value.trim(),
          })),
      };

      await createProduct(productData).unwrap();

      // Reset form
      setFormData({
        name: '',
        description: '',
        shortDescription: '',
        price: '',
        comparePrice: '',
        stock: '',
        sku: '',
        status: 'active',
        categoryIds: [],
        images: '',
        thumbnail: '',
        featured: false,
        searchKeywords: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
      });
      setAttributes([]);
      setErrors({});
      setCurrentStep(0);
      setCompletedSteps({});

      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error('Failed to create product:', error);
      // Handle API errors
      if (error?.data?.errors) {
        const apiErrors: Record<string, string> = {};
        error.data.errors.forEach((err: any) => {
          apiErrors[err.field] = err.message;
        });
        setErrors(apiErrors);
      }
    }
  };

  // Render các bước
  const renderStepContent = () => {
    const currentStepId = STEPS[currentStep].id;

    switch (currentStepId) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50 mb-6">
              <div className="flex items-start">
                <InformationCircleIcon className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">
                    Mẹo nhỏ
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Hãy đặt tên sản phẩm ngắn gọn, dễ nhớ và chứa từ khóa quan
                    trọng. Mô tả ngắn nên nêu bật lợi ích chính của sản phẩm.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  Mã SKU <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                  error={errors.sku}
                  placeholder="Nhập mã SKU"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Mã SKU là mã duy nhất để quản lý sản phẩm của bạn
                </p>
              </div>

              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  Mô tả ngắn <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) =>
                      handleInputChange('shortDescription', e.target.value)
                    }
                    rows={2}
                    maxLength={200}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-neutral-800 dark:text-neutral-200"
                    placeholder="Mô tả ngắn gọn về sản phẩm (tối đa 200 ký tự)"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
                    {formData.shortDescription.length}/200
                  </div>
                </div>
                {errors.shortDescription && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.shortDescription}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  Mô tả chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-neutral-800 dark:text-neutral-200"
                  placeholder="Mô tả chi tiết về sản phẩm"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured as boolean}
                  onChange={(e) =>
                    handleInputChange('featured', e.target.checked)
                  }
                  className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-gray-300 rounded"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Đánh dấu là sản phẩm nổi bật
                </label>
              </div>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50 mb-6">
              <div className="flex items-start">
                <InformationCircleIcon className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">
                    Mẹo về giá
                  </h4>
                  <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1 mt-1">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-1">✓</span>
                      <span>
                        Đặt giá gốc cao hơn giá bán để tạo cảm giác giảm giá
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-1">✓</span>
                      <span>
                        Giá bán nên kết thúc bằng 9 hoặc 5 (ví dụ: 199.000đ)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  Giá bán <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400">₫</span>
                  </div>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    error={errors.price}
                    placeholder="0"
                    min="0"
                    className="pl-7"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  Giá gốc
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400">₫</span>
                  </div>
                  <Input
                    type="number"
                    value={formData.comparePrice}
                    onChange={(e) =>
                      handleInputChange('comparePrice', e.target.value)
                    }
                    placeholder="0"
                    min="0"
                    className="pl-7"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Hiển thị như giá gạch ngang
                </p>
              </div>

              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  Số lượng tồn kho <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', e.target.value)}
                  error={errors.stock}
                  placeholder="0"
                  min="0"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-500">{errors.stock}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  Trạng thái
                </label>
                <Select
                  options={statusOptions}
                  value={formData.status}
                  onChange={(value) => handleInputChange('status', value)}
                />
              </div>
            </div>

            {/* Hiển thị xem trước giá */}
            <div className="mt-6 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                Xem trước hiển thị giá:
              </h4>
              <div className="flex items-end gap-2">
                {formData.comparePrice && Number(formData.comparePrice) > 0 ? (
                  <>
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {Number(formData.price).toLocaleString()}₫
                    </span>
                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                      {Number(formData.comparePrice).toLocaleString()}₫
                    </span>
                    {Number(formData.comparePrice) > Number(formData.price) && (
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Giảm{' '}
                        {Math.round(
                          (1 -
                            Number(formData.price) /
                              Number(formData.comparePrice)) *
                            100
                        )}
                        %
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {formData.price
                      ? Number(formData.price).toLocaleString()
                      : 0}
                    ₫
                  </span>
                )}
              </div>
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50 mb-6">
              <div className="flex items-start">
                <InformationCircleIcon className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">
                    Mẹo phân loại
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Chọn nhiều danh mục sẽ giúp sản phẩm của bạn xuất hiện ở
                    nhiều nơi trên trang web, tăng khả năng được tìm thấy.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Chọn danh mục cho sản phẩm (giữ Ctrl/Cmd để chọn nhiều)
                    </p>
                  </div>
                  <select
                    multiple
                    value={formData.categoryIds}
                    onChange={(e) => {
                      const values = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      handleInputChange('categoryIds', values);
                    }}
                    className="w-full px-3 py-2 border-0 focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-white text-neutral-800 dark:text-neutral-200"
                    size={6}
                  >
                    {isCategoriesLoading ? (
                      <option disabled>Đang tải danh mục...</option>
                    ) : categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>Không có danh mục nào</option>
                    )}
                  </select>
                </div>
                {errors.categoryIds && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.categoryIds}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                    Từ khóa tìm kiếm
                  </label>
                  <Input
                    value={formData.searchKeywords}
                    onChange={(e) =>
                      handleInputChange('searchKeywords', e.target.value)
                    }
                    placeholder="Từ khóa cách nhau bởi dấu phẩy"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    VD: điện thoại, smartphone, iphone
                  </p>
                </div>
              </div>
            </div>

            {/* Selected categories */}
            {formData.categoryIds.length > 0 && (
              <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Danh mục đã chọn:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {formData.categoryIds.map((categoryId) => {
                    const category = categories?.find(
                      (c) => c.id === categoryId
                    );
                    return category ? (
                      <span
                        key={categoryId}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      >
                        <TagIcon className="w-4 h-4 mr-1" />
                        {category.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        );

      case 'images':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50 mb-6">
              <div className="flex items-start">
                <InformationCircleIcon className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">
                    Mẹo về hình ảnh
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Hình ảnh chất lượng cao sẽ giúp tăng tỷ lệ chuyển đổi. Nên
                    sử dụng ít nhất 3-5 hình ảnh cho mỗi sản phẩm.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  URLs hình ảnh
                </label>
                <textarea
                  value={formData.images}
                  onChange={(e) => handleInputChange('images', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-neutral-800 dark:text-neutral-200"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Nhập các URL hình ảnh, cách nhau bằng dấu phẩy
                </p>
              </div>

              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  URL hình ảnh đại diện (thumbnail)
                </label>
                <Input
                  value={formData.thumbnail}
                  onChange={(e) =>
                    handleInputChange('thumbnail', e.target.value)
                  }
                  placeholder="https://example.com/thumbnail.jpg"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Để trống sẽ sử dụng hình ảnh đầu tiên làm thumbnail
                </p>
              </div>
            </div>

            {/* Image preview */}
            {formData.images && (
              <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Xem trước hình ảnh:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {formData.images.split(',').map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-square bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 overflow-hidden group"
                    >
                      <img
                        src={url.trim()}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://via.placeholder.com/150?text=Error';
                        }}
                      />
                      {formData.thumbnail === url.trim() && (
                        <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                          Thumbnail
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button
                          type="button"
                          onClick={() =>
                            handleInputChange('thumbnail', url.trim())
                          }
                          className="bg-white text-gray-800 text-xs px-2 py-1 rounded"
                        >
                          Đặt làm thumbnail
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'attributes':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50 mb-6">
              <div className="flex items-start">
                <InformationCircleIcon className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">
                    Thông số tuỳ chỉnh
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Thêm các thông số kỹ thuật, đặc điểm riêng của sản phẩm như
                    màu sắc, kích thước, chất liệu, v.v.
                  </p>
                </div>
              </div>
            </div>

            {/* Thông số tuỳ chỉnh */}
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg text-neutral-800 dark:text-neutral-200 flex items-center">
                  <SwatchIcon className="w-5 h-5 mr-2 text-primary-500" />
                  Thông số tuỳ chỉnh
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAttribute}
                  className="text-primary-500 dark:text-primary-400 border-primary-500 dark:border-primary-400"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  <span className="inline-block">Thêm thông số</span>
                </Button>
              </div>

              {attributes.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-md border border-dashed border-gray-300 dark:border-gray-600">
                  <SwatchIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-lg font-medium mb-2">
                    Chưa có thông số nào
                  </p>
                  <p className="text-sm mb-4">
                    Thêm thông số kỹ thuật để mô tả chi tiết sản phẩm
                  </p>
                  <button
                    type="button"
                    onClick={addAttribute}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <PlusIcon className="w-4 h-4 mr-1" />
                    Thêm thông số đầu tiên
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {attributes.map((attribute, index) => (
                    <div
                      key={attribute.id}
                      className="flex gap-3 items-end p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex-1">
                        <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                          Tên thông số
                        </label>
                        <Input
                          placeholder="Ví dụ: Màu sắc, Kích thước, Chất liệu..."
                          value={attribute.name}
                          onChange={(e) =>
                            updateAttribute(
                              attribute.id,
                              'name',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                          Giá trị
                        </label>
                        <Input
                          placeholder="Ví dụ: Đỏ, 15 inch, Kim loại..."
                          value={attribute.value}
                          onChange={(e) =>
                            updateAttribute(
                              attribute.id,
                              'value',
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttribute(attribute.id)}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-200 dark:border-red-800"
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Xóa thông số</span>
                      </Button>
                    </div>
                  ))}

                  {/* Thêm thông số mới */}
                  <div className="text-center pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addAttribute}
                      className="text-primary-500 dark:text-primary-400 border-primary-500 dark:border-primary-400"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Thêm thông số khác
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50 mb-6">
              <div className="flex items-start">
                <InformationCircleIcon className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-300">
                    Mẹo SEO
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Tối ưu hóa SEO giúp sản phẩm của bạn dễ dàng được tìm thấy
                    trên các công cụ tìm kiếm. Tiêu đề SEO nên có 50-60 ký tự và
                    mô tả SEO nên có 150-160 ký tự.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  Tiêu đề SEO
                </label>
                <div className="relative">
                  <Input
                    value={formData.seoTitle}
                    onChange={(e) =>
                      handleInputChange('seoTitle', e.target.value)
                    }
                    placeholder="Tiêu đề hiển thị trên kết quả tìm kiếm"
                    maxLength={60}
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {formData.seoTitle.length}/60 ký tự (tối ưu: 50-60)
                  </p>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  Mô tả SEO
                </label>
                <div className="relative">
                  <textarea
                    value={formData.seoDescription}
                    onChange={(e) =>
                      handleInputChange('seoDescription', e.target.value)
                    }
                    rows={3}
                    maxLength={160}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-neutral-800 dark:text-neutral-200"
                    placeholder="Mô tả ngắn hiển thị trên kết quả tìm kiếm"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {formData.seoDescription.length}/160 ký tự (tối ưu: 150-160)
                  </p>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-neutral-700 dark:text-neutral-300">
                  Từ khóa SEO
                </label>
                <Input
                  value={formData.seoKeywords}
                  onChange={(e) =>
                    handleInputChange('seoKeywords', e.target.value)
                  }
                  placeholder="Các từ khóa cách nhau bởi dấu phẩy"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  VD: iPhone, điện thoại, Apple, smartphone
                </p>
              </div>
            </div>

            {/* SEO Preview */}
            <div className="mt-6 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                Xem trước kết quả tìm kiếm:
              </h4>
              <div className="space-y-1">
                <div className="text-blue-600 dark:text-blue-400 text-lg font-medium line-clamp-1">
                  {formData.seoTitle || formData.name || 'Tiêu đề sản phẩm'}
                </div>
                <div className="text-green-700 dark:text-green-500 text-sm">
                  www.yourdomain.com/products/
                  {formData.name
                    ? formData.name
                        .toLowerCase()
                        .replace(/[^\w\s]/gi, '')
                        .replace(/\s+/g, '-')
                    : 'ten-san-pham'}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {formData.seoDescription ||
                    formData.shortDescription ||
                    formData.description ||
                    'Mô tả sản phẩm sẽ hiển thị ở đây. Hãy viết mô tả hấp dẫn để thu hút khách hàng click vào sản phẩm của bạn.'}
                </div>
              </div>
            </div>

            {/* Tóm tắt sản phẩm */}
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/50">
              <h4 className="font-medium text-green-700 dark:text-green-300 mb-3 flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Tóm tắt thông tin sản phẩm
              </h4>
              <div className="space-y-2 text-sm text-green-600 dark:text-green-400">
                <p>
                  <span className="font-medium">Tên sản phẩm:</span>{' '}
                  {formData.name}
                </p>
                <p>
                  <span className="font-medium">Mã SKU:</span> {formData.sku}
                </p>
                <p>
                  <span className="font-medium">Giá bán:</span>{' '}
                  {formData.price ? Number(formData.price).toLocaleString() : 0}
                  ₫
                </p>
                <p>
                  <span className="font-medium">Số lượng:</span>{' '}
                  {formData.stock}
                </p>
                <p>
                  <span className="font-medium">Trạng thái:</span>{' '}
                  {
                    statusOptions.find((opt) => opt.value === formData.status)
                      ?.label
                  }
                </p>
                <p>
                  <span className="font-medium">Danh mục:</span>{' '}
                  {formData.categoryIds.length > 0
                    ? formData.categoryIds
                        .map((id) => categories?.find((c) => c.id === id)?.name)
                        .join(', ')
                    : 'Chưa chọn danh mục'}
                </p>
                <p>
                  <span className="font-medium">Số hình ảnh:</span>{' '}
                  {formData.images ? formData.images.split(',').length : 0}
                </p>
                <p>
                  <span className="font-medium">Số thuộc tính:</span>{' '}
                  {attributes.length}
                </p>
                <p>
                  <span className="font-medium">Số biến thể:</span>{' '}
                  {variants.length}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tạo sản phẩm mới"
      size="xl"
      footer={
        <div className="flex justify-between w-full">
          <div>
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="group relative overflow-hidden border-2 border-primary-200 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 px-5 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1 relative z-10" />
                <span className="relative z-10">Quay lại</span>
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
              className="text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-5 py-2.5 rounded-xl font-medium transition-all duration-300"
            >
              <span className="inline-block">Hủy</span>
            </Button>

            {currentStep < STEPS.length - 1 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                className="group relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
              >
                <span className="relative z-10">Tiếp theo</span>
                <ArrowRightIcon className="w-4 h-4 ml-1 relative z-10" />
                <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isLoading}
                className="group relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2 relative z-10">
                    <LoadingSpinner size="small" />
                    <span className="inline-block">Đang xử lý...</span>
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">Tạo sản phẩm</span>
                    <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="overflow-y-auto max-h-[70vh]">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              {STEPS[currentStep].title}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Bước {currentStep + 1}/{STEPS.length}
            </span>
          </div>

          <div className="relative">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
              <div
                style={{
                  width: `${((currentStep + 1) / STEPS.length) * 100}%`,
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 dark:bg-primary-400 transition-all duration-300"
              ></div>
            </div>

            <div className="flex justify-between mt-2">
              {STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center cursor-pointer ${index <= currentStep ? 'text-primary-500 dark:text-primary-400' : 'text-gray-400 dark:text-gray-600'}`}
                  onClick={() => handleGoToStep(index)}
                >
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full mb-1 ${
                      index < currentStep
                        ? 'bg-primary-500 dark:bg-primary-400 text-white'
                        : index === currentStep
                          ? 'border-2 border-primary-500 dark:border-primary-400'
                          : 'border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircleIcon className="w-5 h-5" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <span className="text-xs hidden md:block">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            {STEPS[currentStep].description}
          </p>
        </div>

        {/* Step content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          {renderStepContent()}
        </div>
      </div>
    </Modal>
  );
};

export default CreateProductWizard;
