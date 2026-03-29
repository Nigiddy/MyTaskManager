/**
 * hooks/useLifeReminders.ts
 * Owns life reminders state with localStorage persistence.
 */
'use client';

import { useState, useEffect } from 'react';
import type { LifeReminder } from '@/types';

export function useLifeReminders() {
  const [reminders, setReminders] = useState<LifeReminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      setIsLoading(true);
      setError(null);
      const saved = localStorage.getItem('lifeReminders');
      if (saved) {
        const parsed = JSON.parse(saved);
        setReminders(
          (parsed as LifeReminder[]).map((r: LifeReminder) => ({
            ...r,
            createdAt: new Date(r.createdAt),
          }))
        );
      } else {
        setReminders([]);
      }
    } catch {
      setError('Failed to load reminders.');
      setReminders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Persist on every change
  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem('lifeReminders', JSON.stringify(reminders));
  }, [isLoading, reminders]);

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

  return { reminders, isLoading, error, addReminder, removeReminder };
}
