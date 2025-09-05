import React, { useState, useEffect } from 'react';
import { Typography, Space, Tag, Button } from 'antd';
import { BulbOutlined, ReloadOutlined } from '@ant-design/icons';
import { simpleNamingService } from '@/services/simpleNamingService';

const { Title, Text } = Typography;

interface SimpleDynamicTitleProps {
  baseName: string;
  selectedAttributes: Record<string, string>;
  level?: 1 | 2 | 3 | 4 | 5;
  showAddedParts?: boolean;
  onNameChange?: (newName: string) => void;
  style?: React.CSSProperties;
}

const SimpleDynamicTitle: React.FC<SimpleDynamicTitleProps> = ({
  baseName,
  selectedAttributes,
  level = 1,
  showAddedParts = true,
  onNameChange,
  style,
}) => {
  const [currentName, setCurrentName] = useState<string>(baseName);
  const [addedParts, setAddedParts] = useState<string[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Update name when attributes change
  useEffect(() => {
    const result = simpleNamingService.generateName({
      baseName,
      selectedAttributes,
    });

    setCurrentName(result.generatedName);
    setAddedParts(result.addedParts);
    setHasChanges(result.hasChanges);

    // Notify parent if callback provided
    if (onNameChange) {
      onNameChange(result.generatedName);
    }
  }, [baseName, selectedAttributes, onNameChange]);

  const resetToBaseName = () => {
    setCurrentName(baseName);
    setAddedParts([]);
    setHasChanges(false);
    if (onNameChange) {
      onNameChange(baseName);
    }
  };

  return (
    <div style={style}>
      <Title
        level={level}
        style={{
          margin: 0,
          transition: 'all 0.3s ease',
        }}
      >
        {currentName}
      </Title>
    </div>
  );
};

export default SimpleDynamicTitle;
