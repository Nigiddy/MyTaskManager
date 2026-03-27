'use client';

import { motion } from 'framer-motion';
import { TaskList } from '@/components/task-list';
import { Calendar } from '@/components/calendar';
import { MyTasks } from '@/components/my-tasks';
import { AssignedTasks } from '@/components/assigned-tasks';
import { CaseTypeBreakdown } from '@/components/case-type-breakdown';
import { CheckSquare, Plus, CalendarDays, BarChart3, RefreshCw } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function TasksPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-6 border-emerald-500/20"
      >
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">Tasks & Projects</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Tasks & Projects
          </h2>
          <p className="text-sm text-white/50">
            Manage your daily tasks, track project progress, and stay organized
          </p>
        </div>
      </motion.div>

      {/* Main Task Management */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskList />
        <div className="space-y-6">
          <Calendar />
          <MyTasks />
        </div>
      </motion.div>

      {/* Business Tasks and Breakdown */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssignedTasks />
        <CaseTypeBreakdown />
      </motion.div>

      {/* Quick Task Actions */}
      <motion.div variants={itemVariants} className="glass-card p-5">
        <h3 className="font-display font-semibold text-white mb-4">Quick Task Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Task', icon: Plus, color: '#10b981' },
            { label: 'Schedule', icon: CalendarDays, color: '#3b82f6' },
            { label: 'Progress', icon: BarChart3, color: '#8b5cf6' },
            { label: 'Repeat', icon: RefreshCw, color: '#f97316' },
          ].map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 text-white/70 hover:text-white text-sm font-medium transition-all duration-300"
            >
              <action.icon className="w-4 h-4" style={{ color: action.color }} />
              {action.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Task Statistics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Active Tasks', value: '12', color: '#4cc9f0' },
          { label: 'Completed Today', value: '8', color: '#10b981' },
          { label: 'Projects Active', value: '3', color: '#8b5cf6' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-5 text-center"
          >
            <div
              className="font-display text-3xl font-bold mb-1"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-sm text-white/50">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
