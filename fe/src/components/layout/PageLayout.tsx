/**
 * PageLayout Component
 * Provides consistent layout structure for all pages
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FullPageLoading } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  className?: string;
  isLoading?: boolean;
  error?: any;
  onRetry?: () => void;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showContainer?: boolean;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  actions?: React.ReactNode;
  className?: string;
}

/**
 * Page Header Component
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  className = '',
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 text-neutral-400 mx-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {breadcrumb.href ? (
                  <a
                    href={breadcrumb.href}
                    className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                  >
                    {breadcrumb.label}
                  </a>
                ) : (
                  <span className="text-neutral-800 dark:text-neutral-200">
                    {breadcrumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Header Content */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center space-x-3">{actions}</div>
        )}
      </div>
    </div>
  );
};

/**
 * Page Section Component
 */
export const PageSection: React.FC<{
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  headerActions?: React.ReactNode;
  containerized?: boolean;
}> = ({
  children,
  title,
  description,
  className = '',
  headerActions,
  containerized = true,
}) => {
  const headerContent = (
    <>
      {(title || description || headerActions) && (
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              {title && (
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-800 dark:text-neutral-100">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                  {description}
                </p>
              )}
            </div>
            {headerActions && (
              <div className="flex items-center justify-center sm:justify-end space-x-2">
                {headerActions}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );

  if (containerized) {
    return (
      <section className={`mb-8 ${className}`}>
        <div className="container mx-auto px-4">
          {headerContent}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className={`mb-8 ${className}`}>
      {headerContent}
      {children}
    </section>
  );
};

/**
 * Main Page Layout Component
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  keywords,
  className = '',
  isLoading = false,
  error,
  onRetry,
  containerSize = 'xl',
  showContainer = true,
}) => {
  const getContainerClass = () => {
    if (!showContainer) return '';

    const sizeClasses = {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full',
    };

    return `container mx-auto px-4 ${sizeClasses[containerSize]}`;
  };

  const pageTitle = title
    ? `${title} - Website Bán Hàng Mini`
    : 'Website Bán Hàng Mini';

  // Show full page loading
  if (isLoading) {
    return <FullPageLoading />;
  }

  // Show error state
  if (error) {
    return (
      <PageLayout showContainer={showContainer} containerSize={containerSize}>
        <ErrorState
          error={error}
          onRetry={onRetry}
          size="lg"
          className="py-16"
        />
      </PageLayout>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:title" content={pageTitle} />
        {description && (
          <meta property="og:description" content={description} />
        )}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        {description && (
          <meta name="twitter:description" content={description} />
        )}
      </Helmet>

      {/* Page Content */}
      <main
        className={`min-h-screen bg-white dark:bg-neutral-900 ${className}`}
      >
        <div className={getContainerClass()}>{children}</div>
      </main>
    </>
  );
};

/**
 * Page Content Wrapper
 */
export const PageContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return <div className={`py-8 ${className}`}>{children}</div>;
};

export default PageLayout;
