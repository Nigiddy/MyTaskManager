'use client';

import { useEffect, useState } from 'react';
import { PomodoroTimer } from '@/components/features/PomodoroTimer';
import { HabitStreaks } from '@/components/features/HabitStreaks';
import { MicroWins } from '@/components/features/MicroWins';
import { QuickActions } from '@/components/features/QuickActions';
import { getStats } from '@/lib/api/analytics';
import { Button } from '@/components/ui/button';

const StatCard = ({
  label,
  value,
  error,
}: {
  label: string;
  value: string | number;
  error?: string | null;
}) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <p className="text-2xl font-medium text-gray-900">{value}</p>
    <p className="text-xs text-gray-400">{label}</p>
    {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
  </div>
);

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
        setError('Failed to load insights');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8 space-y-12">
      {/* 1. Page Header */}
      <header className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Productivity</h1>
        <p className="text-[13px] text-gray-400 mt-1">
          Focus, build habits, and track your daily wins.
        </p>
      </header>

      {/* 2. Today's insights */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
          Today's Insights
        </h2>
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}
        >
          <StatCard label="Focus Sessions" value={isLoading ? '—' : 0} error={error} />
          <StatCard label="Deep Work" value={isLoading ? '—' : '0h 0m'} />
          <StatCard label="Focus Score" value={isLoading ? '—' : '0%'} />
          <StatCard label="Habits Done" value={isLoading ? '—' : '0/0'} />
        </div>
      </section>

      {/* 3. Quick start */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
          Quick Start
        </h2>
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}
        >
          <Button
            variant="outline"
            className="bg-white border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Start Pomodoro
          </Button>
          <Button
            variant="outline"
            className="bg-white border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Log Win
          </Button>
          <Button
            variant="outline"
            className="bg-white border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Check Habits
          </Button>
          <Button
            variant="outline"
            className="bg-white border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View Stats
          </Button>
        </div>
      </section>

      {/* 4. Main tools */}
      <div
        className="grid gap-8"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
      >
        <section>
          <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
            Pomodoro Timer
          </h2>
          <PomodoroTimer />
        </section>
        <section>
          <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
            Habit Streaks
          </h2>
          <HabitStreaks />
        </section>
      </div>

      {/* 5. Micro wins + Quick actions */}
      <div
        className="grid gap-8"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
      >
        <section>
          <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
            Micro Wins
          </h2>
          <MicroWins />
        </section>
        <section>
          <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
            Quick Actions
          </h2>
          <QuickActions />
        </section>
      </div>

      {/* 6. Productivity tips */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
          Productivity Tips
        </h2>
        <div
          className="grid gap-x-8 gap-y-2 text-[13px] text-gray-500"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          <p>– Use Pomodoro technique for focused work sessions</p>
          <p>– Track micro-wins to build momentum</p>
          <p>– Maintain habit streaks for consistency</p>
          <p>– Take regular breaks to maintain focus</p>
        </div>
      </section>
    </div>
  );
}
