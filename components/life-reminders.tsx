'use client';

import { useState, useEffect } from 'react';
import { Heart, Plus, X, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationService } from './notification-service';
import { WorkScheduleConfig } from './work-schedule-config';
import { SmartNotificationManager } from './smart-notification-manager';

interface LifeReminder {
  id: string;
  text: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

const defaultReminders: LifeReminder[] = [
  {
    id: '1',
    text: 'Text her before she texts you 😉',
    category: 'Relationships',
    priority: 'medium',
    createdAt: new Date(),
  },
  {
    id: '2',
    text: "Call Mum — it's been 3 days",
    category: 'Family',
    priority: 'high',
    createdAt: new Date(),
  },
  {
    id: '3',
    text: "Go outside. You're not a vampire",
    category: 'Health',
    priority: 'medium',
    createdAt: new Date(),
  },
  {
    id: '4',
    text: 'Drink some water 💧',
    category: 'Health',
    priority: 'low',
    createdAt: new Date(),
  },
  {
    id: '5',
    text: 'Take a deep breath and stretch',
    category: 'Wellness',
    priority: 'low',
    createdAt: new Date(),
  },
];

const categories = [
  'Relationships',
  'Family',
  'Health',
  'Wellness',
  'Social',
  'Personal',
];
const priorities = ['low', 'medium', 'high'] as const;

export function LifeReminders() {
  const [reminders, setReminders] = useState<LifeReminder[]>(defaultReminders);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    text: '',
    category: 'Personal',
    priority: 'medium' as const,
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showScheduleConfig, setShowScheduleConfig] = useState(false);

  // Load reminders from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lifeReminders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReminders(
          parsed.map((r: any) => ({
            ...r,
            createdAt: new Date(r.createdAt),
          }))
        );
      } catch (error) {
        console.error('Error loading reminders:', error);
      }
    }
  }, []);

  // Save reminders to localStorage
  useEffect(() => {
    localStorage.setItem('lifeReminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = () => {
    if (!newReminder.text.trim()) return;

    const reminder: LifeReminder = {
      id: Date.now().toString(),
      text: newReminder.text.trim(),
      category: newReminder.category,
      priority: newReminder.priority,
      createdAt: new Date(),
    };

    setReminders(prev => [reminder, ...prev]);
    setNewReminder({ text: '', category: 'Personal', priority: 'medium' });
    setShowAddForm(false);
  };

  const removeReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const handleNotificationSent = (reminder: LifeReminder) => {
    // You can add logic here to track which reminders were sent
    // Notification sent for: ${reminder.text}
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Relationships':
        return '💕';
      case 'Family':
        return '👨‍👩‍👧‍👦';
      case 'Health':
        return '🏃‍♂️';
      case 'Wellness':
        return '🧘‍♂️';
      case 'Social':
        return '👥';
      case 'Personal':
        return '⭐';
      default:
        return '💡';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-pink-800 mb-1">
              Apart From Work
            </h2>
            <p className="text-sm text-pink-600">Life reminders that matter</p>
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Reminder
          </Button>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
          <h3 className="font-semibold text-[#333] mb-3">Add New Reminder</h3>
          <div className="space-y-3">
            <textarea
              value={newReminder.text}
              onChange={e =>
                setNewReminder(prev => ({ ...prev, text: e.target.value }))
              }
              placeholder="What do you want to remember?"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none"
              rows={3}
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                value={newReminder.category}
                onChange={e =>
                  setNewReminder(prev => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="p-2 border border-gray-300 rounded-lg"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={newReminder.priority}
                onChange={e =>
                  setNewReminder(prev => ({
                    ...prev,
                    priority: e.target.value as any,
                  }))
                }
                className="p-2 border border-gray-300 rounded-lg"
              >
                {priorities.map(pri => (
                  <option key={pri} value={pri}>
                    {pri.charAt(0).toUpperCase() + pri.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={addReminder}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Add Reminder
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="ghost"
                className="text-gray-600 hover:text-gray-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.map(reminder => (
          <div
            key={reminder.id}
            className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">
                    {getCategoryIcon(reminder.category)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {reminder.category}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(reminder.priority)}`}
                  >
                    {reminder.priority}
                  </span>
                </div>
                <p className="text-[#333] mb-2">{reminder.text}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  Added {reminder.createdAt.toLocaleDateString()}
                </div>
              </div>
              <Button
                onClick={() => removeReminder(reminder.id)}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 ml-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Smart Notification System */}
      <div className="space-y-4">
        {/* Notification Service */}
        <NotificationService onPermissionChange={setNotificationsEnabled} />

        {/* Work Schedule Configuration */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              Work Schedule Configuration
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowScheduleConfig(!showScheduleConfig)}
              className="text-blue-600 hover:text-blue-700"
            >
              {showScheduleConfig ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>

        {showScheduleConfig && <WorkScheduleConfig />}

        {/* Smart Notification Manager */}
        {notificationsEnabled && (
          <SmartNotificationManager
            reminders={reminders}
            onNotificationSent={handleNotificationSent}
          />
        )}
      </div>

      {/* Quick Add Suggestions */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-[#333] mb-3">
          💡 Quick Add Suggestions
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Take a walk outside',
            'Call a friend',
            'Practice gratitude',
            'Do something creative',
            'Connect with family',
            'Learn something new',
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                setNewReminder({
                  text: suggestion,
                  category: 'Personal',
                  priority: 'medium',
                });
                setShowAddForm(true);
              }}
              className="p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white rounded border border-gray-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
