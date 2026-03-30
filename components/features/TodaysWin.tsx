'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTodaysWins } from '@/hooks/useTodaysWins';

export function TodaysWin() {
  const { wins, isLoading, error, addNewWin } = useTodaysWins();
  const [todaysWin, setTodaysWin] = useState("Shipped the new feature and cleared my inbox.");
  const [isEditing, setIsEditing] = useState(false);

  const todaysWinText = wins.length > 0 ? wins[0].title : todaysWin;

  const handleSave = () => {
    if (wins.length === 0) {
      addNewWin(); // This is a placeholder, in a real scenario you'd pass the text
    }
    // Logic to save the updated win text would go here
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6">
      {isLoading && <p className="text-[12px] text-gray-400">Loading...</p>}
      {error && <p className="text-[12px] text-red-500">{error}</p>}
      
      {!isLoading && !error && (
        <div className="flex items-center justify-between">
          {isEditing ? (
            <input
              type="text"
              value={todaysWinText}
              onChange={(e) => setTodaysWin(e.target.value)}
              className="flex-grow text-[13px] text-gray-700 bg-transparent focus:outline-none"
              autoFocus
            />
          ) : (
            <p className="text-[13px] text-gray-700">
              {todaysWinText || "What was your big win today?"}
            </p>
          )}

          <Button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            variant="ghost" 
            className="text-[13px] text-gray-400 hover:text-gray-700"
          >
            {isEditing ? "Save" : (todaysWinText ? "Edit" : "Add today's win")}
          </Button>
        </div>
      )}
    </div>
  );
}
