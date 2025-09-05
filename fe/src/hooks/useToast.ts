import { useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  duration?: number;
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
}

export const useToast = () => {
  const showToast = useCallback(
    (message: string, type: ToastType = 'info', options?: ToastOptions) => {
      // Tạo element toast
      const toast = document.createElement('div');
      toast.className = getToastClasses(type);
      toast.innerHTML = `
      <div class="flex items-center">
        <div class="flex-shrink-0">
          ${getToastIcon(type)}
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-white">${message}</p>
        </div>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button type="button" class="inline-flex rounded-md p-1.5 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
              <span class="sr-only">Dismiss</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

      // Tạo container nếu chưa có
      let container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = getContainerClasses(
          options?.position || 'top-right'
        );
        document.body.appendChild(container);
      }

      // Thêm toast vào container
      container.appendChild(toast);

      // Animation vào
      setTimeout(() => {
        toast.classList.add('translate-x-0', 'opacity-100');
        toast.classList.remove('translate-x-full', 'opacity-0');
      }, 100);

      // Tự động xóa sau thời gian quy định
      const duration = options?.duration || 5000;
      setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        toast.classList.remove('translate-x-0', 'opacity-100');
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 300);
      }, duration);
    },
    []
  );

  return { showToast };
};

const getToastClasses = (type: ToastType): string => {
  const baseClasses =
    'transform transition-all duration-300 ease-in-out translate-x-full opacity-0 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden mb-4';

  switch (type) {
    case 'success':
      return `${baseClasses} bg-green-500`;
    case 'error':
      return `${baseClasses} bg-red-500`;
    case 'warning':
      return `${baseClasses} bg-yellow-500`;
    case 'info':
    default:
      return `${baseClasses} bg-blue-500`;
  }
};

const getToastIcon = (type: ToastType): string => {
  switch (type) {
    case 'success':
      return `
        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      `;
    case 'error':
      return `
        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      `;
    case 'warning':
      return `
        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      `;
    case 'info':
    default:
      return `
        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `;
  }
};

const getContainerClasses = (position: string): string => {
  const baseClasses = 'fixed z-50 p-4 space-y-4';

  switch (position) {
    case 'top-right':
      return `${baseClasses} top-0 right-0`;
    case 'top-left':
      return `${baseClasses} top-0 left-0`;
    case 'bottom-right':
      return `${baseClasses} bottom-0 right-0`;
    case 'bottom-left':
      return `${baseClasses} bottom-0 left-0`;
    case 'top-center':
      return `${baseClasses} top-0 left-1/2 transform -translate-x-1/2`;
    case 'bottom-center':
      return `${baseClasses} bottom-0 left-1/2 transform -translate-x-1/2`;
    default:
      return `${baseClasses} top-0 right-0`;
  }
};
