/**
 * Loading state components
 * Reusable loading states for different scenarios
 */

import React from 'react';

interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'skeleton' | 'pulse';
  className?: string;
}

interface LoadingSpinnerProps extends LoadingStateProps {
  text?: string;
}

interface LoadingSkeletonProps extends LoadingStateProps {
  lines?: number;
  width?: string;
  height?: string;
}

/**
 * Loading Spinner Component
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-primary-500 ${sizeClasses[size]}`}
      />
      {text && (
        <p
          className={`mt-2 text-neutral-600 dark:text-neutral-400 ${textSizeClasses[size]}`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

/**
 * Loading Skeleton Component
 */
export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  lines = 3,
  width = '100%',
  height = '1rem',
  className = '',
}) => {
  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="bg-neutral-200 dark:bg-neutral-700 rounded"
          style={{
            width: index === lines - 1 ? '75%' : width,
            height,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Loading Pulse Component
 */
export const LoadingPulse: React.FC<LoadingStateProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-pulse bg-primary-200 dark:bg-primary-800 rounded-full ${sizeClasses[size]}`}
      />
    </div>
  );
};

/**
 * Product Card Loading Skeleton
 */
export const ProductCardSkeleton: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div
      className={`animate-pulse bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 ${className}`}
    >
      {/* Image skeleton */}
      <div className="aspect-square bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-3" />

      {/* Title skeleton */}
      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2" />
      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-3" />

      {/* Price skeleton */}
      <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mb-2" />

      {/* Rating skeleton */}
      <div className="flex items-center space-x-1 mb-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-3 w-3 bg-neutral-200 dark:bg-neutral-700 rounded-full"
          />
        ))}
      </div>

      {/* Button skeleton */}
      <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded" />
    </div>
  );
};

/**
 * Category Card Loading Skeleton
 */
export const CategoryCardSkeleton: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div
      className={`animate-pulse bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden ${className}`}
    >
      {/* Image skeleton */}
      <div className="aspect-w-3 aspect-h-2 bg-neutral-200 dark:bg-neutral-700" />

      {/* Content skeleton */}
      <div className="p-6 space-y-2">
        <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
      </div>
    </div>
  );
};

/**
 * Generic Loading State Component
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'spinner',
  ...props
}) => {
  switch (variant) {
    case 'skeleton':
      return <LoadingSkeleton {...props} />;
    case 'pulse':
      return <LoadingPulse {...props} />;
    default:
      return <LoadingSpinner {...props} />;
  }
};

/**
 * Full Page Loading Component
 */
export const FullPageLoading: React.FC<{ message?: string }> = ({
  message = 'Đang tải...',
}) => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-neutral-900 flex items-center justify-center z-50">
      <LoadingSpinner size="lg" text={message} />
    </div>
  );
};

/**
 * Section Loading Component
 */
export const SectionLoading: React.FC<{
  message?: string;
  className?: string;
}> = ({ message = 'Đang tải...', className = '' }) => {
  return (
    <div className={`flex justify-center items-center py-20 ${className}`}>
      <LoadingSpinner size="md" text={message} />
    </div>
  );
};
