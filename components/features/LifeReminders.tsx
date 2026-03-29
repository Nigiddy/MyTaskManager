/**
 * components/features/LifeReminders.tsx
 * Renders life reminders with localStorage persistence.
 * All state lives in useLifeReminders().
 */
'use client';

import { useState } from 'react';
import { Plus, X, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLifeReminders } from '@/hooks/useLifeReminders';
import { NotificationService } from '@/components/notification-service';
import { WorkScheduleConfig } from '@/components/features/WorkScheduleConfig';
import { SmartNotificationManager } from '@/components/smart-notification-manager';
import type { LifeReminder } from '@/types';

const categories = ['Relationships', 'Family', 'Health', 'Wellness', 'Social', 'Personal'];
const priorities: LifeReminder['priority'][] = ['low', 'medium', 'high'];

const priorityColor: Record<LifeReminder['priority'], string> = {
  high: 'text-red-600 bg-red-50 border-red-200',
  medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  low: 'text-green-600 bg-green-50 border-green-200',
};

const categoryIcon: Record<string, string> = { Relationships: '💕', Family: '👨‍👩‍👧‍👦', Health: '🏃‍♂️', Wellness: '🧘‍♂️', Social: '👥', Personal: '⭐' };

export function LifeReminders() {
  const { reminders, isLoading, error, addReminder, removeReminder } = useLifeReminders();
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState<LifeReminder['priority']>('medium');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showScheduleConfig, setShowScheduleConfig] = useState(false);

  const handleAdd = () => {
    addReminder(text, category, priority);
    setText(''); setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-pink-800 mb-1">Apart From Work</h2>
            <p className="text-sm text-pink-600">Life reminders that matter</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-pink-600 hover:bg-pink-700 text-white">
            <Plus className="h-4 w-4 mr-1" />Add Reminder
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
          <h3 className="font-semibold text-[#333] mb-3">Add New Reminder</h3>
          <div className="space-y-3">
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="What do you want to remember?"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none" rows={3} />
            <div className="grid grid-cols-2 gap-3">
              <select value={category} onChange={e => setCategory(e.target.value)} className="p-2 border border-gray-300 rounded-lg">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={priority} onChange={e => setPriority(e.target.value as LifeReminder['priority'])} className="p-2 border border-gray-300 rounded-lg">
                {priorities.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white">Add Reminder</Button>
              <Button onClick={() => setShowForm(false)} variant="ghost" className="text-gray-600">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {isLoading && (
          <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
            <div className="h-4 w-40 bg-[#FFE8D6] rounded mb-2" />
            <div className="h-3 w-24 bg-[#FFE8D6] rounded" />
          </div>
        )}

        {!isLoading && error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            {error}
          </div>
        )}

        {!isLoading && !error && reminders.length === 0 && (
          <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm text-sm text-[#666]">
            No reminders yet — add your first one.
          </div>
        )}

        {!isLoading && !error && reminders.map(r => (
          <div key={r.id} className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{categoryIcon[r.category] ?? '💡'}</span>
                  <span className="text-sm text-gray-500">{r.category}</span>
                  <span className={`px-2 py-1 rounded-full text-xs border ${priorityColor[r.priority]}`}>{r.priority}</span>
                </div>
                <p className="text-[#333] mb-2">{r.text}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />Added {r.createdAt.toLocaleDateString()}
                </div>
              </div>
              <Button onClick={() => removeReminder(r.id)} variant="ghost" size="sm" className="text-red-600 hover:text-red-700 ml-2">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <NotificationService onPermissionChange={setNotificationsEnabled} />
        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">Work Schedule Configuration</span>
            <Button variant="ghost" size="sm" onClick={() => setShowScheduleConfig(!showScheduleConfig)} className="text-blue-600 hover:text-blue-700">
              {showScheduleConfig ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>
        {showScheduleConfig && <WorkScheduleConfig />}
        {notificationsEnabled && <SmartNotificationManager reminders={reminders} onNotificationSent={() => {}} />}
      </div>

      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-[#333] mb-1">💡 Quick Add</h3>
        <div className="text-sm text-gray-600">
          Suggestions will appear once recommendation data is connected.
        </div>
      </div>
    </div>
  );
}
