'use client';

import { motion } from 'framer-motion';
import { WelcomeCard } from '@/components/welcome-card';
import { StatsCards } from '@/components/stats-cards';
import { TimeGreeting } from '@/components/time-greeting';
import { DailyQuote } from '@/components/daily-quote';
import { QuickActions } from '@/components/features/QuickActions';
import { InlineAmbientMessage } from '@/components/ambient-messages';
import { Home, Sparkles, Smartphone } from 'lucide-react';

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
      ease: 'easeInOut' as const,
    },
  },
};

export function HomePage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WelcomeCard />
        </div>
        <div className="lg:col-span-1">
          <TimeGreeting />
        </div>
      </motion.div>

      {/* Daily Quote and Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DailyQuote />
        </div>
        <div className="lg:col-span-1">
          <StatsCards />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <QuickActions />
      </motion.div>

      {/* Ambient Message */}
      <motion.div variants={itemVariants}>
        <InlineAmbientMessage />
      </motion.div>

      {/* Page Description */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-6 border-[#4cc9f0]/20"
      >
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4cc9f0]/10 border border-[#4cc9f0]/20 mb-4">
            <Home className="w-4 h-4 text-[#4cc9f0]" />
            <span className="text-xs font-medium text-[#4cc9f0]">Command Center</span>
          </div>
          <h3 className="font-display text-lg font-semibold text-white mb-2">
            Welcome to Your Command Center
          </h3>
          <p className="text-sm text-white/50 mb-4 max-w-lg mx-auto">
            This is your daily overview. Use the sidebar to navigate to specific
            areas: Tasks, Productivity, Analytics, and more.
          </p>

          {/* Mobile Navigation Tips */}
          <div className="block lg:hidden mt-6">
            <div className="flex items-center justify-center gap-2 text-white/40 text-xs mb-3">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Tips</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-white/50 max-w-xs mx-auto">
              <div className="p-2 rounded-lg bg-white/[0.03]">Tap menu to open sidebar</div>
              <div className="p-2 rounded-lg bg-white/[0.03]">Swipe between sections</div>
              <div className="p-2 rounded-lg bg-white/[0.03]">Optimized for mobile</div>
              <div className="p-2 rounded-lg bg-white/[0.03]">Touch-friendly buttons</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Page Navigation for Mobile */}
      <motion.div variants={itemVariants} className="block lg:hidden">
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-white mb-4 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#4cc9f0]" />
            Quick Navigation
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Tasks', color: '#10b981', icon: 'list' },
              { label: 'Productivity', color: '#8b5cf6', icon: 'zap' },
              { label: 'Analytics', color: '#3b82f6', icon: 'chart' },
              { label: 'Life', color: '#ec4899', icon: 'heart' },
            ].map((item) => (
              <button
                key={item.label}
                className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 text-white/70 hover:text-white text-sm font-medium transition-all duration-300 active:scale-95"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
