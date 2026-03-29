/**
 * hooks/useTasks.ts
 * Owns the daily task list state and exposes toggle action.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Task } from '@/types';
import { getTasks, updateTask } from '@/lib/api/tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getTasks();
        if (cancelled) return;
        setTasks(data);
      } catch {
        if (cancelled) return;
        setError('Failed to load tasks.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleComplete = useCallback(
    async (taskId: number) => {
      const existing = tasks.find(t => t.id === taskId);
      if (!existing) return;

      const nextCompleted = !existing.completed;
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId ? { ...task, completed: nextCompleted } : task
        )
      );

      try {
        await updateTask(taskId, { completed: nextCompleted });
      } catch {
        // Revert optimistic update
        setTasks(prev =>
          prev.map(task =>
            task.id === taskId ? { ...task, completed: existing.completed } : task
          )
        );
      }
    },
    [tasks]
  );

  const completedCount = useMemo(
    () => tasks.filter(t => t.completed).length,
    [tasks]
  );

  const completionPercent = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((completedCount / tasks.length) * 100);
  }, [completedCount, tasks.length]);

  return {
    tasks,
    isLoading,
    error,
    toggleComplete,
    completedCount,
    completionPercent,
  };
}
