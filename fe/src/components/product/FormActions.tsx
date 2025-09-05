import React from 'react';
import { Button, Space } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

interface FormActionsProps {
  isFormValid: boolean;
  isSubmitting: boolean;
  submitText: string;
  loadingText: string;
  onCancel: () => void;
  visible?: boolean; // Thêm prop để kiểm soát hiển thị
}

const FormActions: React.FC<FormActionsProps> = ({
  isFormValid,
  isSubmitting,
  submitText,
  loadingText,
  onCancel,
  visible = true, // Mặc định là hiển thị
}) => {
  // Nếu không hiển thị, trả về null
  if (!visible) {
    return null;
  }

  return (
    <div style={{ textAlign: 'right' }}>
      <Space>
        <Button onClick={onCancel} size="large" style={{ minWidth: 120 }}>
          Hủy
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
          size="large"
          loading={isSubmitting}
          disabled={isSubmitting}
          style={{
            minWidth: 150,
          }}
        >
          {isSubmitting ? loadingText : submitText}
        </Button>
      </Space>
    </div>
  );
};

export default FormActions;
