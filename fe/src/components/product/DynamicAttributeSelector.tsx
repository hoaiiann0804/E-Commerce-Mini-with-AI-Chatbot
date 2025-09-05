import React, { useState, useEffect } from 'react';
import {
  Form,
  Select,
  Row,
  Col,
  Card,
  Typography,
  Space,
  Tag,
  Alert,
  Skeleton,
  Button,
  Switch,
  Tooltip,
} from 'antd';
import {
  BulbOutlined,
  SettingOutlined,
  EyeOutlined,
  SyncOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { attributeService } from '@/services/attributeService';
import DynamicProductName from './DynamicProductName';

const { Option } = Select;
const { Text, Title } = Typography;

interface AttributeGroup {
  id: string;
  name: string;
  description?: string;
  type: string;
  isRequired: boolean;
  sortOrder: number;
  values: AttributeValue[];
}

interface AttributeValue {
  id: string;
  name: string;
  value: string;
  colorCode?: string;
  imageUrl?: string;
  priceAdjustment: number;
  sortOrder: number;
  isActive: boolean;
  affectsName: boolean;
  nameTemplate?: string;
}

interface DynamicAttributeSelectorProps {
  productId?: string;
  baseName?: string;
  onAttributeChange?: (
    attributeValues: Record<string, string>,
    affectingNameOnly: Record<string, string>
  ) => void;
  onNameGenerated?: (name: string, details: any) => void;
  disabled?: boolean;
  showNamePreview?: boolean;
}

const DynamicAttributeSelector: React.FC<DynamicAttributeSelectorProps> = ({
  productId,
  baseName,
  onAttributeChange,
  onNameGenerated,
  disabled = false,
  showNamePreview = true,
}) => {
  const [loading, setLoading] = useState(true);
  const [attributeGroups, setAttributeGroups] = useState<AttributeGroup[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [nameAffectingAttributes, setNameAffectingAttributes] = useState<
    AttributeValue[]
  >([]);
  const [showOnlyNameAffecting, setShowOnlyNameAffecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = Form.useFormInstance();

  // Load attribute groups
  useEffect(() => {
    loadAttributeGroups();
    loadNameAffectingAttributes();
  }, []);

  const loadAttributeGroups = async () => {
    try {
      setLoading(true);
      const response = await attributeService.getAttributeGroups();
      if (response.success) {
        setAttributeGroups(response.data);
      }
    } catch (err: any) {
      setError('Failed to load attribute groups');
      console.error('Error loading attribute groups:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadNameAffectingAttributes = async () => {
    try {
      const response =
        await attributeService.getNameAffectingAttributes(productId);
      if (response.success) {
        setNameAffectingAttributes(response.data);
      }
    } catch (err: any) {
      console.error('Error loading name affecting attributes:', err);
    }
  };

  const handleAttributeChange = (groupId: string, valueId: string) => {
    const newSelectedAttributes = {
      ...selectedAttributes,
      [groupId]: valueId,
    };

    setSelectedAttributes(newSelectedAttributes);

    // Filter attributes that affect names
    const affectingNameOnly: Record<string, string> = {};
    Object.entries(newSelectedAttributes).forEach(([gId, vId]) => {
      if (vId) {
        const isAffectingName = nameAffectingAttributes.some(
          (attr) => attr.id === vId
        );
        if (isAffectingName) {
          affectingNameOnly[gId] = vId;
        }
      }
    });

    // Notify parent component
    if (onAttributeChange) {
      onAttributeChange(newSelectedAttributes, affectingNameOnly);
    }
  };

  const getAttributesByType = (type: string) => {
    return attributeGroups.filter((group) => group.type === type);
  };

  const getVisibleAttributeGroups = () => {
    if (showOnlyNameAffecting) {
      return attributeGroups.filter((group) =>
        group.values.some((value) => value.affectsName)
      );
    }
    return attributeGroups;
  };

  const getAttributeValueInfo = (valueId: string) => {
    for (const group of attributeGroups) {
      const value = group.values.find((v) => v.id === valueId);
      if (value) {
        return { value, group };
      }
    }
    return null;
  };

  const renderAttributeValue = (value: AttributeValue, groupType: string) => {
    const isNameAffecting = value.affectsName;

    return (
      <Option key={value.id} value={value.id}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <span>
            {value.name}
            {value.priceAdjustment !== 0 && (
              <Text type="secondary" style={{ marginLeft: 8 }}>
                {value.priceAdjustment > 0 ? '+' : ''}
                {value.priceAdjustment.toLocaleString()} VNĐ
              </Text>
            )}
          </span>
          {isNameAffecting && (
            <Tooltip
              title={`Ảnh hưởng tên: ${value.nameTemplate || value.name}`}
            >
              <Tag color="blue" size="small">
                {value.nameTemplate || 'NAME'}
              </Tag>
            </Tooltip>
          )}
        </Space>
      </Option>
    );
  };

  if (loading) {
    return (
      <Card title="Thuộc tính sản phẩm">
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>
    );
  }

  if (error) {
    return (
      <Alert
        message="Lỗi tải thuộc tính"
        description={error}
        type="error"
        closable
        action={
          <Button size="small" onClick={loadAttributeGroups}>
            Thử lại
          </Button>
        }
      />
    );
  }

  const visibleGroups = getVisibleAttributeGroups();
  const nameAffectingCount = nameAffectingAttributes.length;
  const selectedNameAffecting = Object.values(selectedAttributes).filter(
    (valueId) => nameAffectingAttributes.some((attr) => attr.id === valueId)
  ).length;

  return (
    <div>
      {/* Control Panel */}
      <Card
        size="small"
        style={{ marginBottom: 16 }}
        title={
          <Space>
            <SettingOutlined />
            <span>Cấu hình thuộc tính</span>
            <Tag color="blue">
              {nameAffectingCount} thuộc tính ảnh hưởng tên
            </Tag>
          </Space>
        }
        extra={
          <Space>
            <span style={{ fontSize: '12px', color: '#666' }}>
              Chỉ xem thuộc tính ảnh hưởng tên:
            </span>
            <Switch
              size="small"
              checked={showOnlyNameAffecting}
              onChange={setShowOnlyNameAffecting}
            />
          </Space>
        }
      >
        {nameAffectingCount > 0 && (
          <Alert
            message={`Tìm thấy ${nameAffectingCount} thuộc tính có thể ảnh hưởng đến tên sản phẩm`}
            description={`Đã chọn ${selectedNameAffecting} thuộc tính. Tên sản phẩm sẽ được cập nhật tự động.`}
            type="info"
            icon={<BulbOutlined />}
            style={{ marginBottom: 12 }}
          />
        )}
      </Card>

      {/* Dynamic Name Preview */}
      {showNamePreview && baseName && (
        <DynamicProductName
          baseName={baseName}
          selectedAttributes={selectedAttributes}
          productId={productId}
          onNameGenerated={onNameGenerated}
          disabled={disabled}
        />
      )}

      {/* Attribute Groups */}
      <Card title={`Chọn thuộc tính (${visibleGroups.length} nhóm)`}>
        <Row gutter={[16, 16]}>
          {visibleGroups.map((group) => (
            <Col span={12} key={group.id}>
              <Form.Item
                label={
                  <Space>
                    <span>{group.name}</span>
                    {group.isRequired && <Text type="danger">*</Text>}
                    {group.values.some((v) => v.affectsName) && (
                      <Tooltip title="Nhóm thuộc tính này có ảnh hưởng đến tên sản phẩm">
                        <Tag color="blue" size="small">
                          <BulbOutlined style={{ fontSize: 10 }} />
                        </Tag>
                      </Tooltip>
                    )}
                  </Space>
                }
                extra={
                  group.description && (
                    <Tooltip title={group.description}>
                      <InfoCircleOutlined style={{ color: '#1890ff' }} />
                    </Tooltip>
                  )
                }
              >
                <Select
                  placeholder={`Chọn ${group.name.toLowerCase()}`}
                  allowClear
                  value={selectedAttributes[group.id]}
                  onChange={(value) => handleAttributeChange(group.id, value)}
                  disabled={disabled}
                  style={{ width: '100%' }}
                  showSearch
                  optionFilterProp="children"
                  notFoundContent="Không tìm thấy thuộc tính"
                >
                  {group.values
                    .filter((value) => value.isActive)
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((value) => renderAttributeValue(value, group.type))}
                </Select>
              </Form.Item>
            </Col>
          ))}
        </Row>

        {visibleGroups.length === 0 && (
          <Alert
            message="Chưa có thuộc tính"
            description="Chưa có nhóm thuộc tính nào được cấu hình cho sản phẩm này."
            type="warning"
            showIcon
          />
        )}
      </Card>

      {/* Selected Attributes Summary */}
      {Object.keys(selectedAttributes).length > 0 && (
        <Card
          title="Thuộc tính đã chọn"
          size="small"
          style={{ marginTop: 16 }}
          extra={
            <Button
              type="link"
              size="small"
              onClick={() => setSelectedAttributes({})}
            >
              Xóa tất cả
            </Button>
          }
        >
          <Space wrap>
            {Object.entries(selectedAttributes).map(([groupId, valueId]) => {
              if (!valueId) return null;
              const info = getAttributeValueInfo(valueId);
              if (!info) return null;

              const isNameAffecting = info.value.affectsName;

              return (
                <Tag
                  key={`${groupId}-${valueId}`}
                  color={isNameAffecting ? 'blue' : 'default'}
                  closable
                  onClose={() => handleAttributeChange(groupId, '')}
                >
                  <Space size="small">
                    <span>{info.group.name}:</span>
                    <strong>{info.value.name}</strong>
                    {isNameAffecting && info.value.nameTemplate && (
                      <Text code style={{ fontSize: 10 }}>
                        {info.value.nameTemplate}
                      </Text>
                    )}
                  </Space>
                </Tag>
              );
            })}
          </Space>
        </Card>
      )}
    </div>
  );
};

export default DynamicAttributeSelector;
