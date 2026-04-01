'use client';

import { useEffect, useState } from 'react';
import { PerformanceAnalytics } from '@/components/features/PerformanceAnalytics';
import { BusinessIntelligence } from '@/components/business-intelligence';
import { LearningProgress } from '@/components/features/LearningProgress';
import { CaseTypeBreakdown } from '@/components/case-type-breakdown';
import { getStats } from '@/lib/api/analytics';
import { useToast } from '@/hooks/use-toast';

export function AnalyticsPage() {
  const { toast } = useToast();
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
        setError('Failed to load weekly summary.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const quickAnalyticsActions = [
    { emoji: '📊', label: 'Export Data' },
    { emoji: '📈', label: 'Trends' },
    { emoji: '🎯', label: 'Goals' },
    { emoji: '📅', label: 'Timeline' },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">Analytics &amp; Insights</h2>
          <p className="text-sm text-indigo-600">
            Track performance, monitor business metrics, and analyze your progress
          </p>
        </div>
      </div>

      {/* Performance Analytics */}
      <PerformanceAnalytics />

      {/* Business Intelligence */}
      <BusinessIntelligence />

      {/* Learning Progress */}
      <LearningProgress />

      {/* Case Type Breakdown */}
      <CaseTypeBreakdown />

      {/* Analytics Summary */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">This Week's Summary</h3>
        {error && (
          <div className="p-2 mb-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Productivity', value: isLoading ? '—' : '—', color: 'blue',   note: 'Once tasks are tracked' },
            { label: 'Focus Time',   value: isLoading ? '—' : '—', color: 'green',  note: 'Once Pomodoros are logged' },
            { label: 'Tasks Done',   value: isLoading ? '—' : '—', color: 'purple', note: 'Once tasks are completed' },
            { label: 'Habits',       value: isLoading ? '—' : '—', color: 'orange', note: 'Once habits are tracked' },
          ].map(stat => (
            <div key={stat.label} className={`text-center p-3 bg-${stat.color}-50 rounded-lg`}>
              <div className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</div>
              <div className={`text-xs text-${stat.color}-600`}>{stat.label}</div>
              {!isLoading && (
                <div className={`text-[10px] text-${stat.color}-400 mt-1`}>{stat.note}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-800 mb-3">🔍 Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-700">
          <div>• Your insights will appear once analytics data is connected.</div>
          <div>• Track tasks and projects to populate trends and summaries.</div>
          <div>• Use consistent labels to improve reporting accuracy.</div>
          <div>• Review weekly to spot patterns and adjust goals.</div>
        </div>
      </div>

      {/* Quick Analytics Actions */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">Quick Analytics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickAnalyticsActions.map(({ emoji, label }) => (
            <button
              key={label}
              type="button"
              onClick={() =>
                toast({
                  title: `${emoji} ${label}`,
                  description: `${label} functionality is coming soon.`,
                })
              }
              className="p-3 min-h-[44px] bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-blue-700 text-sm font-medium transition-colors"
            >
              {emoji} {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
