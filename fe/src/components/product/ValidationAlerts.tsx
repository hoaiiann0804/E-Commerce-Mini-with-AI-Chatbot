import React from 'react';
import { Alert } from 'antd';

interface ValidationAlertsProps {
  isFormValid: boolean;
  missingFields: string[];
}

const ValidationAlerts: React.FC<ValidationAlertsProps> = ({
  isFormValid,
  missingFields,
}) => {
  // Không hiển thị bất kỳ thông báo nào
  return null;
};

export default ValidationAlerts;
