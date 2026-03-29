import type { Notification } from '@/types';

export async function getNotifications(): Promise<Notification[]> {
  // TODO: replace with real API call e.g. fetch('/api/notifications')
  return [];
}

export async function markAsRead(notificationId: string): Promise<void> {
  // TODO: replace with real API call e.g. fetch(`/api/notifications/${notificationId}/read`, { method: 'POST' })
  void notificationId;
}

