import React from 'react';

interface SparkleIconProps {
  className?: string;
  size?: number;
}

const SparkleIcon: React.FC<SparkleIconProps> = ({
  className = '',
  size = 16,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 0L9.5 5.5L15 7L9.5 8.5L8 14L6.5 8.5L1 7L6.5 5.5L8 0Z"
        fill="currentColor"
      />
      <path
        d="M12 2L12.5 3.5L14 4L12.5 4.5L12 6L11.5 4.5L10 4L11.5 3.5L12 2Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M4 10L4.5 11.5L6 12L4.5 12.5L4 14L3.5 12.5L2 12L3.5 11.5L4 10Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
};

export default SparkleIcon;
