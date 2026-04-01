'use client';

import { useEffect, useState } from 'react';
import { PomodoroTimer } from '@/components/features/PomodoroTimer';
import { HabitStreaks } from '@/components/features/HabitStreaks';
import { MicroWins } from '@/components/features/MicroWins';
import { QuickActions } from '@/components/features/QuickActions';
import { getStats } from '@/lib/api/analytics';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useHabits } from '@/hooks/useHabits';
import { usePomodoroTimer } from '@/hooks/usePomodoroTimer';

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
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Real data from hooks
  const { completedPomodoros, formatTime, timeLeft, timerState } = usePomodoroTimer();
  const { completedToday: habitsCompleted, habits } = useHabits();

  const deepWorkMins = completedPomodoros * 25;

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
    return () => { cancelled = true; };
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

      {/* 2. Today's insights — real data from hooks */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
          Today's Insights
        </h2>
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}
        >
          <StatCard
            label="Focus Sessions"
            value={isLoading ? '—' : completedPomodoros}
            error={error}
          />
          <StatCard
            label="Deep Work"
            value={isLoading ? '—' : `${Math.floor(deepWorkMins / 60)}h ${deepWorkMins % 60}m`}
          />
          <StatCard
            label="Focus Score"
            value={isLoading ? '—' : (completedPomodoros > 0 ? `${Math.min(100, completedPomodoros * 25)}%` : '0%')}
          />
          <StatCard
            label="Habits Done"
            value={isLoading ? '—' : `${habitsCompleted}/${habits.length}`}
          />
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
            className="bg-white border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors h-11"
            onClick={() =>
              toast({
                title: '⏰ Pomodoro',
                description: 'Use the Pomodoro Timer below to start your first session.',
              })
            }
          >
            Start Pomodoro
          </Button>
          <Button
            variant="outline"
            className="bg-white border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors h-11"
            onClick={() =>
              toast({
                title: '🏆 Log Win',
                description: 'Head to the Life & Wellness page to log a micro-win.',
              })
            }
          >
            Log Win
          </Button>
          <Button
            variant="outline"
            className="bg-white border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors h-11"
            onClick={() =>
              toast({
                title: '✅ Habits',
                description: 'Use the Habit Streaks section below to mark habits done.',
              })
            }
          >
            Check Habits
          </Button>
          <Button
            variant="outline"
            className="bg-white border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors h-11"
            onClick={() =>
              toast({
                title: '📊 Stats',
                description: 'Visit the Analytics page for full productivity stats.',
              })
            }
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
