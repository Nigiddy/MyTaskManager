'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bell, BellOff, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationServiceProps {
  onPermissionChange?: (granted: boolean) => void;
}

// Export the sendNotification function for use in other components
export const sendNotification = (title: string, body: string): boolean => {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return false;
  }

  try {
    const notification = new Notification(title, {
      body,
      icon: '/favicon.ico', // You can customize this
      badge: '/favicon.ico',
      tag: 'life-reminder', // Prevents duplicate notifications
      requireInteraction: false,
      silent: false,
    });

    // Auto-close after 5 seconds
    setTimeout(() => {
      notification.close();
    }, 5000);

    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};

export function NotificationService({
  onPermissionChange,
}: NotificationServiceProps) {
  const [permission, setPermission] =
    useState<NotificationPermission>('default');
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check current notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
      setIsEnabled(Notification.permission === 'granted');
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      setIsEnabled(result === 'granted');
      onPermissionChange?.(result === 'granted');

      if (result === 'granted') {
        // Send a test notification
        sendNotification(
          'Notifications Enabled! 🎉',
          "You'll now receive gentle reminders during your breaks and non-work hours."
        );
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  }, [onPermissionChange]);

  const toggleNotifications = useCallback(() => {
    if (permission === 'granted') {
      setIsEnabled(!isEnabled);
      onPermissionChange?.(!isEnabled);
    } else {
      requestPermission();
    }
  }, [permission, isEnabled, requestPermission, onPermissionChange]);

  if (!('Notification' in window)) {
    return (
      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-700">
          Browser notifications are not supported in this browser.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border border-[#FFE8D6] rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-[#333] flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Browser Notifications
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleNotifications}
          className={`${
            isEnabled
              ? 'text-green-600 hover:text-green-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {isEnabled ? (
            <Bell className="h-4 w-4" />
          ) : (
            <BellOff className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="space-y-3">
        {/* Permission Status */}
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <span className="text-sm text-gray-600">Permission Status:</span>
          <span
            className={`text-sm font-medium ${
              permission === 'granted'
                ? 'text-green-600'
                : permission === 'denied'
                  ? 'text-red-600'
                  : 'text-yellow-600'
            }`}
          >
            {permission === 'granted'
              ? 'Granted'
              : permission === 'denied'
                ? 'Denied'
                : 'Not Set'}
          </span>
        </div>

        {/* Current Status */}
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <span className="text-sm text-gray-600">Notifications:</span>
          <span
            className={`text-sm font-medium ${
              isEnabled ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {isEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        {/* Action Button */}
        {permission === 'default' && (
          <Button
            onClick={requestPermission}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Enable Notifications
          </Button>
        )}

        {permission === 'denied' && (
          <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            Notifications are blocked. Please enable them in your browser
            settings.
          </div>
        )}

        {permission === 'granted' && (
          <div className="text-xs text-gray-500">
            Notifications will be sent during your breaks and non-work hours.
          </div>
        )}
      </div>
    </div>
  );
}
