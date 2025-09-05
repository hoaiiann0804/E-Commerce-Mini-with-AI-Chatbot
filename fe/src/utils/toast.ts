import { message } from 'antd';
import { store } from '@/store';

/**
 * Toast utility for the entire application
 *
 * This is the recommended way to show toast notifications in the application.
 * It handles dark/light mode automatically and provides a consistent interface.
 *
 * Usage:
 * import { toast } from '@/utils/toast';
 *
 * toast.success('Operation successful');
 * toast.error('Something went wrong');
 * toast.info('Information message');
 * toast.warning('Warning message');
 * toast.loading('Loading...');
 *
 * // With custom duration (in seconds)
 * toast.success('Saved successfully', 5);
 *
 * // With a key for updating or closing
 * const key = 'updating';
 * toast.loading('Updating...', 0, key); // Duration 0 means it won't auto-close
 * // Later:
 * toast.success('Updated successfully', 2, key); // This will replace the loading toast
 * // Or to close manually:
 * toast.close(key);
 */

// Cấu hình mặc định cho toast
message.config({
  top: 70,
  duration: 3,
  maxCount: 5,
});

// Hàm helper để lấy theme hiện tại từ Redux store
const isDarkMode = () => {
  try {
    // Lấy theme từ Redux store
    const theme = store.getState().ui.theme;

    // Nếu không có theme trong Redux, kiểm tra class trên document
    if (!theme) {
      return document.documentElement.classList.contains('dark');
    }

    return theme === 'dark';
  } catch (error) {
    // Fallback nếu có lỗi khi truy cập store
    return document.documentElement.classList.contains('dark');
  }
};

// Tạo class name dựa trên theme
const getClassName = () => {
  return isDarkMode() ? 'ant-message-dark' : '';
};

// Export toast API để sử dụng trong toàn bộ ứng dụng
export const toast = {
  success: (content: string, duration?: number, key?: string) => {
    return message.success({
      content,
      duration,
      key,
      className: getClassName(),
    });
  },

  error: (content: string, duration?: number, key?: string) => {
    return message.error({
      content,
      duration,
      key,
      className: getClassName(),
    });
  },

  info: (content: string, duration?: number, key?: string) => {
    return message.info({
      content,
      duration,
      key,
      className: getClassName(),
    });
  },

  warning: (content: string, duration?: number, key?: string) => {
    return message.warning({
      content,
      duration,
      key,
      className: getClassName(),
    });
  },

  loading: (content: string, duration?: number, key?: string) => {
    return message.loading({
      content,
      duration,
      key,
      className: getClassName(),
    });
  },

  // Đóng toast theo key hoặc tất cả
  close: (key?: string) => {
    if (key) {
      message.destroy(key);
    } else {
      message.destroy();
    }
  },
};
