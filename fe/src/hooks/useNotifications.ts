import { useDispatch } from 'react-redux';
import {
  addNotification,
  removeNotification,
  clearNotifications,
} from '@/features/ui/uiSlice';
import { AddNotificationPayload } from '@/types/ui.types';

export const useNotifications = () => {
  const dispatch = useDispatch();

  const showNotification = (notification: AddNotificationPayload) => {
    dispatch(addNotification(notification));
  };

  const hideNotification = (id: string) => {
    dispatch(removeNotification(id));
  };

  const clearAllNotifications = () => {
    dispatch(clearNotifications());
  };

  return {
    showNotification,
    hideNotification,
    clearAllNotifications,
  };
};
