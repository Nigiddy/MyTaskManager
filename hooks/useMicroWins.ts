/**
 * hooks/useMicroWins.ts
 * Owns micro-wins list state: add, delete, and derived stats.
 */
import { useEffect, useMemo, useState } from 'react';
import type { MicroWin } from '@/types';

export function useMicroWins() {
  const [wins, setWins] = useState<MicroWin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      setError(null);
      const saved = localStorage.getItem('microWins');
      if (saved) {
        const parsed = JSON.parse(saved) as MicroWin[];
        setWins(
          parsed.map(w => ({
            ...w,
            completedAt: new Date(w.completedAt),
          }))
        );
      } else {
        setWins([]);
      }
    } catch {
      setWins([]);
      setError('Failed to load micro-wins.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem('microWins', JSON.stringify(wins));
  }, [isLoading, wins]);

  const addWin = (title: string, description: string, category: string, impact: MicroWin['impact']) => {
    const win: MicroWin = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category,
      impact,
      completedAt: new Date(),
      tags: [category, impact],
    };
    setWins(prev => [win, ...prev]);
  };

  const deleteWin = (id: number) => {
    setWins(prev => prev.filter(w => w.id !== id));
  };

  const today = new Date();
  const todayWins = useMemo(
    () =>
      wins.filter(w => new Date(w.completedAt).toDateString() === today.toDateString()).length,
    [today, wins]
  );
  const highImpactWins = useMemo(
    () => wins.filter(w => w.impact === 'high').length,
    [wins]
  );

  return { wins, isLoading, error, addWin, deleteWin, todayWins, highImpactWins };
}
