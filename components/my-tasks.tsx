'use client';

import { motion } from 'framer-motion';
import { Plus, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Task = {
  id: number;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  progress: number;
};

export function MyTasks() {
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Complete WiFi Billing System MVP',
      category: 'Projects',
      priority: 'High',
      progress: 75,
    },
    {
      id: 2,
      title: 'Python Data Structures Mastery',
      category: 'Learning',
      priority: 'Medium',
      progress: 60,
    },
    {
      id: 3,
      title: 'Dem Man Brand Strategy Session',
      category: 'Business',
      priority: 'High',
      progress: 40,
    },
    {
      id: 4,
      title: 'Portfolio Website Redesign',
      category: 'Design',
      priority: 'Medium',
      progress: 30,
    },
    {
      id: 5,
      title: 'Trading Strategy Optimization',
      category: 'Trading',
      priority: 'Low',
      progress: 85,
    },
  ];

  const getPriorityStyles = (priority: string) => {
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

  const getCategoryStyles = (category: string) => {
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
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-[#4cc9f0]" />
          <h2 className="font-display font-semibold text-lg text-white">MY FOCUS AREAS</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10 rounded-lg"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => {
          const categoryStyles = getCategoryStyles(task.category);
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.3 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
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
                <span className="text-xs text-white/40">{task.category}</span>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-5 p-4 rounded-xl bg-gradient-to-r from-[#4cc9f0]/10 to-[#a29bfe]/10 border border-white/[0.06]"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/50">Weekly Goal</span>
          <span className="font-display font-semibold bg-gradient-to-r from-[#4cc9f0] to-[#a29bfe] bg-clip-text text-transparent">
            Build - Learn - Scale
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
