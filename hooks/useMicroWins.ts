/**
 * hooks/useMicroWins.ts
 * Owns micro-wins list state: add, delete, and derived stats.
 */
import { useState } from 'react';
import type { MicroWin } from '@/types';

const defaultWins: MicroWin[] = [
  { id: 1, title: 'Did 20 push-ups between code sessions', description: 'Stayed active and energized during long coding hours', category: 'fitness', impact: 'medium', completedAt: new Date(), tags: ['fitness', 'discipline', 'energy'] },
  { id: 2, title: "Didn't touch social media till lunch", description: 'Maintained focus and productivity in the morning', category: 'discipline', impact: 'high', completedAt: new Date(), tags: ['focus', 'productivity', 'self-control'] },
  { id: 3, title: 'Drank 8 glasses of water today', description: 'Stayed hydrated throughout the day', category: 'health', impact: 'medium', completedAt: new Date(), tags: ['health', 'hydration', 'wellness'] },
  { id: 4, title: 'Called Mum and had a great chat', description: 'Maintained important relationships', category: 'relationships', impact: 'high', completedAt: new Date(), tags: ['family', 'connection', 'balance'] },
];

export function useMicroWins() {
  const [wins, setWins] = useState<MicroWin[]>(defaultWins);

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
  const todayWins = wins.filter(w => new Date(w.completedAt).toDateString() === today.toDateString()).length;
  const highImpactWins = wins.filter(w => w.impact === 'high').length;

  return { wins, addWin, deleteWin, todayWins, highImpactWins };
}
