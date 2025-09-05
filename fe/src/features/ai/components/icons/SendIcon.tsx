import React from 'react';

interface IconProps {
  className?: string;
}

const SendIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  );
};

export default SendIcon;
