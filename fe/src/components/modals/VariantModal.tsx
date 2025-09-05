import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';

interface Attribute {
  id: string;
  name: string;
  value: string;
}

interface Variant {
  id?: string;
  name: string;
  price: number;
  stock: number;
  sku?: string;
  attributes?: Record<string, string>;
  value?: string;
}

interface VariantModalProps {
  visible: boolean;
  onClose: () => void;
  variant?: Variant | null;
  onSave: (variant: Variant) => void;
  attributes: Attribute[];
}

const VariantModal: React.FC<VariantModalProps> = ({
  visible,
  onClose,
  variant,
  onSave,
  attributes,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (variant) {
      form.setFieldsValue({
        name: variant.name || '',
        price: variant.price || 0,
        stock: variant.stock || 0,
        sku: variant.sku || '',
        ...variant.attributes,
      });
    } else {
      form.resetFields();
    }
  }, [variant, form, visible]);

  const handleSubmit = (values: any) => {
    const { name, price, stock, sku, ...attributeValues } = values;

    // Lọc ra các thuộc tính có giá trị (không null/undefined)
    const filteredAttributes: Record<string, string> = {};
    Object.keys(attributeValues).forEach((key) => {
      if (
        attributeValues[key] !== undefined &&
        attributeValues[key] !== null &&
        attributeValues[key] !== ''
      ) {
        filteredAttributes[key] = attributeValues[key];
      }
    });

    const variantData: Variant = {
      id: variant?.id,
      name: name.trim(),
      price: price || 0,
      stock: stock || 0,
      sku: sku ? sku.trim() : '',
      attributes: filteredAttributes,
    };

    console.log('Saving variant:', variantData);
    onSave(variantData);
    handleClose();
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={variant ? '🎭 Chỉnh sửa biến thể' : '🎭 Thêm biến thể mới'}
      open={visible}
      onCancel={handleClose}
      footer={null}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: '',
          price: 0,
          stock: 0,
          sku: '',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          <Form.Item
            label="🏷️ Tên biến thể"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên biến thể' }]}
          >
            <Input placeholder="VD: Size M - Màu Đỏ" />
          </Form.Item>

          <Form.Item
            label="📦 Mã SKU"
            name="sku"
            tooltip="Để trống để hệ thống tự tạo mã SKU"
          >
            <Input placeholder="Để trống để tự tạo" />
          </Form.Item>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          <Form.Item
            label="💰 Giá (VNĐ)"
            name="price"
            rules={[
              { required: true, message: 'Vui lòng nhập giá' },
              { type: 'number', min: 0, message: 'Giá phải lớn hơn 0' },
            ]}
          >
            <InputNumber
              placeholder="1,000,000"
              min={0}
              step={1000}
              style={{ width: '100%' }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              addonAfter="₫"
            />
          </Form.Item>

          <Form.Item
            label="📦 Số lượng tồn kho"
            name="stock"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng' },
              { type: 'number', min: 0, message: 'Số lượng không được âm' },
            ]}
          >
            <InputNumber
              placeholder="50"
              min={0}
              style={{ width: '100%' }}
              addonAfter="sp"
            />
          </Form.Item>
        </div>

        {/* Thuộc tính biến thể */}
        {attributes.length > 0 && (
          <div
            style={{
              borderTop: '1px solid #f0f0f0',
              paddingTop: '16px',
              marginTop: '16px',
            }}
          >
            <h3 style={{ marginBottom: '16px' }}>🎨 Thuộc tính biến thể</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              {attributes.map((attr) => {
                // Kiểm tra attr.value có tồn tại không trước khi gọi split
                const values = attr.value
                  ? attr.value
                      .split(',')
                      .map((v) => v.trim())
                      .filter((v) => v)
                  : [];
                return (
                  <Form.Item key={attr.id} label={attr.name} name={attr.name}>
                    <Select placeholder={`Chọn ${attr.name}`} allowClear>
                      {values.map((value) => (
                        <Select.Option key={value} value={value}>
                          {value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                );
              })}
            </div>
          </div>
        )}

        {/* Submit buttons */}
        <div style={{ textAlign: 'right', marginTop: '24px' }}>
          <Space>
            <Button onClick={handleClose} icon={<CloseOutlined />}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              {variant ? 'Cập nhật biến thể' : 'Thêm biến thể'}
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default VariantModal;
