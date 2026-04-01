/**
 * hooks/useTodaysWins.ts
 * Owns today's win list state: add, celebrate, and derived stats.
 */
import { useEffect, useMemo, useState } from 'react';
import type { Win } from '@/types';

export function useTodaysWins() {
  const [wins, setWins] = useState<Win[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [celebratingWinId, setCelebratingWinId] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      setError(null);
      const saved = localStorage.getItem('todaysWins');
      if (saved) {
        setWins(JSON.parse(saved) as Win[]);
      } else {
        setWins([]);
      }
    } catch {
      setWins([]);
      setError('Failed to load today\u2019s wins.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem('todaysWins', JSON.stringify(wins));
  }, [isLoading, wins]);

  const celebrateWin = (winId: number) => {
    setCelebratingWinId(winId);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setCelebratingWinId(null);
    }, 3000);
  };

  /** Add a win with a hardcoded title (legacy helper). */
  const addNewWin = () => {
    addWinWithTitle('New Achievement Unlocked!');
  };

  /** Add a win using the caller-supplied title. */
  const addWinWithTitle = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const newWin: Win = {
      id: Date.now(),
      title: trimmed,
      description: "You've accomplished something amazing today",
      category: 'Personal',
      impact: 'High',
      timeSpent: '1 hour',
      celebration: '🌟 Win saved!',
    };
    setWins(prev => [newWin, ...prev]);
    celebrateWin(newWin.id);
  };

  const highImpactWins = useMemo(
    () => wins.filter(w => w.impact === 'High').length,
    [wins]
  );
  const totalTimeSpent = useMemo(() => {
    return wins.reduce((sum, win) => {
      const n = Number(win.timeSpent.replace(/[^0-9.]/g, ''));
      return sum + (Number.isFinite(n) ? n : 0);
    }, 0);
  }, [wins]);

  return {
    wins,
    isLoading,
    error,
    celebratingWinId,
    showConfetti,
    celebrateWin,
    addNewWin,
    addWinWithTitle,
    highImpactWins,
    totalTimeSpent,
  };
}
