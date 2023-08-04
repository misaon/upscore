import { defineStore } from 'pinia';
import type { Ref } from 'vue';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface Notification {
  message: string;
  type: NotificationType;
  notifyTime: number;
}

export const useNotifyStore = defineStore('notify', () => {
  const notifications: Ref<Notification[]> = ref([]);

  function notify(messageOrError: unknown, type: NotificationType, timeout = 5000) {
    let message = '';

    if (messageOrError instanceof Error) {
      message = messageOrError.message;
    }

    if (typeof messageOrError === 'string') {
      message = messageOrError;
    }

    const notification: Notification = { message, type, notifyTime: Date.now() };

    notifications.value.push(notification);

    setTimeout(() => removeNotification(notification), timeout);
  }

  function removeNotification(notification: Notification) {
    notifications.value = notifications.value.filter(
      (n) => n.notifyTime !== notification.notifyTime
    );
  }

  return { notifications, notify, removeNotification };
});
