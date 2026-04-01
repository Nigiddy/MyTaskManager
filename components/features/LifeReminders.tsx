'use client';

import { useState } from 'react';
import { Plus, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLifeReminders } from '@/hooks/useLifeReminders';
import type { LifeReminder } from '@/types';

const categoryIcon: Record<string, string> = { Relationships: '💕', Family: '👨‍👩‍👧‍👦', Health: '🏃‍♂️', Wellness: '🧘‍♂️', Social: '👥', Personal: '⭐' };

export function LifeReminders() {
  const { reminders, isLoading, error, addReminder, removeReminder } = useLifeReminders();
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (!text.trim()) return;
    addReminder(text, 'Personal', 'medium');
    setText('');
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
      {/* Reminder Items */}
      {isLoading && <p className="text-[12px] text-gray-400">Loading...</p>}
      {error && <p className="text-[12px] text-red-500">{error}</p>}

      {!isLoading && !error && reminders.length === 0 && (
        <p className="text-[12px] text-gray-400 text-center py-4">No reminders yet. Add one below!</p>
      )}

      <div className="space-y-2">
        {!isLoading && !error && reminders.map(r => (
          <div key={r.id} className="flex items-start justify-between p-2 rounded-lg hover:bg-gray-50">
            <div className="flex-1">
              <p className="text-[13px] text-gray-700">{categoryIcon[r.category] ?? '💡'} {r.text}</p>
              <div className="flex items-center text-[12px] text-gray-400 mt-1">
                <Clock className="h-3 w-3 mr-1" />
                Added {r.createdAt.toLocaleDateString()}
              </div>
            </div>
            <Button
              onClick={() => removeReminder(r.id)}
              variant="ghost"
              size="sm"
              // 44×44 px tap target
              className="text-gray-400 hover:text-red-500 h-10 w-10 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add Reminder Input */}
      <div className="flex items-center gap-2 pt-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Add a new reminder..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-gray-400 min-h-[44px]"
        />
        <Button
          onClick={handleAdd}
          size="sm"
          className="bg-gray-800 hover:bg-gray-900 text-white px-3 h-11"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
