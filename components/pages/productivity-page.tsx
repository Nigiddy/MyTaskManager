'use client';

import { useEffect, useState } from 'react';
import { PomodoroTimer } from '@/components/features/PomodoroTimer';
import { HabitStreaks } from '@/components/features/HabitStreaks';
import { MicroWins } from '@/components/features/MicroWins';
import { QuickActions } from '@/components/features/QuickActions';
import { getStats } from '@/lib/api/analytics';

export function ProductivityPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        await getStats();
      } catch {
        if (cancelled) return;
        setError('Failed to load productivity insights.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-800 mb-2">
            Productivity Tools
          </h2>
          <p className="text-sm text-purple-600">
            Focus, build habits, and track your daily wins
          </p>
        </div>
      </div>

      {/* Main Productivity Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PomodoroTimer />
        <HabitStreaks />
      </div>

      {/* Micro-Wins and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MicroWins />
        <QuickActions />
      </div>

      {/* Productivity Insights */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">
          Today's Productivity Insights
        </h3>
        {error && (
          <div className="p-2 mb-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{isLoading ? '—' : 0}</div>
            <div className="text-xs text-[#666]">Focus Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{isLoading ? '—' : '0h 0m'}</div>
            <div className="text-xs text-[#666]">Deep Work</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{isLoading ? '—' : '0%'}</div>
            <div className="text-xs text-[#666]">Focus Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{isLoading ? '—' : '0/0'}</div>
            <div className="text-xs text-[#666]">Habits Done</div>
          </div>
        </div>
      </div>

      {/* Productivity Tips */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3">
          💡 Productivity Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
          <div>• Use Pomodoro technique for focused work sessions</div>
          <div>• Track micro-wins to build momentum</div>
          <div>• Maintain habit streaks for consistency</div>
          <div>• Take regular breaks to maintain focus</div>
        </div>
      </div>

      {/* Quick Start Actions */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">Quick Start</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-3 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 text-red-700 text-sm font-medium transition-colors">
            🍅 Start Pomodoro
          </button>
          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-green-700 text-sm font-medium transition-colors">
            ✅ Log Win
          </button>
          <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-blue-700 text-sm font-medium transition-colors">
            🔥 Check Habits
          </button>
          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-purple-700 text-sm font-medium transition-colors">
            📊 View Stats
          </button>
        </div>
      </div>
    </div>
  );
}
