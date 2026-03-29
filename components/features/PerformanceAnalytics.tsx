/**
 * components/features/PerformanceAnalytics.tsx
 * Renders productivity heatmap, focus sessions, and weekly trends.
 * Contains static display data — no mutable state needed.
 */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { BarChart3, TrendingUp, Clock, Target, Activity, Zap, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { ProductivityData, WeeklyMetric, FocusSession } from '@/types';
import { getStats } from '@/lib/api/analytics';

function getHeatmapColor(score: number) {
  if (score >= 90) return 'bg-green-600 text-white';
  if (score >= 80) return 'bg-green-400 text-white';
  if (score >= 70) return 'bg-yellow-400 text-gray-800';
  if (score >= 60) return 'bg-orange-300 text-gray-800';
  return 'bg-red-300 text-gray-800';
}

function formatHour(h: number) {
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

export function PerformanceAnalytics() {
  const [activeTab, setActiveTab] = useState<'heatmap' | 'sessions' | 'weekly'>('heatmap');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productivityData, setProductivityData] = useState<ProductivityData[]>([]);
  const [weeklyMetrics, setWeeklyMetrics] = useState<WeeklyMetric[]>([]);
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        await getStats();
        if (cancelled) return;
        // TODO: replace with real analytics datasets from backend.
        setProductivityData([]);
        setWeeklyMetrics([]);
        setFocusSessions([]);
      } catch {
        if (cancelled) return;
        setError('Failed to load performance analytics.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const avgFocus = useMemo(() => {
    if (productivityData.length === 0) return 0;
    return Math.round(
      productivityData.reduce((s, d) => s + d.focusScore, 0) /
        productivityData.length
    );
  }, [productivityData]);

  const totalTasks = useMemo(
    () => productivityData.reduce((s, d) => s + d.tasksCompleted, 0),
    [productivityData]
  );

  const totalDeepWork = useMemo(
    () => productivityData.reduce((s, d) => s + d.deepWorkMinutes, 0),
    [productivityData]
  );

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BarChart3 size={20} className="text-[#FF9F43]" />
          <h2 className="font-semibold text-lg text-[#333]">PERFORMANCE ANALYTICS</h2>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">Today</Badge>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { icon: Target, color: 'text-blue-600', label: 'Avg Focus Score', value: `${avgFocus}%` },
          { icon: Activity, color: 'text-green-600', label: 'Tasks Complete', value: totalTasks },
          { icon: Clock, color: 'text-purple-600', label: 'Deep Work', value: `${Math.floor(totalDeepWork / 60)}h` },
        ].map(s => (
          <div key={s.label} className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-center">
            <s.icon size={18} className={`${s.color} mx-auto mb-1`} />
            <div className="text-xl font-bold text-[#333]">{isLoading ? '—' : s.value}</div>
            <div className="text-xs text-[#666]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex space-x-2 mb-4">
        {(['heatmap', 'sessions', 'weekly'] as const).map(tab => (
          <Button key={tab} variant={activeTab === tab ? 'default' : 'outline'} size="sm"
            className={`text-xs h-8 px-3 ${activeTab === tab ? 'bg-[#FF9F43]' : 'border-[#FFE8D6] text-[#666]'}`}
            onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {activeTab === 'heatmap' && (
        <div>
          <h3 className="text-sm font-medium text-[#666] mb-3">Hourly Productivity Heatmap</h3>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              {error}
            </div>
          )}
          {!error && isLoading && (
            <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-sm text-[#666]">
              Loading…
            </div>
          )}
          {!error && !isLoading && productivityData.length === 0 && (
            <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-sm text-[#666]">
              No productivity data yet.
            </div>
          )}
          {!error && !isLoading && productivityData.length > 0 && (
            <div className="grid grid-cols-6 gap-1 mb-3">
              {productivityData.map(d => (
                <div key={d.hour} className={`aspect-square rounded flex flex-col items-center justify-center p-1 cursor-pointer hover:scale-110 transition-transform ${getHeatmapColor(d.focusScore)}`}>
                  <div className="text-xs font-bold">{d.focusScore}%</div>
                  <div className="text-xs opacity-75">{formatHour(d.hour)}</div>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-center space-x-4 text-xs text-[#666]">
            {[
              { color: 'bg-red-300', label: '<60%' }, { color: 'bg-orange-300', label: '60-70%' },
              { color: 'bg-yellow-400', label: '70-80%' }, { color: 'bg-green-400', label: '80-90%' },
              { color: 'bg-green-600', label: '90%+' },
            ].map(l => (
              <div key={l.label} className="flex items-center space-x-1">
                <div className={`w-3 h-3 rounded ${l.color}`} />
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="space-y-3">
          {!isLoading && !error && focusSessions.length === 0 && (
            <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-sm text-[#666]">
              No focus sessions yet.
            </div>
          )}
          {!isLoading && !error && focusSessions.map(session => (
            <div key={session.id} className="p-3 bg-white rounded-lg border border-[#FFE8D6]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#333]">{session.task}</span>
                <Badge variant="outline" className={`text-xs ${session.focusScore >= 90 ? 'bg-green-50 text-green-700 border-green-200' : session.focusScore >= 80 ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                  {session.focusScore}% Focus
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-[#666]">
                <div><Clock size={12} className="inline mr-1" />{session.startTime}</div>
                <div><Zap size={12} className="inline mr-1" />{session.duration} min</div>
                <div><Activity size={12} className="inline mr-1" />{session.interruptions} interrupts</div>
              </div>
              <Progress value={session.focusScore} className="h-1.5 mt-2 bg-[#FFE8D6]" />
            </div>
          ))}
        </div>
      )}

      {activeTab === 'weekly' && (
        <div className="space-y-3">
          {!isLoading && !error && weeklyMetrics.length === 0 && (
            <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-sm text-[#666]">
              No weekly metrics yet.
            </div>
          )}
          {!isLoading && !error && weeklyMetrics.map(week => (
            <div key={week.week} className="p-3 bg-white rounded-lg border border-[#FFE8D6]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#333]">{week.week}</span>
                <span className="text-sm font-bold text-[#FF9F43]">{week.productivity}%</span>
              </div>
              <Progress value={week.productivity} className="h-2 bg-[#FFE8D6] mb-2" />
              <div className="grid grid-cols-3 gap-2 text-xs text-[#666]">
                <div><Clock size={12} className="inline mr-1" />{week.focusTime}h focus</div>
                <div><Target size={12} className="inline mr-1" />{week.tasksCompleted} tasks</div>
                <div><Brain size={12} className="inline mr-1" />{week.habitsMaintained}/7 habits</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
