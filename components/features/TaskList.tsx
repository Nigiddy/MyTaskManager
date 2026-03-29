/**
 * components/features/TaskList.tsx
 * Renders the daily power routine task list.
 * All state logic lives in useTasks().
 */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ListTodo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/hooks/useTasks';
import type { Task, Priority } from '@/types';

function getCategoryStyles(category: string) {
  const map: Record<string, { color: string; bg: string; border: string }> = {
    Fitness: { color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)' },
    Coding: { color: '#10b981', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.3)' },
    Learning: { color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.3)' },
    Projects: { color: '#f97316', bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.3)' },
    Business: { color: '#6366f1', bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.3)' },
    Design: { color: '#ec4899', bg: 'rgba(236,72,153,0.15)', border: 'rgba(236,72,153,0.3)' },
    Trading: { color: '#34d399', bg: 'rgba(52,211,153,0.15)', border: 'rgba(52,211,153,0.3)' },
  };
  return map[category] ?? { color: 'rgba(255,255,255,0.6)', bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.15)' };
}

function getPriorityStyles(priority: Priority) {
  const map: Record<Priority, { color: string; bg: string; border: string }> = {
    Low: { color: '#10b981', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.3)' },
    Medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)' },
    High: { color: '#ef4444', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)' },
  };
  return map[priority];
}

function AnimatedCheckbox({ checked, onChange, accentColor }: { checked: boolean; onChange: () => void; accentColor: string }) {
  return (
    <motion.button
      onClick={onChange}
      className="relative flex-shrink-0 h-6 w-6 rounded-lg border-2 transition-all duration-200 focus:outline-none"
      style={{ borderColor: checked ? accentColor : 'rgba(255,255,255,0.2)', backgroundColor: checked ? accentColor : 'transparent' }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {checked && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute inset-0 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function TaskRow({ task, index, onToggle }: { task: Task; index: number; onToggle: () => void }) {
  const Icon = task.icon;
  const cat = getCategoryStyles(task.category);
  const pri = getPriorityStyles(task.priority);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} layout
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeInOut' as const }}
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
        task.completed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04]'
      }`}
      onClick={onToggle}
    >
      <AnimatedCheckbox checked={task.completed} onChange={onToggle} accentColor={cat.color} />
      <motion.div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ backgroundColor: cat.bg }}
        animate={{ scale: task.completed ? 0.9 : 1 }} transition={{ duration: 0.2 }}>
        <Icon className="w-5 h-5" style={{ color: cat.color }} />
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <motion.span className={`font-medium text-sm truncate transition-all duration-300 ${task.completed ? 'text-white/40 line-through' : 'text-white'}`}
            animate={{ opacity: task.completed ? 0.5 : 1 }}>
            {task.name}
          </motion.span>
          <span className="flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-md"
            style={{ backgroundColor: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}>
            {task.category}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs text-white/30">{task.time}</span>
          <span className="px-2 py-0.5 text-xs font-medium rounded-md"
            style={{ backgroundColor: pri.bg, color: pri.color, border: `1px solid ${pri.border}` }}>
            {task.priority}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function TaskList() {
  const { tasks, isLoading, error, toggleComplete, completedCount, completionPercent } = useTasks();

  return (
    <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeInOut' as const }} className="glass-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <ListTodo className="w-5 h-5 text-[#4cc9f0]" />
          <h2 className="font-display font-semibold text-lg text-white">Your Daily Power Routine</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-white/60 hover:text-white hover:bg-white/10">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="space-y-2">
        {isLoading && (
          <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="h-4 w-40 rounded bg-white/10 mb-2" />
            <div className="h-3 w-28 rounded bg-white/10" />
          </div>
        )}

        {!isLoading && error && (
          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-sm text-red-200">
            {error}
          </div>
        )}

        {!isLoading && !error && tasks.length === 0 && (
          <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-sm text-white/60">
            No tasks yet — create your first one.
          </div>
        )}

        {!isLoading && !error && tasks.map((task, i) => (
          <TaskRow key={task.id} task={task} index={i} onToggle={() => void toggleComplete(task.id)} />
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="mt-5 flex items-center justify-between text-sm">
        <span className="text-white/60">{completedCount} of {tasks.length} completed</span>
        <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-[#4cc9f0] to-[#a29bfe] rounded-full"
            initial={{ width: 0 }} animate={{ width: `${completionPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' as const }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
