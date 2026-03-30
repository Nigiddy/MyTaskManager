'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMicroWins } from '@/hooks/useMicroWins';

const impactIcon: Record<string, string> = { high: '🔥', medium: '⚡', low: '💡' };

export function MicroWins() {
  const { wins, isLoading, error, addWin, deleteWin } = useMicroWins();
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    addWin(title, '', 'discipline', 'medium');
    setTitle('');
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
      {/* Wins List */}
      {isLoading && <p className="text-[12px] text-gray-400">Loading...</p>}
      {error && <p className="text-[12px] text-red-500">{error}</p>}

      {!isLoading && !error && wins.length === 0 && (
        <p className="text-[12px] text-gray-400 text-center py-4">No wins yet. Add one below!</p>
      )}

      <div className="space-y-2">
        {!isLoading && !error && wins.map(win => (
          <div key={win.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
            <span className="text-[13px] text-gray-700">{impactIcon[win.impact]} {win.title}</span>
            <Button onClick={() => deleteWin(win.id)} variant="ghost" size="sm" className="text-gray-400 hover:text-red-500 h-7 w-7">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Add Win Input */}
      <div className="flex items-center gap-2 pt-2">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Log a small win..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <Button onClick={handleAdd} size="sm" className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
