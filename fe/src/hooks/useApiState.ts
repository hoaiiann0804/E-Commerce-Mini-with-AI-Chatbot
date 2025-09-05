/**
 * Custom hook for handling API state
 * Provides consistent loading, error, and success states
 */

import { useCallback, useMemo, useState } from 'react';
import { parseError, isRetryableError } from '@/utils/errorUtils';

interface ApiStateResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: any;
  isError: boolean;
  isSuccess: boolean;
  isEmpty: boolean;
  retry: () => void;
  canRetry: boolean;
}

interface UseApiStateParams<T> {
  data: T | undefined;
  isLoading: boolean;
  error: any;
  refetch?: () => void;
  isArray?: boolean;
}

/**
 * Custom hook for handling API state
 */
export const useApiState = <T = any>({
  data,
  isLoading,
  error,
  refetch,
  isArray = false,
}: UseApiStateParams<T>): ApiStateResult<T> => {
  const isError = !!error;
  const isSuccess = !isLoading && !isError && data !== undefined;

  const isEmpty = useMemo(() => {
    if (isLoading || isError) return false;
    if (data === undefined || data === null) return true;

    if (isArray) {
      return Array.isArray(data) && data.length === 0;
    }

    if (typeof data === 'object') {
      return Object.keys(data).length === 0;
    }

    return false;
  }, [data, isLoading, isError, isArray]);

  const canRetry = useMemo(() => {
    if (!isError || !refetch) return false;
    return isRetryableError(error);
  }, [isError, error, refetch]);

  const retry = useCallback(() => {
    if (refetch && canRetry) {
      refetch();
    }
  }, [refetch, canRetry]);

  return {
    data,
    isLoading,
    error,
    isError,
    isSuccess,
    isEmpty,
    retry,
    canRetry,
  };
};

/**
 * Hook for handling paginated data
 */
export const usePaginatedApiState = <T = any>({
  data,
  isLoading,
  error,
  refetch,
}: UseApiStateParams<T>) => {
  const baseState = useApiState({
    data,
    isLoading,
    error,
    refetch,
    isArray: false,
  });

  const items = useMemo(() => {
    if (!data || typeof data !== 'object') return [];

    // Handle different paginated response structures
    if ('data' in data && 'products' in (data as any).data) {
      return (data as any).data.products;
    }

    if ('data' in data && Array.isArray((data as any).data)) {
      return (data as any).data;
    }

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  }, [data]);

  const pagination = useMemo(() => {
    if (!data || typeof data !== 'object') return null;

    const responseData = (data as any).data || data;

    return {
      currentPage: responseData.currentPage || 1,
      totalPages: responseData.totalPages || 1,
      totalItems: responseData.totalItems || 0,
      hasNextPage: responseData.hasNextPage || false,
      hasPreviousPage: responseData.hasPreviousPage || false,
    };
  }, [data]);

  const isEmpty = items.length === 0 && !isLoading && !error;

  return {
    ...baseState,
    items,
    pagination,
    isEmpty,
  };
};

/**
 * Hook for handling form submission state
 */
export const useSubmissionState = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<any>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (
      submitFn: () => Promise<any>,
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
        resetAfter?: number;
      }
    ) => {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      try {
        const result = await submitFn();
        setSubmitSuccess(true);

        if (options?.onSuccess) {
          options.onSuccess(result);
        }

        // Reset success state after specified time
        if (options?.resetAfter) {
          setTimeout(() => {
            setSubmitSuccess(false);
          }, options.resetAfter);
        }

        return result;
      } catch (error) {
        const parsedError = parseError(error);
        setSubmitError(parsedError);

        if (options?.onError) {
          options.onError(parsedError);
        }

        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(false);
  }, []);

  return {
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit,
    reset,
  };
};
