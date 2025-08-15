'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Bell, Clock, Play, Pause, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScheduleLogic, scheduleUtils } from './schedule-logic';

interface LifeReminder {
  id: string;
  text: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

interface SmartNotificationManagerProps {
  reminders: LifeReminder[];
  onNotificationSent?: (reminder: LifeReminder) => void;
}

export function SmartNotificationManager({
  reminders,
  onNotificationSent,
}: SmartNotificationManagerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [lastNotification, setLastNotification] = useState<LifeReminder | null>(
    null
  );
  const [nextCheck, setNextCheck] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [statusColor, setStatusColor] = useState<string>('text-gray-600');

  const scheduleLogicRef = useRef<ScheduleLogic | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastNotificationTimeRef = useRef<number>(0);

  // Initialize schedule logic
  useEffect(() => {
    const savedSchedule = scheduleUtils.loadSchedule();
    const schedule = savedSchedule || scheduleUtils.getDefaultSchedule();
    scheduleLogicRef.current = new ScheduleLogic(schedule);

    // Update status immediately
    updateStatus();
  }, []);

  // Update status every minute
  useEffect(() => {
    const statusInterval = setInterval(updateStatus, 60000); // Every minute
    return () => clearInterval(statusInterval);
  }, []);

  const updateStatus = useCallback(() => {
    if (!scheduleLogicRef.current) return;

    const status = scheduleLogicRef.current.getCurrentStatus();
    setCurrentStatus(status.status);
    setStatusColor(status.color);

    // Update next check time
    const nextOpportunity =
      scheduleLogicRef.current.getTimeUntilNextOpportunity();
    setNextCheck(nextOpportunity);
  }, []);

  const startNotifications = useCallback(() => {
    if (!scheduleLogicRef.current || !reminders.length) return;

    setIsRunning(true);

    // Check immediately
    checkAndSendNotification();

    // Set up interval to check every 5 minutes
    intervalRef.current = setInterval(
      () => {
        checkAndSendNotification();
      },
      5 * 60 * 1000
    ); // 5 minutes
  }, [reminders]);

  const stopNotifications = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const checkAndSendNotification = useCallback(() => {
    if (!scheduleLogicRef.current || !reminders.length) return;

    // Check if we can send notifications
    if (!scheduleLogicRef.current.canSendNotification()) {
      return;
    }

    // Prevent sending notifications too frequently (minimum 30 minutes apart)
    const now = Date.now();
    if (now - lastNotificationTimeRef.current < 30 * 60 * 1000) {
      return;
    }

    // Select a random reminder
    const randomIndex = Math.floor(Math.random() * reminders.length);
    const selectedReminder = reminders[randomIndex];

    // Send notification
    if (sendNotification(selectedReminder)) {
      setLastNotification(selectedReminder);
      lastNotificationTimeRef.current = now;
      onNotificationSent?.(selectedReminder);

      // Update status
      updateStatus();
    }
  }, [reminders, onNotificationSent, updateStatus]);

  const sendNotification = useCallback((reminder: LifeReminder): boolean => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return false;
    }

    try {
      const notification = new Notification('Life Reminder 💡', {
        body: reminder.text,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'life-reminder',
        requireInteraction: false,
        silent: false,
      });

      // Auto-close after 8 seconds
      setTimeout(() => {
        notification.close();
      }, 8000);

      return true;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }, []);

  const sendTestNotification = useCallback(() => {
    if (reminders.length > 0) {
      const testReminder = reminders[0];
      if (sendNotification(testReminder)) {
        setLastNotification(testReminder);
        lastNotificationTimeRef.current = Date.now();
      }
    }
  }, [reminders, sendNotification]);

  const updateSchedule = useCallback(
    (newSchedule: any) => {
      if (scheduleLogicRef.current) {
        scheduleLogicRef.current.updateSchedule(newSchedule);
        updateStatus();
      }
    },
    [updateStatus]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (!scheduleLogicRef.current) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white border border-[#FFE8D6] rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#333] flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Smart Notification Manager
        </h3>
        <div className="flex space-x-2">
          {!isRunning ? (
            <Button
              onClick={startNotifications}
              className="bg-green-600 hover:bg-green-700 text-white text-sm"
            >
              <Play className="h-4 w-4 mr-1" />
              Start
            </Button>
          ) : (
            <Button
              onClick={stopNotifications}
              className="bg-red-600 hover:bg-red-700 text-white text-sm"
            >
              <Pause className="h-4 w-4 mr-1" />
              Stop
            </Button>
          )}
          <Button
            onClick={sendTestNotification}
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700"
          >
            Test
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {/* Current Status */}
        <div className="p-3 bg-gray-50 rounded">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Current Status:</span>
            <span className={`text-sm font-medium ${statusColor}`}>
              {currentStatus}
            </span>
          </div>
        </div>

        {/* Next Check */}
        {nextCheck && (
          <div className="p-3 bg-blue-50 rounded">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-600 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Next notification opportunity:
              </span>
              <span className="text-sm font-medium text-blue-700">
                {nextCheck}
              </span>
            </div>
          </div>
        )}

        {/* Last Notification */}
        {lastNotification && (
          <div className="p-3 bg-green-50 rounded">
            <div className="text-sm text-green-700">
              <strong>Last sent:</strong> {lastNotification.text}
            </div>
            <div className="text-xs text-green-600 mt-1">
              Category: {lastNotification.category} | Priority:{' '}
              {lastNotification.priority}
            </div>
          </div>
        )}

        {/* Status Info */}
        <div className="p-3 bg-gray-50 rounded text-xs text-gray-600">
          <div className="space-y-1">
            <div>• Notifications are sent every 5 minutes when allowed</div>
            <div>• Minimum 30 minutes between notifications</div>
            <div>• Only sent during breaks and non-work hours</div>
            <div>• Weekend notifications are always allowed</div>
          </div>
        </div>

        {/* Reminder Count */}
        <div className="p-3 bg-purple-50 rounded">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-600">
              Available Reminders:
            </span>
            <span className="text-sm font-medium text-purple-700">
              {reminders.length} reminders
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
