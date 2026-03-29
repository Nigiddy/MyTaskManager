/**
 * components/features/PerformanceAnalytics.tsx
 * Renders productivity heatmap, focus sessions, and weekly trends.
 * Contains static display data — no mutable state needed.
 */
'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Clock, Target, Activity, Zap, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { ProductivityData, WeeklyMetric, FocusSession } from '@/types';

const productivityData: ProductivityData[] = [
  { hour: 4, focusScore: 95, tasksCompleted: 2, deepWorkMinutes: 90 },
  { hour: 5, focusScore: 90, tasksCompleted: 1, deepWorkMinutes: 60 },
  { hour: 6, focusScore: 88, tasksCompleted: 3, deepWorkMinutes: 180 },
  { hour: 7, focusScore: 85, tasksCompleted: 2, deepWorkMinutes: 120 },
  { hour: 8, focusScore: 82, tasksCompleted: 1, deepWorkMinutes: 60 },
  { hour: 9, focusScore: 78, tasksCompleted: 2, deepWorkMinutes: 90 },
  { hour: 10, focusScore: 75, tasksCompleted: 1, deepWorkMinutes: 60 },
  { hour: 11, focusScore: 72, tasksCompleted: 2, deepWorkMinutes: 90 },
  { hour: 12, focusScore: 65, tasksCompleted: 1, deepWorkMinutes: 30 },
  { hour: 13, focusScore: 70, tasksCompleted: 2, deepWorkMinutes: 60 },
  { hour: 14, focusScore: 75, tasksCompleted: 3, deepWorkMinutes: 90 },
  { hour: 15, focusScore: 80, tasksCompleted: 2, deepWorkMinutes: 120 },
  { hour: 16, focusScore: 78, tasksCompleted: 2, deepWorkMinutes: 90 },
  { hour: 17, focusScore: 75, tasksCompleted: 1, deepWorkMinutes: 60 },
  { hour: 18, focusScore: 70, tasksCompleted: 2, deepWorkMinutes: 60 },
  { hour: 19, focusScore: 68, tasksCompleted: 1, deepWorkMinutes: 45 },
  { hour: 20, focusScore: 65, tasksCompleted: 2, deepWorkMinutes: 60 },
  { hour: 21, focusScore: 60, tasksCompleted: 1, deepWorkMinutes: 30 },
];

const weeklyMetrics: WeeklyMetric[] = [
  { week: 'Week 1', productivity: 85, focusTime: 42, tasksCompleted: 45, habitsMaintained: 6 },
  { week: 'Week 2', productivity: 88, focusTime: 45, tasksCompleted: 48, habitsMaintained: 7 },
  { week: 'Week 3', productivity: 82, focusTime: 40, tasksCompleted: 42, habitsMaintained: 5 },
  { week: 'Week 4', productivity: 90, focusTime: 48, tasksCompleted: 52, habitsMaintained: 7 },
];

const focusSessions: FocusSession[] = [
  { id: 1, startTime: '4:00 AM', duration: 90, task: 'Full-Stack Development', focusScore: 95, interruptions: 0 },
  { id: 2, startTime: '6:00 AM', duration: 120, task: 'Python Learning', focusScore: 88, interruptions: 1 },
  { id: 3, startTime: '9:00 AM', duration: 60, task: 'Business Strategy', focusScore: 82, interruptions: 2 },
  { id: 4, startTime: '2:00 PM', duration: 90, task: 'Sales Outreach', focusScore: 78, interruptions: 3 },
];

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

  const avgFocus = Math.round(productivityData.reduce((s, d) => s + d.focusScore, 0) / productivityData.length);
  const totalTasks = productivityData.reduce((s, d) => s + d.tasksCompleted, 0);
  const totalDeepWork = productivityData.reduce((s, d) => s + d.deepWorkMinutes, 0);

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
            <div className="text-xl font-bold text-[#333]">{s.value}</div>
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
          <div className="grid grid-cols-6 gap-1 mb-3">
            {productivityData.map(d => (
              <div key={d.hour} className={`aspect-square rounded flex flex-col items-center justify-center p-1 cursor-pointer hover:scale-110 transition-transform ${getHeatmapColor(d.focusScore)}`}>
                <div className="text-xs font-bold">{d.focusScore}%</div>
                <div className="text-xs opacity-75">{formatHour(d.hour)}</div>
              </div>
            ))}
          </div>
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
          {focusSessions.map(session => (
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
          {weeklyMetrics.map(week => (
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
