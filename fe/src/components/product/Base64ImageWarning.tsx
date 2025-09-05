import React from 'react';
import { Alert } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { countBase64Images } from '@/utils/descriptionImageProcessor';

interface Base64ImageWarningProps {
  description: string;
  className?: string;
}

const Base64ImageWarning: React.FC<Base64ImageWarningProps> = ({
  description,
  className,
}) => {
  const base64Count = countBase64Images(description);

  if (base64Count === 0) {
    return null;
  }

  return (
    <Alert
      message="Phát hiện ảnh Base64 trong mô tả"
      description={
        <div>
          <p>
            Tìm thấy <strong>{base64Count}</strong> ảnh dạng base64 trong mô tả
            sản phẩm.
          </p>
          <p>
            ✅ <strong>Khi submit form</strong>, các ảnh này sẽ được tự động
            convert thành file và upload lên server.
          </p>
          <p>
            💡 <strong>Khuyến nghị:</strong> Sử dụng nút "Thêm ảnh" trong editor
            để upload trực tiếp thay vì paste ảnh base64.
          </p>
        </div>
      }
      type="info"
      icon={<InfoCircleOutlined />}
      showIcon
      className={className}
      style={{
        marginBottom: '16px',
        border: '1px solid #1890ff',
        backgroundColor: '#f6ffed',
      }}
    />
  );
};

export default Base64ImageWarning;
