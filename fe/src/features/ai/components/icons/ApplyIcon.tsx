import React from 'react';

interface ApplyIconProps {
  className?: string;
  size?: number;
}

const ApplyIcon: React.FC<ApplyIconProps> = ({ className = '', size = 16 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ApplyIcon;
