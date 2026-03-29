/**
 * hooks/useHabits.ts
 * Owns the habit tracking state and toggle action.
 */
import { useEffect, useMemo, useState } from 'react';
import type { Habit } from '@/types';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      setError(null);
      const saved = localStorage.getItem('habits');
      if (saved) {
        setHabits(JSON.parse(saved) as Habit[]);
      } else {
        setHabits([]);
      }
    } catch {
      setHabits([]);
      setError('Failed to load habits.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits, isLoading]);

  const toggleHabitCompletion = (habitId: number) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === habitId
          ? { ...habit, completedToday: !habit.completedToday }
          : habit
      )
    );
  };

  const totalStreaks = useMemo(
    () => habits.reduce((sum, h) => sum + h.currentStreak, 0),
    [habits]
  );
  const completedToday = useMemo(
    () => habits.filter(h => h.completedToday).length,
    [habits]
  );
  const completionRate = useMemo(() => {
    if (habits.length === 0) return 0;
    return Math.round((completedToday / habits.length) * 100);
  }, [completedToday, habits.length]);

  return {
    habits,
    isLoading,
    error,
    toggleHabitCompletion,
    totalStreaks,
    completedToday,
    completionRate,
  };
}
