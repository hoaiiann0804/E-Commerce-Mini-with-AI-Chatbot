import React, { useState } from 'react';
import {
  Card,
  Typography,
  Button,
  Tree,
  Space,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  ColorPicker,
  Upload,
  message,
  Popconfirm,
  Alert,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
  TagOutlined,
  UploadOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import {
  useGetAttributeGroupsQuery,
  useCreateAttributeGroupMutation,
  useUpdateAttributeGroupMutation,
  useDeleteAttributeGroupMutation,
  useAddAttributeValueMutation,
  useUpdateAttributeValueMutation,
  useDeleteAttributeValueMutation,
  AttributeGroup,
  AttributeValue,
} from '@/services/attributeApi';

const { Title, Text } = Typography;
const { Option } = Select;

interface HierarchicalAttributesFormProps {
  onAttributeGroupsChange?: (groups: AttributeGroup[]) => void;
}

const HierarchicalAttributesForm: React.FC<HierarchicalAttributesFormProps> = ({
  onAttributeGroupsChange,
}) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'group' | 'value'>('group');
  const [editingItem, setEditingItem] = useState<
    AttributeGroup | AttributeValue | null
  >(null);
  const [selectedGroup, setSelectedGroup] = useState<AttributeGroup | null>(
    null
  );
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  // API hooks
  const {
    data: attributeGroupsData,
    isLoading,
    refetch,
  } = useGetAttributeGroupsQuery();
  const [createAttributeGroup] = useCreateAttributeGroupMutation();
  const [updateAttributeGroup] = useUpdateAttributeGroupMutation();
  const [deleteAttributeGroup] = useDeleteAttributeGroupMutation();
  const [addAttributeValue] = useAddAttributeValueMutation();
  const [updateAttributeValue] = useUpdateAttributeValueMutation();
  const [deleteAttributeValue] = useDeleteAttributeValueMutation();

  const attributeGroups = attributeGroupsData?.data || [];

  // Handle create/edit group
  const handleCreateGroup = () => {
    setModalType('group');
    setEditingItem(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEditGroup = (group: AttributeGroup) => {
    setModalType('group');
    setEditingItem(group);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: group.name,
      description: group.description,
      type: group.type,
      isRequired: group.isRequired,
      sortOrder: group.sortOrder,
    });
  };

  // Handle create/edit value
  const handleCreateValue = (group: AttributeGroup) => {
    setModalType('value');
    setEditingItem(null);
    setSelectedGroup(group);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEditValue = (value: AttributeValue, group: AttributeGroup) => {
    setModalType('value');
    setEditingItem(value);
    setSelectedGroup(group);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: value.name,
      value: value.value,
      colorCode: value.colorCode,
      priceAdjustment: value.priceAdjustment,
      sortOrder: value.sortOrder,
    });
  };

  // Handle submit modal
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (modalType === 'group') {
        if (editingItem) {
          // Update group
          await updateAttributeGroup({
            id: editingItem.id,
            data: values,
          }).unwrap();
          message.success('Cập nhật nhóm thuộc tính thành công!');
        } else {
          // Create group
          await createAttributeGroup(values).unwrap();
          message.success('Tạo nhóm thuộc tính thành công!');
        }
      } else {
        if (editingItem) {
          // Update value
          await updateAttributeValue({
            id: editingItem.id,
            data: values,
          }).unwrap();
          message.success('Cập nhật giá trị thuộc tính thành công!');
        } else {
          // Create value
          await addAttributeValue({
            attributeGroupId: selectedGroup!.id,
            data: values,
          }).unwrap();
          message.success('Thêm giá trị thuộc tính thành công!');
        }
      }

      setIsModalVisible(false);
      refetch();
      onAttributeGroupsChange?.(attributeGroups);
    } catch (error: any) {
      message.error(error?.data?.message || 'Có lỗi xảy ra!');
    }
  };

  // Handle delete
  const handleDeleteGroup = async (groupId: string) => {
    try {
      await deleteAttributeGroup(groupId).unwrap();
      message.success('Xóa nhóm thuộc tính thành công!');
      refetch();
      onAttributeGroupsChange?.(attributeGroups);
    } catch (error: any) {
      message.error(error?.data?.message || 'Có lỗi xảy ra!');
    }
  };

  const handleDeleteValue = async (valueId: string) => {
    try {
      await deleteAttributeValue(valueId).unwrap();
      message.success('Xóa giá trị thuộc tính thành công!');
      refetch();
      onAttributeGroupsChange?.(attributeGroups);
    } catch (error: any) {
      message.error(error?.data?.message || 'Có lỗi xảy ra!');
    }
  };

  // Build tree data
  const buildTreeData = () => {
    return attributeGroups.map((group) => ({
      key: `group-${group.id}`,
      title: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Space>
            <FolderOutlined />
            <Text strong>{group.name}</Text>
            <Text type="secondary">({group.type})</Text>
            {group.isRequired && <Text type="danger">*</Text>}
          </Space>
          <Space>
            <Button
              size="small"
              icon={<PlusOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleCreateValue(group);
              }}
            >
              Thêm giá trị
            </Button>
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleEditGroup(group);
              }}
            />
            <Popconfirm
              title="Xóa nhóm thuộc tính?"
              description="Bạn có chắc chắn muốn xóa nhóm thuộc tính này?"
              onConfirm={(e) => {
                e?.stopPropagation();
                handleDeleteGroup(group.id);
              }}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => e.stopPropagation()}
              />
            </Popconfirm>
          </Space>
        </div>
      ),
      children: group.values?.map((value) => ({
        key: `value-${value.id}`,
        title: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Space>
              <TagOutlined />
              <Text>{value.name}</Text>
              <Text type="secondary">({value.value})</Text>
              {value.colorCode && (
                <div
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: value.colorCode,
                    border: '1px solid #d9d9d9',
                    borderRadius: 2,
                  }}
                />
              )}
              {value.priceAdjustment !== 0 && (
                <Text type={value.priceAdjustment > 0 ? 'success' : 'danger'}>
                  {value.priceAdjustment > 0 ? '+' : ''}
                  {value.priceAdjustment.toLocaleString()}đ
                </Text>
              )}
            </Space>
            <Space>
              <Button
                size="small"
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditValue(value, group);
                }}
              />
              <Popconfirm
                title="Xóa giá trị thuộc tính?"
                description="Bạn có chắc chắn muốn xóa giá trị thuộc tính này?"
                onConfirm={(e) => {
                  e?.stopPropagation();
                  handleDeleteValue(value.id);
                }}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => e.stopPropagation()}
                />
              </Popconfirm>
            </Space>
          </div>
        ),
      })),
    }));
  };

  return (
    <Card>
      <Title level={4}>
        <FolderOutlined /> Thuộc tính phân cấp
      </Title>

      <Alert
        message="Thông tin"
        description="Tạo nhóm thuộc tính cha (như Màu sắc, Cấu hình) và thêm các giá trị con vào mỗi nhóm. Các thuộc tính này sẽ được sử dụng để tạo biến thể sản phẩm."
        type="info"
        showIcon
        icon={<InfoCircleOutlined />}
        style={{ marginBottom: 16 }}
      />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreateGroup}
        style={{ marginBottom: 16 }}
      >
        Tạo nhóm thuộc tính
      </Button>

      <Spin spinning={isLoading}>
        {attributeGroups.length > 0 ? (
          <Tree
            showLine
            defaultExpandAll
            expandedKeys={expandedKeys}
            onExpand={setExpandedKeys}
            treeData={buildTreeData()}
          />
        ) : (
          <Card style={{ textAlign: 'center', padding: '40px 0' }}>
            <Text type="secondary">
              Chưa có nhóm thuộc tính nào. Nhấn nút "Tạo nhóm thuộc tính" để bắt
              đầu.
            </Text>
          </Card>
        )}
      </Spin>

      {/* Modal for creating/editing */}
      <Modal
        title={
          modalType === 'group'
            ? editingItem
              ? 'Sửa nhóm thuộc tính'
              : 'Tạo nhóm thuộc tính'
            : editingItem
              ? 'Sửa giá trị thuộc tính'
              : 'Thêm giá trị thuộc tính'
        }
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText={editingItem ? 'Cập nhật' : 'Tạo'}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          {modalType === 'group' ? (
            // Group form
            <>
              <Form.Item
                name="name"
                label="Tên nhóm"
                rules={[{ required: true, message: 'Vui lòng nhập tên nhóm!' }]}
              >
                <Input placeholder="Ví dụ: Màu sắc, Cấu hình..." />
              </Form.Item>

              <Form.Item name="description" label="Mô tả">
                <Input.TextArea placeholder="Mô tả về nhóm thuộc tính..." />
              </Form.Item>

              <Form.Item
                name="type"
                label="Loại thuộc tính"
                rules={[{ required: true, message: 'Vui lòng chọn loại!' }]}
              >
                <Select placeholder="Chọn loại thuộc tính">
                  <Option value="color">Màu sắc</Option>
                  <Option value="config">Cấu hình</Option>
                  <Option value="storage">Dung lượng</Option>
                  <Option value="size">Kích thước</Option>
                  <Option value="custom">Tùy chỉnh</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="isRequired"
                label="Bắt buộc"
                initialValue={false}
              >
                <Select>
                  <Option value={true}>Có</Option>
                  <Option value={false}>Không</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="sortOrder"
                label="Thứ tự sắp xếp"
                initialValue={0}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </>
          ) : (
            // Value form
            <>
              <Form.Item
                name="name"
                label="Tên giá trị"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên giá trị!' },
                ]}
              >
                <Input placeholder="Ví dụ: Đen, Trắng, i7/16GB/512GB..." />
              </Form.Item>

              <Form.Item
                name="value"
                label="Giá trị"
                rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
              >
                <Input placeholder="Ví dụ: black, white, i7-16gb-512gb..." />
              </Form.Item>

              {selectedGroup?.type === 'color' && (
                <Form.Item name="colorCode" label="Mã màu">
                  <Input placeholder="#FF0000" />
                </Form.Item>
              )}

              <Form.Item
                name="priceAdjustment"
                label="Điều chỉnh giá"
                initialValue={0}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="0"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Form.Item
                name="sortOrder"
                label="Thứ tự sắp xếp"
                initialValue={0}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </Card>
  );
};

export default HierarchicalAttributesForm;
