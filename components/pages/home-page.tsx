'use client';

import { motion } from 'framer-motion';
import { WelcomeCard } from '@/components/welcome-card';
import { StatsCards } from '@/components/stats-cards';
import { TimeGreeting } from '@/components/time-greeting';
import { QuickActions } from '@/components/features/QuickActions';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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
      duration: 0.3,
      ease: 'easeOut' as const,
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

      {/* Stats Overview */}
      <motion.div variants={itemVariants}>
        <StatsCards />
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <QuickActions />
      </motion.div>
    </motion.div>
  );
}
