import React from 'react';

interface BotIconProps {
  className?: string;
  size?: number;
}

const BotIcon: React.FC<BotIconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C13.1046 2 14 2.89543 14 4V5H16C17.1046 5 18 5.89543 18 7V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V7C6 5.89543 6.89543 5 8 5H10V4C10 2.89543 10.8954 2 12 2Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M12 2C13.1046 2 14 2.89543 14 4V5H16C17.1046 5 18 5.89543 18 7V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V7C6 5.89543 6.89543 5 8 5H10V4C10 2.89543 10.8954 2 12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path
        d="M9 14C9.5 15 10.5 15.5 12 15.5C13.5 15.5 14.5 15 15 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 1V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default BotIcon;
