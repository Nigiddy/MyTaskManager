'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTodaysWins } from '@/hooks/useTodaysWins';

export function TodaysWin() {
  const { wins, isLoading, error, addWinWithTitle } = useTodaysWins();

  // Separate local state for typing vs. the persisted value shown when not editing
  const persistedTitle = wins.length > 0 ? wins[0].title : '';
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleStartEdit = () => {
    // Pre-fill the input with current persisted value so user can edit it
    setInputValue(persistedTitle || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    const text = inputValue.trim();
    if (text) {
      addWinWithTitle(text);
    }
    setIsEditing(false);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') { setIsEditing(false); setInputValue(''); }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6">
      {isLoading && <p className="text-[12px] text-gray-400">Loading...</p>}
      {error && <p className="text-[12px] text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="flex items-center justify-between gap-3">
          {isEditing ? (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What was your big win today?"
              className="flex-grow text-[13px] text-gray-700 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-600 pb-0.5"
              autoFocus
            />
          ) : (
            <p className="text-[13px] text-gray-700 flex-grow">
              {persistedTitle || 'What was your big win today?'}
            </p>
          )}

          <Button
            onClick={() => (isEditing ? handleSave() : handleStartEdit())}
            variant="ghost"
            className="text-[13px] text-gray-400 hover:text-gray-700 shrink-0"
          >
            {isEditing ? 'Save' : (persistedTitle ? 'Edit' : "Add today's win")}
          </Button>
        </div>
      )}
    </div>
  );
}
