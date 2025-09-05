import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@/components/common/Button';

const UnauthorizedPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
              {t('unauthorized.title')}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              {t('unauthorized.message')}
            </p>
          </div>

          <div className="space-y-4">
            <Link to="/">
              <Button variant="primary" size="lg" fullWidth>
                {t('unauthorized.goHome')}
              </Button>
            </Link>

            <Link to="/login">
              <Button variant="secondary" size="lg" fullWidth>
                {t('unauthorized.login')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
