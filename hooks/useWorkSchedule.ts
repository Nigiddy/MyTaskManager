/**
 * hooks/useWorkSchedule.ts
 * Owns work schedule configuration state with localStorage persistence.
 */
'use client';

import { useState, useEffect } from 'react';
import type { WorkSchedule } from '@/types';

const defaultSchedule: WorkSchedule = {
  workHours: [
    { start: '09:00', end: '12:00', label: 'Morning Work' },
    { start: '13:00', end: '17:00', label: 'Afternoon Work' },
  ],
  breaks: [
    { start: '10:30', end: '10:45', label: 'Morning Break' },
    { start: '15:00', end: '15:15', label: 'Afternoon Break' },
    { start: '12:00', end: '13:00', label: 'Lunch Break' },
  ],
  isEnabled: true,
};

export function useWorkSchedule(onScheduleChange?: (s: WorkSchedule) => void) {
  const [schedule, setSchedule] = useState<WorkSchedule>(defaultSchedule);
  const [isEditing, setIsEditing] = useState(false);
  const [tempSchedule, setTempSchedule] = useState<WorkSchedule>(defaultSchedule);

  useEffect(() => {
    const saved = localStorage.getItem('workSchedule');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSchedule(parsed);
        setTempSchedule(parsed);
      } catch { /* use defaults */ }
    }
  }, []);

  const saveSchedule = () => {
    setSchedule(tempSchedule);
    setIsEditing(false);
    localStorage.setItem('workSchedule', JSON.stringify(tempSchedule));
    onScheduleChange?.(tempSchedule);
  };

  const cancelEdit = () => { setTempSchedule(schedule); setIsEditing(false); };

  const addWorkHour = () => setTempSchedule(prev => ({ ...prev, workHours: [...prev.workHours, { start: '09:00', end: '17:00', label: 'New Work Period' }] }));
  const removeWorkHour = (i: number) => setTempSchedule(prev => ({ ...prev, workHours: prev.workHours.filter((_, idx) => idx !== i) }));
  const addBreak = () => setTempSchedule(prev => ({ ...prev, breaks: [...prev.breaks, { start: '10:00', end: '10:15', label: 'New Break' }] }));
  const removeBreak = (i: number) => setTempSchedule(prev => ({ ...prev, breaks: prev.breaks.filter((_, idx) => idx !== i) }));

  const updateWorkHour = (i: number, field: string, value: string) =>
    setTempSchedule(prev => ({ ...prev, workHours: prev.workHours.map((h, idx) => idx === i ? { ...h, [field]: value } : h) }));

  const updateBreak = (i: number, field: string, value: string) =>
    setTempSchedule(prev => ({ ...prev, breaks: prev.breaks.map((b, idx) => idx === i ? { ...b, [field]: value } : b) }));

  const toggleSchedule = () => setTempSchedule(prev => ({ ...prev, isEnabled: !prev.isEnabled }));

  return { schedule, tempSchedule, isEditing, setIsEditing, saveSchedule, cancelEdit, addWorkHour, removeWorkHour, addBreak, removeBreak, updateWorkHour, updateBreak, toggleSchedule };
}
