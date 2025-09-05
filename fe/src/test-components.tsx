import React from 'react';
import { Form } from 'antd';
import EnhancedRichTextEditor from './components/common/EnhancedRichTextEditor';
import Base64ImageWarning from './components/product/Base64ImageWarning';

const TestComponents: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Components</h1>

      <h2>EnhancedRichTextEditor</h2>
      <Form form={form}>
        <Form.Item name="description">
          <EnhancedRichTextEditor
            placeholder="Test editor..."
            height={200}
            category="product"
          />
        </Form.Item>
      </Form>

      <h2>Base64ImageWarning</h2>
      <Base64ImageWarning description="<img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...' />" />
    </div>
  );
};

export default TestComponents;
