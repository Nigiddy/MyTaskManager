import {
  MoreHorizontal,
  MessageSquare,
  Users,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AssignedTask } from '@/types';
import { getTasks } from '@/lib/api/tasks';

export function AssignedTasks() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<AssignedTask[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        // TODO: replace with a real "assigned tasks" endpoint later.
        // For now, we map general tasks into this view with minimal defaults.
        const base = await getTasks();
        if (cancelled) return;
        const mapped: AssignedTask[] = base.map(t => ({
          id: t.id,
          title: t.name,
          client: '',
          status: t.completed ? 'Completed' : 'Pending',
          priority: t.priority,
        }));
        setTasks(mapped);
      } catch {
        if (cancelled) return;
        setError('Failed to load outreach tasks.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">BUSINESS OUTREACH</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-[#FF9F43] hover:bg-[#FFE8D6]"
        >
          <MessageSquare size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        {isLoading && (
          <div className="p-3 bg-white rounded-lg border border-[#FFE8D6]">
            <div className="h-4 w-40 bg-[#FFE8D6] rounded mb-2" />
            <div className="h-3 w-24 bg-[#FFE8D6] rounded" />
          </div>
        )}

        {!isLoading && error && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        {!isLoading && !error && tasks.length === 0 && (
          <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-sm text-[#666]">
            No outreach tasks yet.
          </div>
        )}

        {!isLoading && !error && tasks.map(task => (
          <div
            key={task.id}
            className="p-3 bg-white rounded-lg border border-[#FFE8D6] hover:border-[#FF9F43] transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-2 text-[#FF9F43]" />
                <span className="text-sm font-medium text-[#333]">
                  {task.title}
                </span>
              </div>
              <Badge
                variant="outline"
                className={`text-xs ${getPriorityColor(task.priority)}`}
              >
                {task.priority}
              </Badge>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#666] flex items-center">
                <Users size={12} className="mr-1" />
                {task.client || '—'}
              </span>
              <Badge
                variant="outline"
                className={`text-xs ${getStatusColor(task.status)}`}
              >
                {task.status}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#999]">Client Acquisition</span>
              <span className="text-[#FF9F43] font-medium">Scale Up</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666]">Outreach Goal</span>
          <span className="font-bold text-[#FF9F43]">
            Connect • Convert • Scale
          </span>
        </div>
      </div>
    </div>
  );
}
