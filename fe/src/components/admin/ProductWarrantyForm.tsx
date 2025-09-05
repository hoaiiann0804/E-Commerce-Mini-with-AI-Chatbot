import React from 'react';
import { Card, Checkbox, Space, Typography, Tag, Tooltip, Empty } from 'antd';
import {
  SafetyOutlined,
  DollarOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useGetWarrantyPackagesQuery } from '@/services/warrantyApi';
import { useProductFormContext } from '@/contexts/ProductFormContext';

const { Title, Text } = Typography;

const ProductWarrantyForm: React.FC = () => {
  const { formData, updateFormData } = useProductFormContext();
  const { data: warrantyPackagesData, isLoading } = useGetWarrantyPackagesQuery(
    { isActive: true }
  );

  const warrantyPackages = warrantyPackagesData?.data?.warrantyPackages || [];
  const selectedWarranties = formData.warrantyPackageIds || [];

  const handleWarrantyChange = (packageId: string, checked: boolean) => {
    let newSelectedWarranties = [...selectedWarranties];

    if (checked) {
      if (!newSelectedWarranties.includes(packageId)) {
        newSelectedWarranties.push(packageId);
      }
    } else {
      newSelectedWarranties = newSelectedWarranties.filter(
        (id) => id !== packageId
      );
    }

    updateFormData({ warrantyPackageIds: newSelectedWarranties });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getTotalWarrantyPrice = () => {
    return warrantyPackages
      .filter((pkg) => selectedWarranties.includes(pkg.id))
      .reduce((total, pkg) => total + pkg.price, 0);
  };

  if (isLoading) {
    return (
      <Card>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    );
  }

  if (warrantyPackages.length === 0) {
    return (
      <Card>
        <Empty
          description="Chưa có gói bảo hành nào"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-6">
        <Title level={4} className="flex items-center gap-2 mb-2">
          <SafetyOutlined className="text-blue-500" />
          Gói bảo hành
        </Title>
        <Text type="secondary">
          Chọn các gói bảo hành có sẵn cho sản phẩm này
        </Text>
      </div>

      <div className="space-y-4">
        {warrantyPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`border rounded-lg p-4 transition-all duration-200 ${
              selectedWarranties.includes(pkg.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Checkbox
                  checked={selectedWarranties.includes(pkg.id)}
                  onChange={(e) =>
                    handleWarrantyChange(pkg.id, e.target.checked)
                  }
                  disabled={pkg.price === 0} // Basic warranty always selected
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Text strong>{pkg.name}</Text>
                    {pkg.price === 0 && <Tag color="blue">Mặc định</Tag>}
                  </div>

                  <Text type="secondary" className="block mb-2">
                    {pkg.description}
                  </Text>

                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <CalendarOutlined className="text-gray-500" />
                      <Text type="secondary">{pkg.durationMonths} tháng</Text>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarOutlined className="text-gray-500" />
                      <Text type="secondary">
                        {pkg.price === 0 ? 'Miễn phí' : formatPrice(pkg.price)}
                      </Text>
                    </div>
                  </div>

                  {pkg.coverage && pkg.coverage.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <InfoCircleOutlined className="text-blue-500" />
                        <Text type="secondary" className="text-sm">
                          Quyền lợi:
                        </Text>
                      </div>
                      <div className="ml-4">
                        {pkg.coverage.slice(0, 3).map((item, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            • {item}
                          </div>
                        ))}
                        {pkg.coverage.length > 3 && (
                          <div className="text-sm text-gray-500">
                            +{pkg.coverage.length - 3} quyền lợi khác
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <Text strong>
              Đã chọn: {selectedWarranties.length} gói bảo hành
            </Text>
          </div>
          <div>
            <Text type="secondary">Tổng giá trị: </Text>
            <Text strong className="text-blue-600">
              {formatPrice(getTotalWarrantyPrice())}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductWarrantyForm;
