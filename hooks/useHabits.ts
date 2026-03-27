/**
 * hooks/useHabits.ts
 * Owns the habit tracking state and toggle action.
 */
import { useState } from 'react';
import type { Habit } from '@/types';

const initialHabits: Habit[] = [
  { id: 1, name: '4 AM Wake-up', icon: '🌅', currentStreak: 7, longestStreak: 12, completedToday: true, category: 'Productivity' },
  { id: 2, name: 'Morning Workout', icon: '💪', currentStreak: 5, longestStreak: 8, completedToday: true, category: 'Fitness' },
  { id: 3, name: 'Coding Session', icon: '💻', currentStreak: 9, longestStreak: 15, completedToday: false, category: 'Learning' },
  { id: 4, name: 'Business Strategy', icon: '🎯', currentStreak: 3, longestStreak: 6, completedToday: false, category: 'Business' },
  { id: 5, name: 'Evening Reflection', icon: '📝', currentStreak: 4, longestStreak: 7, completedToday: false, category: 'Productivity' },
];

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  const toggleHabitCompletion = (habitId: number) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === habitId
          ? { ...habit, completedToday: !habit.completedToday }
          : habit
      )
    );
  };

  const totalStreaks = habits.reduce((sum, h) => sum + h.currentStreak, 0);
  const completedToday = habits.filter(h => h.completedToday).length;
  const completionRate = Math.round((completedToday / habits.length) * 100);

  return { habits, toggleHabitCompletion, totalStreaks, completedToday, completionRate };
}
