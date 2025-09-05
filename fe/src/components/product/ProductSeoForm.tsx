import React from 'react';
import { Form, Input, Row, Col, Alert } from 'antd';

const { TextArea } = Input;

const ProductSeoForm: React.FC = () => {
  return (
    <Row gutter={[24, 16]}>
      <Col span={24}>
        <Form.Item name="seoTitle" label="Tiêu đề SEO">
          <Input
            placeholder="Tiêu đề hiển thị trên search engine"
            maxLength={60}
            showCount
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="seoDescription" label="Mô tả SEO">
          <TextArea
            rows={3}
            placeholder="Mô tả ngắn hiển thị trên search engine"
            maxLength={160}
            showCount
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="seoKeywords" label="Từ khóa SEO">
          <TextArea
            rows={2}
            placeholder="Các từ khóa SEO, cách nhau bằng dấu phẩy"
            maxLength={200}
            showCount
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Alert
          message="Tối ưu SEO"
          description={
            <div>
              <p>• Tiêu đề SEO nên từ 50-60 ký tự</p>
              <p>• Mô tả SEO nên từ 150-160 ký tự</p>
              <p>• Sử dụng từ khóa liên quan đến sản phẩm</p>
              <p>• Hệ thống sẽ tự tạo nếu để trống</p>
            </div>
          }
          type="info"
          showIcon
        />
      </Col>
    </Row>
  );
};

export default ProductSeoForm;
