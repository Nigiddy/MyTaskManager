'use client';

import { useEffect, useState } from 'react';
import { DataInput } from '@/components/features/DataInput';
import { getStats } from '@/lib/api/analytics';
import { getTasks } from '@/lib/api/tasks';
import { useToast } from '@/hooks/use-toast';

const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="bg-gray-50 rounded-lg p-4 text-center">
    <p className="text-2xl font-semibold text-gray-900">{value}</p>
    <p className="text-xs text-gray-400 mt-1">{label}</p>
  </div>
);

export function DataPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  // Pre-select section from quick log buttons
  const [activeSectionId, setActiveSectionId] = useState<string>('coding-sessions');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        const [, tasks] = await Promise.all([getStats(), getTasks()]);
        if (cancelled) return;
        setTotalTasks(tasks.length);
        setCompletedTasks(tasks.filter(t => t.completed).length);
      } catch {
        /* non-fatal — stats show '—' */
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const quickLogActions: { emoji: string; label: string; sectionId: string }[] = [
    { emoji: '💻', label: 'Log Coding',   sectionId: 'coding-sessions' },
    { emoji: '📞', label: 'Log Call',     sectionId: 'call-sessions' },
    { emoji: '🏃‍♂️', label: 'Log Exercise', sectionId: 'exercise-sessions' },
    { emoji: '📚', label: 'Log Learning', sectionId: 'learning-sessions' },
  ];

  const exportActions: { emoji: string; label: string }[] = [
    { emoji: '📊', label: 'Export CSV' },
    { emoji: '📈', label: 'Export Charts' },
    { emoji: '💾', label: 'Backup Data' },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Data Tracking</h2>
        <p className="text-sm text-gray-500">Log your daily activities and build an accurate performance record.</p>
      </div>

      {/* Quick Data Actions */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">Quick Log</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLogActions.map(({ emoji, label, sectionId }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setActiveSectionId(sectionId);
                toast({ title: `${emoji} ${label}`, description: `Switched to the ${label.replace('Log ', '')} section below.` });
              }}
              className={`p-3 min-h-[44px] rounded-lg border text-sm font-medium transition-colors ${
                activeSectionId === sectionId
                  ? 'bg-[#FF9F43] border-[#FF9F43] text-white'
                  : 'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700'
              }`}
            >
              {emoji} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Data Input Form */}
      <DataInput initialSectionId={activeSectionId} />

      {/* Data Statistics */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total Tasks"     value={isLoading ? '—' : totalTasks} />
          <StatCard label="Completed Tasks" value={isLoading ? '—' : completedTasks} />
          <StatCard label="Data Entries"    value={'—'} />
          <StatCard label="Streak"          value={'—'} />
        </div>
      </div>

      {/* Export & Backup */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">Export &amp; Backup</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {exportActions.map(({ emoji, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => toast({ title: `${emoji} ${label}`, description: `${label} functionality is coming soon.` })}
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
