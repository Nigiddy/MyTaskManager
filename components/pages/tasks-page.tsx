'use client';

import { motion } from 'framer-motion';
import { TaskList } from '@/components/features/TaskList';
import { Calendar } from '@/components/calendar';
import { MyTasks } from '@/components/my-tasks';
import { AssignedTasks } from '@/components/assigned-tasks';
import { CaseTypeBreakdown } from '@/components/case-type-breakdown';
import { CheckSquare, Plus, CalendarDays, BarChart3, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: 'easeOut' as const,
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
      {/* Page Header with Prominent Add Task Button */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Tasks & Projects
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-1">
            Tasks & Projects
          </h2>
          <p className="text-sm text-white/60">
            Manage your daily tasks and track project progress
          </p>
        </div>
        
        {/* Prominent Add Task Button */}
        <Button
          className="group flex items-center gap-2 px-5 py-2.5 h-auto bg-gradient-to-r from-[#4cc9f0] to-[#10b981] hover:from-[#4cc9f0]/90 hover:to-[#10b981]/90 text-white font-semibold rounded-xl shadow-lg shadow-[#4cc9f0]/20 hover:shadow-[#4cc9f0]/30 transition-all duration-300"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
          <span>Add New Task</span>
        </Button>
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
        <h3 className="font-display font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Schedule Task', icon: CalendarDays, color: '#3b82f6' },
            { label: 'View Progress', icon: BarChart3, color: '#8b5cf6' },
            { label: 'Repeat Task', icon: RefreshCw, color: '#f97316' },
            { label: 'Bulk Add', icon: Plus, color: '#10b981' },
          ].map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 text-white/70 hover:text-white text-sm font-medium transition-all duration-200"
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05, duration: 0.25, ease: 'easeOut' as const }}
            className="glass-card p-5 text-center"
          >
            <div
              className="font-display text-3xl font-bold mb-1"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-sm text-white/60">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
