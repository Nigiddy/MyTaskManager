/**
 * hooks/useLifeReminders.ts
 * Owns life reminders state with localStorage persistence.
 */
'use client';

import { useState, useEffect } from 'react';
import type { LifeReminder } from '@/types';

const defaultReminders: LifeReminder[] = [
  { id: '1', text: 'Text her before she texts you 😉', category: 'Relationships', priority: 'medium', createdAt: new Date() },
  { id: '2', text: "Call Mum — it's been 3 days", category: 'Family', priority: 'high', createdAt: new Date() },
  { id: '3', text: "Go outside. You're not a vampire", category: 'Health', priority: 'medium', createdAt: new Date() },
  { id: '4', text: 'Drink some water 💧', category: 'Health', priority: 'low', createdAt: new Date() },
  { id: '5', text: 'Take a deep breath and stretch', category: 'Wellness', priority: 'low', createdAt: new Date() },
];

export function useLifeReminders() {
  const [reminders, setReminders] = useState<LifeReminder[]>(defaultReminders);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('lifeReminders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReminders(parsed.map((r: LifeReminder) => ({ ...r, createdAt: new Date(r.createdAt) })));
      } catch { /* use defaults */ }
    }
  }, []);

  // Persist on every change
  useEffect(() => {
    localStorage.setItem('lifeReminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (text: string, category: string, priority: LifeReminder['priority']) => {
    if (!text.trim()) return;
    const reminder: LifeReminder = {
      id: Date.now().toString(),
      text: text.trim(),
      category,
      priority,
      createdAt: new Date(),
    };
    setReminders(prev => [reminder, ...prev]);
  };

  const removeReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  return { reminders, addReminder, removeReminder };
}
