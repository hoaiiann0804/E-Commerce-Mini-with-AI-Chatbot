/**
 * Error state components
 * Reusable error states for different scenarios
 */

import React from 'react';
import PremiumButton from './PremiumButton';
import { getErrorMessage } from '@/utils/errorUtils';

interface ErrorStateProps {
  error: any;
  onRetry?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showRetryButton?: boolean;
  retryText?: string;
  language?: 'vi' | 'en';
}

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Error State Component
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  className = '',
  size = 'md',
  showRetryButton = true,
  retryText = 'Thử lại',
  language = 'vi',
}) => {
  const errorMessage = getErrorMessage(error, language);

  const sizeClasses = {
    sm: {
      container: 'py-8',
      icon: 'h-8 w-8',
      title: 'text-sm',
      description: 'text-xs',
      button: 'px-3 py-1.5 text-sm',
    },
    md: {
      container: 'py-12',
      icon: 'h-12 w-12',
      title: 'text-base',
      description: 'text-sm',
      button: 'px-4 py-2 text-base',
    },
    lg: {
      container: 'py-16',
      icon: 'h-16 w-16',
      title: 'text-lg',
      description: 'text-base',
      button: 'px-6 py-3 text-lg',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={`flex flex-col items-center text-center ${classes.container} ${className}`}
    >
      {/* Error Icon */}
      <div className={`${classes.icon} text-red-500 mb-4`}>
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      {/* Error Title */}
      <h3
        className={`font-semibold text-neutral-800 dark:text-neutral-200 mb-2 ${classes.title}`}
      >
        Đã xảy ra lỗi
      </h3>

      {/* Error Description */}
      <p
        className={`text-neutral-600 dark:text-neutral-400 mb-6 max-w-md ${classes.description}`}
      >
        {errorMessage}
      </p>

      {/* Retry Button */}
      {showRetryButton && onRetry && (
        <PremiumButton
          variant="primary"
          size="middle"
          onClick={onRetry}
          className={classes.button}
        >
          {retryText}
        </PremiumButton>
      )}
    </div>
  );
};

/**
 * Empty State Component
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className = '',
}) => {
  const defaultIcon = (
    <svg
      className="h-12 w-12 text-neutral-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  );

  return (
    <div
      className={`flex flex-col items-center text-center py-12 ${className}`}
    >
      {/* Icon */}
      <div className="mb-4">{icon || defaultIcon}</div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
          {description}
        </p>
      )}

      {/* Action Button */}
      {actionLabel && onAction && (
        <PremiumButton variant="primary" size="middle" onClick={onAction}>
          {actionLabel}
        </PremiumButton>
      )}
    </div>
  );
};

/**
 * Network Error State
 */
export const NetworkErrorState: React.FC<Omit<ErrorStateProps, 'error'>> = (
  props
) => {
  const networkError = {
    status: 'FETCH_ERROR',
    message: 'Không thể kết nối tới server',
  };

  return <ErrorState error={networkError} {...props} />;
};

/**
 * Not Found State
 */
export const NotFoundState: React.FC<{
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}> = ({
  title = 'Không tìm thấy',
  description = 'Tài nguyên bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
  actionLabel = 'Về trang chủ',
  onAction,
  className = '',
}) => {
  const notFoundIcon = (
    <svg
      className="h-12 w-12 text-neutral-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  return (
    <EmptyState
      title={title}
      description={description}
      actionLabel={actionLabel}
      onAction={onAction}
      icon={notFoundIcon}
      className={className}
    />
  );
};

/**
 * No Results State
 */
export const NoResultsState: React.FC<{
  searchQuery?: string;
  onClearSearch?: () => void;
  className?: string;
}> = ({ searchQuery, onClearSearch, className = '' }) => {
  const title = searchQuery
    ? `Không tìm thấy kết quả cho "${searchQuery}"`
    : 'Không có kết quả';

  const description = searchQuery
    ? 'Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra lại cách viết.'
    : 'Hiện tại không có dữ liệu nào để hiển thị.';

  return (
    <EmptyState
      title={title}
      description={description}
      actionLabel={searchQuery ? 'Xóa tìm kiếm' : undefined}
      onAction={onClearSearch}
      className={className}
    />
  );
};
