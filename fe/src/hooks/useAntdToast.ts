import { message } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';

interface ToastOptions {
  duration?: number;
  key?: string;
}

export const useAntdToast = () => {
  const theme = useSelector((state: RootState) => state.ui.theme);

  // Cấu hình mặc định cho toast
  const defaultOptions: ToastOptions = {
    duration: 3000,
  };

  // Tạo instance của message với cấu hình theme
  const [messageApi, contextHolder] = message.useMessage({
    top: 70, // Vị trí từ top
    maxCount: 5, // Số lượng toast tối đa hiển thị cùng lúc
  });

  // Hàm hiển thị toast
  const showToast = (
    type: ToastType,
    content: string,
    options?: ToastOptions
  ) => {
    const mergedOptions = { ...defaultOptions, ...options };

    switch (type) {
      case 'success':
        return messageApi.success({
          content,
          duration: mergedOptions.duration,
          key: mergedOptions.key,
          className: theme === 'dark' ? 'ant-message-dark' : '',
        });
      case 'error':
        return messageApi.error({
          content,
          duration: mergedOptions.duration,
          key: mergedOptions.key,
          className: theme === 'dark' ? 'ant-message-dark' : '',
        });
      case 'info':
        return messageApi.info({
          content,
          duration: mergedOptions.duration,
          key: mergedOptions.key,
          className: theme === 'dark' ? 'ant-message-dark' : '',
        });
      case 'warning':
        return messageApi.warning({
          content,
          duration: mergedOptions.duration,
          key: mergedOptions.key,
          className: theme === 'dark' ? 'ant-message-dark' : '',
        });
      case 'loading':
        return messageApi.loading({
          content,
          duration: mergedOptions.duration,
          key: mergedOptions.key,
          className: theme === 'dark' ? 'ant-message-dark' : '',
        });
      default:
        return messageApi.info({
          content,
          duration: mergedOptions.duration,
          key: mergedOptions.key,
          className: theme === 'dark' ? 'ant-message-dark' : '',
        });
    }
  };

  // Các hàm tiện ích
  const success = (content: string, options?: ToastOptions) =>
    showToast('success', content, options);

  const error = (content: string, options?: ToastOptions) =>
    showToast('error', content, options);

  const info = (content: string, options?: ToastOptions) =>
    showToast('info', content, options);

  const warning = (content: string, options?: ToastOptions) =>
    showToast('warning', content, options);

  const loading = (content: string, options?: ToastOptions) =>
    showToast('loading', content, options);

  // Hàm để đóng toast theo key
  const close = (key?: string) => {
    if (key) {
      messageApi.destroy(key);
    } else {
      messageApi.destroy();
    }
  };

  return {
    success,
    error,
    info,
    warning,
    loading,
    close,
    contextHolder,
  };
};
