'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  FileText,
  Code,
  TrendingUp,
  Briefcase,
  Dumbbell,
  Palette,
  MessageSquare,
  Check,
  ListTodo,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Priority = 'Low' | 'Medium' | 'High';
type Task = {
  id: number;
  name: string;
  time?: string;
  priority: Priority;
  category: string;
  icon: React.ElementType;
  completed: boolean;
};

// Custom animated checkbox component
function AnimatedCheckbox({
  checked,
  onChange,
  accentColor,
}: {
  checked: boolean;
  onChange: () => void;
  accentColor: string;
}) {
  return (
    <motion.button
      onClick={onChange}
      className="relative flex-shrink-0 h-6 w-6 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
      style={{
        borderColor: checked ? accentColor : 'rgba(255, 255, 255, 0.2)',
        backgroundColor: checked ? accentColor : 'transparent',
      }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {checked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: '4:00 AM - Morning Workout & Meditation',
      time: '4:00 AM - 5:30 AM',
      priority: 'High',
      category: 'Fitness',
      icon: Dumbbell,
      completed: false,
    },
    {
      id: 2,
      name: 'Full-Stack Development Session',
      time: '6:00 AM - 9:00 AM',
      priority: 'High',
      category: 'Coding',
      icon: Code,
      completed: false,
    },
    {
      id: 3,
      name: 'Python Learning & Practice',
      time: '9:30 AM - 11:00 AM',
      priority: 'Medium',
      category: 'Learning',
      icon: Code,
      completed: false,
    },
    {
      id: 4,
      name: 'WiFi Billing System Development',
      time: '11:30 AM - 2:00 PM',
      priority: 'High',
      category: 'Projects',
      icon: Briefcase,
      completed: false,
    },
    {
      id: 5,
      name: 'Sales Outreach - Cybercafes',
      time: '2:30 PM - 4:00 PM',
      priority: 'Medium',
      category: 'Business',
      icon: MessageSquare,
      completed: false,
    },
    {
      id: 6,
      name: 'Discord Community Client Outreach',
      time: '4:30 PM - 6:00 PM',
      priority: 'Medium',
      category: 'Business',
      icon: MessageSquare,
      completed: false,
    },
    {
      id: 7,
      name: 'UI/UX Design Work Session',
      time: '6:30 PM - 8:00 PM',
      priority: 'Low',
      category: 'Design',
      icon: Palette,
      completed: false,
    },
    {
      id: 8,
      name: 'Trading Review & Analysis',
      time: '8:30 PM - 9:30 PM',
      priority: 'Medium',
      category: 'Trading',
      icon: TrendingUp,
      completed: false,
    },
    {
      id: 9,
      name: 'Business Strategy - Dem Man & Dicla',
      time: '10:00 PM - 11:00 PM',
      priority: 'High',
      category: 'Business',
      icon: Briefcase,
      completed: false,
    },
    {
      id: 10,
      name: 'Evening Reflection & Journaling',
      time: '11:30 PM - 12:00 AM',
      priority: 'Low',
      category: 'Personal',
      icon: FileText,
      completed: false,
    },
  ]);

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Fitness':
        return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' };
      case 'Coding':
        return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)' };
      case 'Learning':
        return { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' };
      case 'Projects':
        return { color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)', border: 'rgba(249, 115, 22, 0.3)' };
      case 'Business':
        return { color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.3)' };
      case 'Design':
        return { color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' };
      case 'Trading':
        return { color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)', border: 'rgba(52, 211, 153, 0.3)' };
      case 'Personal':
        return { color: 'rgba(255, 255, 255, 0.6)', bg: 'rgba(255, 255, 255, 0.08)', border: 'rgba(255, 255, 255, 0.15)' };
      default:
        return { color: 'rgba(255, 255, 255, 0.6)', bg: 'rgba(255, 255, 255, 0.08)', border: 'rgba(255, 255, 255, 0.15)' };
    }
  };

  const getPriorityStyles = (priority: Priority) => {
    switch (priority) {
      case 'Low':
        return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)' };
      case 'Medium':
        return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' };
      case 'High':
        return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)' };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeInOut' as const }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <ListTodo className="w-5 h-5 text-[#4cc9f0]" />
          <h2 className="font-display font-semibold text-lg text-white">YOUR DAILY POWER ROUTINE</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-white/40 hover:text-white hover:bg-white/10"
        >
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-2">
        {tasks.map((task, index) => {
          const Icon = task.icon;
          const categoryStyles = getCategoryStyles(task.category);
          const priorityStyles = getPriorityStyles(task.priority);

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: 'easeInOut' as const,
              }}
              layout
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
                task.completed
                  ? 'bg-emerald-500/5 border-emerald-500/20'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04]'
              }`}
              onClick={() => toggleTaskCompletion(task.id)}
            >
              <AnimatedCheckbox
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                accentColor={categoryStyles.color}
              />

              <motion.div
                className="flex items-center justify-center w-10 h-10 rounded-xl"
                style={{ backgroundColor: categoryStyles.bg }}
                animate={{ scale: task.completed ? 0.9 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-5 h-5" style={{ color: categoryStyles.color }} />
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <motion.span
                    className={`font-medium text-sm truncate transition-all duration-300 ${
                      task.completed
                        ? 'text-white/40 line-through'
                        : 'text-white group-hover:text-white/90'
                    }`}
                    animate={{ opacity: task.completed ? 0.5 : 1 }}
                  >
                    {task.name}
                  </motion.span>
                  <span
                    className="flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-md"
                    style={{
                      backgroundColor: categoryStyles.bg,
                      color: categoryStyles.color,
                      border: `1px solid ${categoryStyles.border}`,
                    }}
                  >
                    {task.category}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs text-white/30">{task.time}</span>
                  <span
                    className="px-2 py-0.5 text-xs font-medium rounded-md"
                    style={{
                      backgroundColor: priorityStyles.bg,
                      color: priorityStyles.color,
                      border: `1px solid ${priorityStyles.border}`,
                    }}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Completed count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 flex items-center justify-between text-sm"
      >
        <span className="text-white/40">
          {tasks.filter(t => t.completed).length} of {tasks.length} completed
        </span>
        <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#4cc9f0] to-[#a29bfe] rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' as const }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
