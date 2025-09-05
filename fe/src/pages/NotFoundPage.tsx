import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <div className="max-w-md">
        <h1 className="text-9xl font-bold text-primary-500 dark:text-primary-400 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" as={Link} to="/">
            Go to Homepage
          </Button>
          <Button variant="outline" as={Link} to="/shop">
            Browse Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
