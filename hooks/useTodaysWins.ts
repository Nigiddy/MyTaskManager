/**
 * hooks/useTodaysWins.ts
 * Owns today's win list state: add, celebrate, and derived stats.
 */
import { useState } from 'react';
import type { Win } from '@/types';

const defaultWins: Win[] = [
  { id: 1, title: 'Completed WiFi Billing MVP', description: 'Finished core functionality for cybercafé management system', category: 'Development', impact: 'High', timeSpent: '4 hours', celebration: '🎉 Major milestone achieved!' },
  { id: 2, title: '4 AM Workout Streak', description: 'Maintained 7-day consecutive early morning workout routine', category: 'Fitness', impact: 'High', timeSpent: '1.5 hours', celebration: '💪 Discipline champion!' },
  { id: 3, title: 'Python Data Structures', description: 'Mastered advanced Python data structures and algorithms', category: 'Learning', impact: 'Medium', timeSpent: '2 hours', celebration: '🧠 Knowledge expanded!' },
];

export function useTodaysWins() {
  const [wins, setWins] = useState<Win[]>(defaultWins);
  const [celebratingWinId, setCelebratingWinId] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const celebrateWin = (winId: number) => {
    setCelebratingWinId(winId);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setCelebratingWinId(null);
    }, 3000);
  };

  const addNewWin = () => {
    const newWin: Win = {
      id: Date.now(),
      title: 'New Achievement Unlocked!',
      description: "You've accomplished something amazing today",
      category: 'Personal',
      impact: 'High',
      timeSpent: '1 hour',
      celebration: '🌟 New win added!',
    };
    setWins(prev => [newWin, ...prev]);
    celebrateWin(newWin.id);
  };

  const highImpactWins = wins.filter(w => w.impact === 'High').length;
  const totalTimeSpent = wins.reduce((sum, win) => {
    const hours = parseFloat(win.timeSpent.replace(' hours', '').replace(' hour', ''));
    return sum + hours;
  }, 0);

  return { wins, celebratingWinId, showConfetti, celebrateWin, addNewWin, highImpactWins, totalTimeSpent };
}
