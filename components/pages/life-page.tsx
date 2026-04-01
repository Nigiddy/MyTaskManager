'use client';

import { useEffect, useState } from 'react';
import { LifeReminders } from '@/components/features/LifeReminders';
import { MicroWins } from '@/components/features/MicroWins';
import { TodaysWin } from '@/components/features/TodaysWin';
import { WorkScheduleConfig } from '@/components/features/WorkScheduleConfig';
import { getStats } from '@/lib/api/analytics';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// ── Inline stat card ──────────────────────────────────────────────────────────
const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="rounded-lg bg-gray-50 p-4">
    <p className="text-[13px] text-gray-700">{label}</p>
    <p className="text-2xl font-semibold text-gray-900">{value}</p>
  </div>
);

const GoalProgress = ({ name, progress }: { name: string; progress: number }) => (
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
  const { toast } = useToast();

  // ── API loading state ──────────────────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setApiError(null);
        await getStats();
      } catch {
        if (cancelled) return;
        setApiError('Failed to load wellness stats.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ── Quick-log counters (local state) ──────────────────────────────────────
  const [water, setWater] = useState(0);
  const [exercise, setExercise] = useState(0);
  const [calls, setCalls] = useState(0);
  const [meditations, setMeditations] = useState(0);

  const logWater      = () => { setWater(p => p + 1);       toast({ title: '💧 Water logged!', description: `${water + 1} glass${water + 1 === 1 ? '' : 'es'} today` }); };
  const logExercise   = () => { setExercise(p => p + 30);   toast({ title: '🏃‍♂️ Exercise logged!', description: `${exercise + 30} min today` }); };
  const logCall       = () => { setCalls(p => p + 1);        toast({ title: '📞 Family call logged!', description: `${calls + 1} call${calls + 1 === 1 ? '' : 's'} today` }); };
  const logMeditate   = () => { setMeditations(p => p + 1); toast({ title: '🧘 Meditation logged!', description: `${meditations + 1} session${meditations + 1 === 1 ? '' : 's'} today` }); };

  // ── Notification settings (controlled switches) ────────────────────────────
  const [scheduleAware, setScheduleAware] = useState(true);
  const [minInterval, setMinInterval] = useState(true);
  const [allowWeekends, setAllowWeekends] = useState(false);
  const [showWorkConfig, setShowWorkConfig] = useState(false);

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8 space-y-12">

      {/* ── Global API error ───────────────────────────────────────────────────── */}
      {apiError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {apiError}
        </div>
      )}

      {/* 1. Page Header */}
      <header className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Life & Wellness</h1>
        <p className="text-[13px] text-gray-400 mt-1">
          Balance work with life, track wellness, and maintain relationships.
        </p>
      </header>

      {/* 2. Today at a glance (uses live counters after log) */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
          Today at a glance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Water" value={isLoading ? '—' : `${water} glass${water === 1 ? '' : 'es'}`} />
          <StatCard label="Exercise" value={isLoading ? '—' : `${exercise} min`} />
          <StatCard label="Sleep" value={isLoading ? '—' : '7h 30m'} />
          <StatCard label="Social" value={isLoading ? '—' : `${calls} call${calls === 1 ? '' : 's'}`} />
        </div>
      </section>

      {/* 3. Quick log */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
          Quick Log
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button variant="outline" onClick={logWater}    className="bg-white border-gray-200 rounded-lg px-3 py-2 text-[13px] hover:bg-gray-50 transition-colors justify-start h-11">💧 Log Water</Button>
          <Button variant="outline" onClick={logExercise} className="bg-white border-gray-200 rounded-lg px-3 py-2 text-[13px] hover:bg-gray-50 transition-colors justify-start h-11">🏃‍♂️ Log Exercise</Button>
          <Button variant="outline" onClick={logCall}     className="bg-white border-gray-200 rounded-lg px-3 py-2 text-[13px] hover:bg-gray-50 transition-colors justify-start h-11">📞 Call Family</Button>
          <Button variant="outline" onClick={logMeditate} className="bg-white border-gray-200 rounded-lg px-3 py-2 text-[13px] hover:bg-gray-50 transition-colors justify-start h-11">🧘 Meditate</Button>
        </div>
      </section>

      {/* 4. Reminders + Micro Wins */}
      <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <section>
          <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">Reminders</h2>
          <LifeReminders />
        </section>
        <section>
          <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">Micro Wins</h2>
          <MicroWins />
        </section>
      </div>

      {/* 5. Today's Win */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">Today's Win</h2>
        <TodaysWin />
      </section>

      {/* 6. Personal Goals */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">Personal Goals</h2>
        <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
          <GoalProgress name="Read 30 minutes daily" progress={75} />
          <GoalProgress name="Exercise 5 days/week" progress={40} />
          <GoalProgress name="Call family weekly" progress={100} />
        </div>
      </section>

      {/* 7. Notifications */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">Notifications</h2>
        <div className="bg-white border border-gray-100 rounded-xl">
          <div className="p-4 flex items-center justify-between">
            <span className="text-[13px] text-gray-700">Schedule-aware notifications</span>
            <Switch
              checked={scheduleAware}
              onCheckedChange={setScheduleAware}
            />
          </div>
          <Separator className="bg-gray-100" />
          <div className="p-4 flex items-center justify-between">
            <span className="text-[13px] text-gray-700">Minimum 30-minute interval</span>
            <Switch
              checked={minInterval}
              onCheckedChange={setMinInterval}
            />
          </div>
          <Separator className="bg-gray-100" />
          <div className="p-4 flex items-center justify-between">
            <span className="text-[13px] text-gray-700">Allow on weekends</span>
            <Switch
              checked={allowWeekends}
              onCheckedChange={setAllowWeekends}
            />
          </div>
          <Separator className="bg-gray-100" />
          <div className="p-4 flex items-center justify-between">
            <span className="text-[13px] text-gray-700">Configure work hours</span>
            <Button
              variant="ghost"
              className="text-[12px] text-gray-400 hover:text-gray-700"
              onClick={() => setShowWorkConfig(v => !v)}
            >
              {showWorkConfig ? 'Hide' : '9:00 AM – 5:00 PM'}
            </Button>
          </div>
          {showWorkConfig && (
            <div className="px-4 pb-4">
              <WorkScheduleConfig />
            </div>
          )}
        </div>
      </section>

      {/* 8. Life balance tips */}
      <section>
        <h2 className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">Life Balance Tips</h2>
        <div className="grid gap-x-8 gap-y-2 text-[13px] text-gray-700" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <p>• Take regular breaks from screens</p>
          <p>• Stay connected with family &amp; friends</p>
          <p>• Prioritize sleep and exercise</p>
          <p>• Practice gratitude daily</p>
        </div>
      </section>

    </div>
  );
}
