import { useCallback } from 'react';
import { handleUnauthorizedError, getErrorMessage } from '@/utils/authUtils';
import { toast } from '@/utils/toast';

/**
 * Custom hook for handling API errors consistently across the application
 */
export const useErrorHandler = () => {
  const handleError = useCallback((error: any, showToast: boolean = true) => {
    // Handle 401 errors with auto logout
    if (handleUnauthorizedError(error)) {
      return; // Auto logout handled, no need to show additional toast
    }

    // Handle other errors
    if (showToast) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }

    // Log error for debugging
    console.error('API Error:', error);
  }, []);

  const handleSuccess = useCallback((message: string, duration?: number) => {
    toast.success(message, duration);
  }, []);

  const handleWarning = useCallback((message: string, duration?: number) => {
    toast.warning(message, duration);
  }, []);

  return {
    handleError,
    handleSuccess,
    handleWarning,
  };
};

export default useErrorHandler;
