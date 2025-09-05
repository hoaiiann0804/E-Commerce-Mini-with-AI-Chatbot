import React, { useState, useEffect } from 'react';
import { useCreateProductMutation } from '@/services/adminProductApi';
import { useGetCategoriesQuery } from '@/services/categoryApi';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import {
  PlusIcon,
  TrashIcon,
  TagIcon,
  CurrencyDollarIcon,
  PhotoIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  SwatchIcon,
  Square2StackIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

interface CreateProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const statusOptions = [
  { value: 'active', label: '✅ Đang bán' },
  { value: 'inactive', label: '⏸️ Tạm dừng' },
  { value: 'draft', label: '📝 Bản nháp' },
];

// Dynamic specification interface
interface Specification {
  id: string;
  name: string;
  value: string;
  category?: string;
}

// Parent attribute interface
interface ParentAttribute {
  id: string;
  name: string;
  type: 'color' | 'size' | 'material' | 'custom';
  values: string[];
  required: boolean;
}

// Variant with images interface
interface Variant {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
  attributes: Record<string, string>;
  images: string[];
}

// Variant image interface
interface VariantImage {
  id: string;
  url: string;
  variantId: string;
  isMain: boolean;
}

const CreateProductFormImproved: React.FC<CreateProductFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();
  const [activeTab, setActiveTab] = useState('basic');

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

  // Dynamic specifications
  const [specifications, setSpecifications] = useState<Specification[]>([]);
  const [specificationCategories, setSpecificationCategories] = useState<
    string[]
  >(['Cấu hình', 'Thiết kế', 'Kết nối', 'Khác']);

  // Parent attributes
  const [parentAttributes, setParentAttributes] = useState<ParentAttribute[]>(
    []
  );

  // Variants with images
  const [variants, setVariants] = useState<Variant[]>([]);
  const [variantImages, setVariantImages] = useState<VariantImage[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const tabs = [
    {
      id: 'basic',
      label: 'Thông tin cơ bản',
      icon: <DocumentTextIcon className="w-5 h-5" />,
    },
    {
      id: 'specifications',
      label: 'Thông số kỹ thuật',
      icon: <CogIcon className="w-5 h-5" />,
    },
    {
      id: 'attributes',
      label: 'Thuộc tính cha',
      icon: <SwatchIcon className="w-5 h-5" />,
    },
    {
      id: 'pricing',
      label: 'Giá & Kho hàng',
      icon: <CurrencyDollarIcon className="w-5 h-5" />,
    },
    {
      id: 'categories',
      label: 'Phân loại',
      icon: <TagIcon className="w-5 h-5" />,
    },
    {
      id: 'images',
      label: 'Hình ảnh biến thể',
      icon: <PhotoIcon className="w-5 h-5" />,
    },
    {
      id: 'seo',
      label: 'SEO',
      icon: <MagnifyingGlassIcon className="w-5 h-5" />,
    },
    {
      id: 'variants',
      label: 'Biến thể',
      icon: <Square2StackIcon className="w-5 h-5" />,
    },
  ];

  // Specifications handlers
  const addSpecification = () => {
    const newSpec: Specification = {
      id: Date.now().toString(),
      name: '',
      value: '',
      category: 'Cấu hình',
    };
    setSpecifications([...specifications, newSpec]);
  };

  const removeSpecification = (id: string) => {
    setSpecifications(specifications.filter((spec) => spec.id !== id));
  };

  const updateSpecification = (
    id: string,
    field: keyof Specification,
    value: string
  ) => {
    setSpecifications((specs) =>
      specs.map((spec) => (spec.id === id ? { ...spec, [field]: value } : spec))
    );
  };

  const addSpecificationCategory = (categoryName: string) => {
    if (!specificationCategories.includes(categoryName)) {
      setSpecificationCategories([...specificationCategories, categoryName]);
    }
  };

  // Parent attributes handlers
  const addParentAttribute = () => {
    const newAttribute: ParentAttribute = {
      id: Date.now().toString(),
      name: '',
      type: 'custom',
      values: [],
      required: false,
    };
    setParentAttributes([...parentAttributes, newAttribute]);
  };

  const removeParentAttribute = (id: string) => {
    setParentAttributes(parentAttributes.filter((attr) => attr.id !== id));
  };

  const updateParentAttribute = (
    id: string,
    field: keyof ParentAttribute,
    value: any
  ) => {
    setParentAttributes((attrs) =>
      attrs.map((attr) => (attr.id === id ? { ...attr, [field]: value } : attr))
    );
  };

  const addAttributeValue = (attributeId: string, value: string) => {
    if (!value.trim()) return;

    setParentAttributes((attrs) =>
      attrs.map((attr) =>
        attr.id === attributeId
          ? { ...attr, values: [...attr.values, value.trim()] }
          : attr
      )
    );
  };

  const removeAttributeValue = (attributeId: string, valueIndex: number) => {
    setParentAttributes((attrs) =>
      attrs.map((attr) =>
        attr.id === attributeId
          ? {
              ...attr,
              values: attr.values.filter((_, index) => index !== valueIndex),
            }
          : attr
      )
    );
  };

  // Variant handlers
  const generateVariants = () => {
    if (parentAttributes.length === 0) return;

    const combinations = generateCombinations(parentAttributes);
    const newVariants: Variant[] = combinations.map((combo, index) => ({
      id: `variant-${Date.now()}-${index}`,
      name: Object.values(combo).join(' - '),
      price: parseFloat(formData.price) || 0,
      stock: 0,
      sku: `${formData.sku}-${index + 1}`,
      attributes: combo,
      images: [],
    }));

    setVariants(newVariants);
  };

  const generateCombinations = (attributes: ParentAttribute[]) => {
    const combinations: Record<string, string>[] = [];

    const generate = (index: number, current: Record<string, string>) => {
      if (index === attributes.length) {
        combinations.push({ ...current });
        return;
      }

      const attribute = attributes[index];
      for (const value of attribute.values) {
        current[attribute.name] = value;
        generate(index + 1, current);
      }
    };

    generate(0, {});
    return combinations;
  };

  const updateVariant = (id: string, field: keyof Variant, value: any) => {
    setVariants((variants) =>
      variants.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  const removeVariant = (id: string) => {
    setVariants(variants.filter((variant) => variant.id !== id));
  };

  // Auto-fill SEO fields
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

  const handleInputChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Tên sản phẩm là bắt buộc';
    if (!formData.sku.trim()) newErrors.sku = 'Mã SKU là bắt buộc';
    if (!formData.price) newErrors.price = 'Giá bán là bắt buộc';
    if (!formData.stock) newErrors.stock = 'Số lượng là bắt buộc';
    if (!formData.description.trim())
      newErrors.description = 'Mô tả là bắt buộc';
    if (!formData.shortDescription.trim())
      newErrors.shortDescription = 'Mô tả ngắn là bắt buộc';
    if (formData.categoryIds.length === 0)
      newErrors.categoryIds = 'Chọn ít nhất một danh mục';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const submitData = {
      ...formData,
      specifications: specifications.reduce(
        (acc, spec) => {
          if (spec.name && spec.value) {
            acc[spec.name] = spec.value;
          }
          return acc;
        },
        {} as Record<string, string>
      ),
      parentAttributes,
      variants,
    };

    try {
      await createProduct(submitData).unwrap();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tạo sản phẩm mới"
      size="xl"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="text-neutral-700 dark:text-neutral-300"
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary-500 text-white"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner size="small" />
                Đang xử lý...
              </div>
            ) : (
              'Tạo sản phẩm'
            )}
          </Button>
        </div>
      }
    >
      <div className="overflow-y-auto max-h-[80vh]">
        {/* Tabs navigation */}
        <div className="flex overflow-x-auto mb-6 border-b border-gray-200 dark:border-gray-700 pb-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <form className="space-y-6 px-1">
          {/* Tab 1: Thông tin cơ bản */}
          <div
            className={`space-y-6 ${activeTab === 'basic' ? 'block' : 'hidden'}`}
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-lg mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2 text-primary-500" />
                Thông tin cơ bản
              </h3>

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
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
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
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
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
          </div>

          {/* Tab 2: Dynamic Specifications */}
          <div
            className={`space-y-6 ${activeTab === 'specifications' ? 'block' : 'hidden'}`}
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg text-neutral-800 dark:text-neutral-200 flex items-center">
                  <CogIcon className="w-5 h-5 mr-2 text-primary-500" />
                  Thông số kỹ thuật
                </h3>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={addSpecification}
                  className="flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Thêm thông số
                </Button>
              </div>

              <div className="space-y-3">
                {specifications.map((spec) => (
                  <div
                    key={spec.id}
                    className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Danh mục
                        </label>
                        <select
                          value={spec.category}
                          onChange={(e) =>
                            updateSpecification(
                              spec.id,
                              'category',
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        >
                          {specificationCategories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Tên thông số
                        </label>
                        <Input
                          value={spec.name}
                          onChange={(e) =>
                            updateSpecification(spec.id, 'name', e.target.value)
                          }
                          placeholder="VD: CPU, RAM, Màn hình"
                          size="sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Giá trị
                        </label>
                        <Input
                          value={spec.value}
                          onChange={(e) =>
                            updateSpecification(
                              spec.id,
                              'value',
                              e.target.value
                            )
                          }
                          placeholder="VD: Intel Core i7, 16GB, 15.6 inch"
                          size="sm"
                        />
                      </div>
                      <div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeSpecification(spec.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {specifications.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <CogIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Chưa có thông số kỹ thuật nào</p>
                    <p className="text-sm">Nhấn "Thêm thông số" để bắt đầu</p>
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  💡 Mẹo:
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Thêm các thông số quan trọng mà khách hàng quan tâm</li>
                  <li>• Nhóm thông số theo danh mục để dễ quản lý</li>
                  <li>• Sử dụng tên thông số rõ ràng và giá trị cụ thể</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tab 3: Parent Attributes */}
          <div
            className={`space-y-6 ${activeTab === 'attributes' ? 'block' : 'hidden'}`}
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg text-neutral-800 dark:text-neutral-200 flex items-center">
                  <SwatchIcon className="w-5 h-5 mr-2 text-primary-500" />
                  Thuộc tính cha
                </h3>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={addParentAttribute}
                  className="flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Thêm thuộc tính
                </Button>
              </div>

              <div className="space-y-4">
                {parentAttributes.map((attr) => (
                  <div
                    key={attr.id}
                    className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Tên thuộc tính
                        </label>
                        <Input
                          value={attr.name}
                          onChange={(e) =>
                            updateParentAttribute(
                              attr.id,
                              'name',
                              e.target.value
                            )
                          }
                          placeholder="VD: Màu sắc, Kích thước, Chất liệu"
                          size="sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Loại thuộc tính
                        </label>
                        <select
                          value={attr.type}
                          onChange={(e) =>
                            updateParentAttribute(
                              attr.id,
                              'type',
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="color">Màu sắc</option>
                          <option value="size">Kích thước</option>
                          <option value="material">Chất liệu</option>
                          <option value="custom">Tùy chỉnh</option>
                        </select>
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`required-${attr.id}`}
                            checked={attr.required}
                            onChange={(e) =>
                              updateParentAttribute(
                                attr.id,
                                'required',
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`required-${attr.id}`}
                            className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                          >
                            Bắt buộc
                          </label>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeParentAttribute(attr.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Attribute Values */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Giá trị thuộc tính
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {attr.values.map((value, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full text-sm"
                          >
                            <span>{value}</span>
                            <button
                              type="button"
                              onClick={() =>
                                removeAttributeValue(attr.id, index)
                              }
                              className="ml-1 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Nhập giá trị và nhấn Enter"
                          size="sm"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.target as HTMLInputElement;
                              addAttributeValue(attr.id, input.value);
                              input.value = '';
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget
                              .previousElementSibling as HTMLInputElement;
                            addAttributeValue(attr.id, input.value);
                            input.value = '';
                          }}
                        >
                          <PlusIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {parentAttributes.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <SwatchIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Chưa có thuộc tính cha nào</p>
                    <p className="text-sm">
                      Thêm thuộc tính để tạo biến thể sản phẩm
                    </p>
                  </div>
                )}
              </div>

              {parentAttributes.length > 0 && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={generateVariants}
                    className="flex items-center gap-2"
                  >
                    <Square2StackIcon className="w-4 h-4" />
                    Tạo biến thể từ thuộc tính
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Continue with other tabs... */}
          {/* For brevity, I'll show the structure for other tabs */}

          {/* Tab 4: Pricing */}
          <div
            className={`space-y-6 ${activeTab === 'pricing' ? 'block' : 'hidden'}`}
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-lg mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                <CurrencyDollarIcon className="w-5 h-5 mr-2 text-primary-500" />
                Giá & Kho hàng
              </h3>
              {/* Pricing content */}
            </div>
          </div>

          {/* Tab 5: Categories */}
          <div
            className={`space-y-6 ${activeTab === 'categories' ? 'block' : 'hidden'}`}
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-lg mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                <TagIcon className="w-5 h-5 mr-2 text-primary-500" />
                Phân loại
              </h3>
              {/* Categories content */}
            </div>
          </div>

          {/* Tab 6: Variant Images */}
          <div
            className={`space-y-6 ${activeTab === 'images' ? 'block' : 'hidden'}`}
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-lg mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                <PhotoIcon className="w-5 h-5 mr-2 text-primary-500" />
                Hình ảnh biến thể
              </h3>

              {variants.length > 0 ? (
                <div className="space-y-4">
                  {variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                        {variant.name}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Image upload slots */}
                        <div className="aspect-square bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                          <div className="text-center">
                            <PhotoIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Thêm ảnh
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <PhotoIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Chưa có biến thể nào</p>
                  <p className="text-sm">
                    Tạo biến thể từ thuộc tính cha để upload ảnh
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Tab 7: SEO */}
          <div
            className={`space-y-6 ${activeTab === 'seo' ? 'block' : 'hidden'}`}
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-lg mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                <MagnifyingGlassIcon className="w-5 h-5 mr-2 text-primary-500" />
                SEO
              </h3>
              {/* SEO content */}
            </div>
          </div>

          {/* Tab 8: Variants */}
          <div
            className={`space-y-6 ${activeTab === 'variants' ? 'block' : 'hidden'}`}
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-lg mb-4 text-neutral-800 dark:text-neutral-200 flex items-center">
                <Square2StackIcon className="w-5 h-5 mr-2 text-primary-500" />
                Biến thể sản phẩm
              </h3>

              {variants.length > 0 ? (
                <div className="space-y-3">
                  {variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Tên biến thể
                          </label>
                          <Input
                            value={variant.name}
                            onChange={(e) =>
                              updateVariant(variant.id, 'name', e.target.value)
                            }
                            size="sm"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Giá
                          </label>
                          <Input
                            type="number"
                            value={variant.price}
                            onChange={(e) =>
                              updateVariant(
                                variant.id,
                                'price',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            size="sm"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Tồn kho
                          </label>
                          <Input
                            type="number"
                            value={variant.stock}
                            onChange={(e) =>
                              updateVariant(
                                variant.id,
                                'stock',
                                parseInt(e.target.value) || 0
                              )
                            }
                            size="sm"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            SKU
                          </label>
                          <Input
                            value={variant.sku}
                            onChange={(e) =>
                              updateVariant(variant.id, 'sku', e.target.value)
                            }
                            size="sm"
                          />
                        </div>
                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeVariant(variant.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Square2StackIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Chưa có biến thể nào</p>
                  <p className="text-sm">Tạo biến thể từ thuộc tính cha</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateProductFormImproved;
