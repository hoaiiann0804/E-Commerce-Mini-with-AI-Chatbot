import React from 'react';
import CreateProductWizardContent from './CreateProductWizardContent';

interface CreateProductWizardWrapperProps {
  onSuccess?: () => void;
}

/**
 * Wrapper component that renders the CreateProductWizard content
 * without its own modal (to be used inside Ant Design Modal)
 */
const CreateProductWizardWrapper: React.FC<CreateProductWizardWrapperProps> = ({
  onSuccess,
}) => {
  return <CreateProductWizardContent onSuccess={onSuccess} />;
};

export default CreateProductWizardWrapper;
