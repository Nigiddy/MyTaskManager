'use client';

import { motion } from 'framer-motion';
import { Plus, Target } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { FocusTask } from '@/types';
import { getTasks } from '@/lib/api/tasks';

export function MyTasks() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<FocusTask[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const base = await getTasks();
        if (cancelled) return;
        const focus: FocusTask[] = base.map(t => ({
          id: t.id,
          title: t.name,
          category: t.category,
          priority: t.priority,
          progress: t.completed ? 100 : 0,
        }));
        setTasks(focus);
      } catch {
        if (cancelled) return;
        setError('Failed to load focus areas.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const getPriorityStyles = (priority: FocusTask['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      case 'Medium':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Low':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  const getCategoryStyles = (category: FocusTask['category']) => {
    switch (category) {
      case 'Projects':
        return { bg: 'from-orange-500 to-amber-500', icon: 'bg-orange-500/20' };
      case 'Learning':
        return { bg: 'from-violet-500 to-purple-500', icon: 'bg-violet-500/20' };
      case 'Business':
        return { bg: 'from-indigo-500 to-blue-500', icon: 'bg-indigo-500/20' };
      case 'Design':
        return { bg: 'from-pink-500 to-rose-500', icon: 'bg-pink-500/20' };
      case 'Trading':
        return { bg: 'from-emerald-500 to-teal-500', icon: 'bg-emerald-500/20' };
      default:
        return { bg: 'from-gray-500 to-gray-600', icon: 'bg-gray-500/20' };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' as const }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-[#4cc9f0]" />
          <h2 className="font-display font-semibold text-lg text-white">My Focus Areas</h2>
        </div>
        <Button
          size="sm"
          className="h-8 px-3 bg-[#4cc9f0]/15 hover:bg-[#4cc9f0]/25 text-[#4cc9f0] rounded-lg border border-[#4cc9f0]/30 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>

      <div className="space-y-3">
        {isLoading && (
          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.06]">
            <div className="h-4 w-48 bg-white/10 rounded mb-2" />
            <div className="h-3 w-32 bg-white/10 rounded" />
          </div>
        )}

        {!isLoading && error && (
          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-sm text-red-200">
            {error}
          </div>
        )}

        {!isLoading && !error && tasks.length === 0 && (
          <div className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] text-sm text-white/60">
            No focus areas yet.
          </div>
        )}

        {!isLoading && !error && tasks.map((task, index) => {
          const categoryStyles = getCategoryStyles(task.category);
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.25,
                delay: index * 0.04,
                ease: 'easeOut' as const,
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${categoryStyles.icon} flex items-center justify-center`}>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${categoryStyles.bg}`} />
                  </div>
                  <span className="font-medium text-sm text-white group-hover:text-white/90 transition-colors">
                    {task.title}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${getPriorityStyles(task.priority)}`}
                >
                  {task.priority}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">{task.category}</span>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      transition={{ duration: 0.5, delay: 0.15 + index * 0.05, ease: 'easeOut' as const }}
                      className={`h-full rounded-full bg-gradient-to-r ${categoryStyles.bg}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-white/60 w-8 text-right">
                    {task.progress}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="mt-5 p-4 rounded-xl bg-gradient-to-r from-[#4cc9f0]/10 to-[#a29bfe]/10 border border-white/[0.06]"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Weekly Goal</span>
          <span className="font-display font-semibold bg-gradient-to-r from-[#4cc9f0] to-[#a29bfe] bg-clip-text text-transparent">
            Build - Learn - Scale
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
