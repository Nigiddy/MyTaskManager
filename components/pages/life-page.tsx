'use client';

import { useEffect, useState } from 'react';
import { LifeReminders } from '@/components/features/LifeReminders';
import { MicroWins } from '@/components/features/MicroWins';
import { TodaysWin } from '@/components/features/TodaysWin';
import { getStats } from '@/lib/api/analytics';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const StatCard = ({ label, value, error }: { label: string, value: string | number, error?: string | null }) => (
  <div className="rounded-lg bg-gray-50 p-4">
    <p className="text-[13px] text-gray-700">{label}</p>
    <p className="text-2xl font-semibold text-gray-900">{value}</p>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const GoalProgress = ({ name, progress }: { name: string, progress: number }) => (
  <div className="text-[13px] text-gray-700">
    <div className="flex justify-between mb-1">
      <span>{name}</span>
      <span>{progress}%</span>
    </div>
    <div className="h-[3px] rounded-full bg-gray-200">
      <div className="bg-gray-800 h-[3px] rounded-full" style={{ width: `${progress}%` }} />
    </div>
  </div>
);

export function LifePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        await getStats();
      } catch (e) {
        if (cancelled) return;
        setError('Failed to load wellness stats.');
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
        <h1 className="text-2xl font-bold text-gray-800">Life & Wellness</h1>
        <p className="text-[13px] text-gray-400 mt-1">
          Balance work with life, track wellness, and maintain relationships.
        </p>
      </header>

      {/* 2. Today at a glance */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
          Today at a glance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Water" value={isLoading ? '—' : '8 glasses'} error={error ? "Error" : null} />
          <StatCard label="Exercise" value={isLoading ? '—' : '30 min'} />
          <StatCard label="Sleep" value={isLoading ? '—' : '7h 30m'} />
          <StatCard label="Social" value={isLoading ? '—' : '1 call'} />
        </div>
      </section>

      {/* 3. Quick log */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
          Quick Log
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
          <Button variant="outline" className="bg-white border-gray-200 rounded-lg px-3 py-2 text-[13px] hover:bg-gray-50 transition-colors justify-start">💧 Log Water</Button>
          <Button variant="outline" className="bg-white border-gray-200 rounded-lg px-3 py-2 text-[13px] hover:bg-gray-50 transition-colors justify-start">🏃‍♂️ Log Exercise</Button>
          <Button variant="outline" className="bg-white border-gray-200 rounded-lg px-3 py-2 text-[13px] hover:bg-gray-50 transition-colors justify-start">📞 Call Family</Button>
          <Button variant="outline" className="bg-white border-gray-200 rounded-lg px-3 py-2 text-[13px] hover:bg-gray-50 transition-colors justify-start">🧘 Meditate</Button>
        </div>
      </section>

      {/* 4. Reminders + Micro Wins */}
      <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <section>
          <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
            Reminders
          </h2>
          <LifeReminders />
        </section>
        <section>
          <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
            Micro Wins
          </h2>
          <MicroWins />
        </section>
      </div>

      {/* 5. Today's Win */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
          Today's Win
        </h2>
        <TodaysWin />
      </section>

      {/* 6. Personal Goals */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
          Personal Goals
        </h2>
        <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
            <GoalProgress name="Read 30 minutes daily" progress={75} />
            <GoalProgress name="Exercise 5 days/week" progress={40} />
            <GoalProgress name="Call family weekly" progress={100} />
        </div>
      </section>

      {/* 7. Notifications */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
          Notifications
        </h2>
        <div className="bg-white border border-gray-100 rounded-xl">
          <div className="p-4 flex items-center justify-between">
            <span className="text-[13px] text-gray-700">Schedule-aware notifications</span>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-gray-100" />
          <div className="p-4 flex items-center justify-between">
            <span className="text-[13px] text-gray-700">Minimum 30-minute interval</span>
            <Switch defaultChecked/>
          </div>
          <Separator className="bg-gray-100" />
          <div className="p-4 flex items-center justify-between">
            <span className="text-[13px] text-gray-700">Allow on weekends</span>
            <Switch />
          </div>
          <Separator className="bg-gray-100" />
          <div className="p-4 flex items-center justify-between">
             <span className="text-[13px] text-gray-700">Configure work hours</span>
             <Button variant="ghost" className="text-[12px] text-gray-400">9:00 AM - 5:00 PM</Button>
          </div>
        </div>
      </section>
      
      {/* 8. Life balance tips */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
            Life Balance Tips
        </h2>
        <div className="grid gap-x-8 gap-y-2 text-[13px] text-gray-700" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <p>• Take regular breaks from screens</p>
            <p>• Stay connected with family & friends</p>
            <p>• Prioritize sleep and exercise</p>
            <p>• Practice gratitude daily</p>
        </div>
      </section>

    </div>
  );
}
