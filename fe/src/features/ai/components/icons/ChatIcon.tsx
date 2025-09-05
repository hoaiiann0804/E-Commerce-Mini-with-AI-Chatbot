import React from 'react';

interface IconProps {
  className?: string;
}

const ChatIcon: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Thiết kế hiện đại, đơn giản và đẹp mắt */}
      <g>
        {/* Phần nền bong bóng chat */}
        <path
          d="M20 10.9378C20 15.3804 16.4183 18.9621 12 18.9621C10.4091 18.9621 8.9286 18.4618 7.7091 17.6019L4.5 18.9621L5.8626 15.7769C5.00935 14.5615 4.5 13.0729 4.5 10.9378C4.5 6.49516 8.0817 2.91345 12 2.91345C15.9183 2.91345 20 6.49516 20 10.9378Z"
          fill="currentColor"
          fillOpacity="0.15"
        />

        {/* Phần viền bong bóng chat */}
        <path
          d="M20 10.9378C20 15.3804 16.4183 18.9621 12 18.9621C10.4091 18.9621 8.9286 18.4618 7.7091 17.6019L4.5 18.9621L5.8626 15.7769C5.00935 14.5615 4.5 13.0729 4.5 10.9378C4.5 6.49516 8.0817 2.91345 12 2.91345C15.9183 2.91345 20 6.49516 20 10.9378Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dấu ba chấm */}
        <path
          d="M9 10.9378H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 14.4378H12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default ChatIcon;
