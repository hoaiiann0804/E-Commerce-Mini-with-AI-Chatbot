import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeNotification } from '@/features/ui/uiSlice';
import type { Notification as NotificationType } from '@/types/ui.types';

const Notification: React.FC<{ notification: NotificationType }> = ({
  notification,
}) => {
  const dispatch = useDispatch();

  // Auto-dismiss notification after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(notification.id));
    }, notification.duration || 5000);

    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  // Get icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  // Get background color based on notification type
  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800';
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div
      className={`flex items-center p-4 mb-3 rounded-lg border shadow-md animate-fadeIn ${getBackgroundColor()}`}
      role="alert"
    >
      <div className="flex-shrink-0 mr-3">{getIcon()}</div>
      <div className="flex-grow text-sm font-medium text-neutral-800 dark:text-neutral-200">
        {notification.message}
      </div>
      <button
        type="button"
        className="ml-4 text-neutral-400 hover:text-neutral-500 dark:text-neutral-500 dark:hover:text-neutral-400"
        onClick={() => dispatch(removeNotification(notification.id))}
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

const Notifications: React.FC = () => {
  const { notifications } = useSelector((state: RootState) => state.ui);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 w-full max-w-sm">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default Notifications;
