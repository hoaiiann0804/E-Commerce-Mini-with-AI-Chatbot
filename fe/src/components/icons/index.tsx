import React from 'react';

export interface IconProps {
  className?: string;
  size?: number;
}

// Navigation Icons
export const HomeIcon: React.FC<IconProps> = ({
  className = 'h-4 w-4',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={size ? `h-${size} w-${size}` : className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

export const ShopIcon: React.FC<IconProps> = ({
  className = 'h-4 w-4',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={size ? `h-${size} w-${size}` : className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);

export const CategoriesIcon: React.FC<IconProps> = ({
  className = 'h-4 w-4',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={size ? `h-${size} w-${size}` : className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

export const DealsIcon: React.FC<IconProps> = ({
  className = 'h-4 w-4',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={size ? `h-${size} w-${size}` : className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    />
  </svg>
);

export const AboutIcon: React.FC<IconProps> = ({
  className = 'h-4 w-4',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={size ? `h-${size} w-${size}` : className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Action Icons
export const UserIcon: React.FC<IconProps> = ({
  className = 'h-5 w-5',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={size ? `h-${size} w-${size}` : className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

export const CartIcon: React.FC<IconProps> = ({
  className = 'h-5 w-5',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={size ? `h-${size} w-${size}` : className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);

export const AdminIcon: React.FC<IconProps> = ({
  className = 'h-4 w-4',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={size ? `h-${size} w-${size}` : className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

// Menu Icons
export const MenuIcon: React.FC<IconProps> = ({
  className = 'h-5 w-5',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={size ? `h-${size} w-${size}` : className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({
  className = 'h-5 w-5',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={size ? `h-${size} w-${size}` : className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Hero Section Icons
export const LightningIcon: React.FC<IconProps> = ({
  className = 'h-5 w-5',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={size ? `h-${size} w-${size}` : className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({
  className = 'h-6 w-6',
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={size ? `h-${size} w-${size}` : className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 14l-7 7m0 0l-7-7m7 7V3"
    />
  </svg>
);

// Icon Map for dynamic usage
export const NAVIGATION_ICONS = {
  home: HomeIcon,
  shop: ShopIcon,
  categories: CategoriesIcon,
  deals: DealsIcon,
  about: AboutIcon,
} as const;

export type NavigationIconKey = keyof typeof NAVIGATION_ICONS;
