import { useState } from 'react';
import { ProductAttribute } from '@/types/product';

export const useProductAttributes = (
  initialAttributes: ProductAttribute[] = []
) => {
  const [attributes, setAttributes] =
    useState<ProductAttribute[]>(initialAttributes);
  const [attributeModalVisible, setAttributeModalVisible] = useState(false);
  const [editingAttribute, setEditingAttribute] =
    useState<ProductAttribute | null>(null);

  // Attribute handlers
  const handleAddAttribute = (attribute: ProductAttribute) => {
    console.log('handleAddAttribute called with:', attribute);

    if (editingAttribute) {
      // Cập nhật thuộc tính đã tồn tại
      const updatedAttributes = attributes.map((attr) =>
        attr.id === editingAttribute.id
          ? { ...attribute, id: editingAttribute.id }
          : attr
      );
      console.log(
        'Updating existing attribute. New attributes array:',
        updatedAttributes
      );
      setAttributes(updatedAttributes);
    } else {
      // Thêm thuộc tính mới
      const newId = `attr-${attributes.length}-${Math.random().toString(36).substring(2, 9)}`;
      const newAttributes = [
        ...attributes,
        { ...attribute, id: attribute.id || newId },
      ];
      console.log('Adding new attribute. New attributes array:', newAttributes);
      setAttributes(newAttributes);
    }

    // Lưu vào localStorage để debug
    localStorage.setItem('current_attributes', JSON.stringify(attributes));

    setAttributeModalVisible(false);
    setEditingAttribute(null);
  };

  const handleDeleteAttribute = (id: string) => {
    setAttributes(attributes.filter((attr) => attr.id !== id));
  };

  const openAttributeModal = (attribute?: ProductAttribute) => {
    setEditingAttribute(attribute || null);
    setAttributeModalVisible(true);
  };

  const closeAttributeModal = () => {
    setAttributeModalVisible(false);
    setEditingAttribute(null);
  };

  return {
    attributes,
    setAttributes,
    attributeModalVisible,
    editingAttribute,
    handleAddAttribute,
    handleDeleteAttribute,
    openAttributeModal,
    closeAttributeModal,
  };
};
