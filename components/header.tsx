'use client';

import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';
import { QuickStats } from './QuickStats';
import { NotificationBell } from './NotificationBell';
import { UserProfile } from './UserProfile';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' as const }}
      className="glass-panel flex h-20 items-center mx-4 mt-4 mb-6 px-6"
    >
      <SearchBar />
      <div className="ml-auto flex items-center gap-4">
        <QuickStats />
        <div className="h-8 w-px bg-white/10 hidden md:block" />
        <NotificationBell />
        <UserProfile />
      </div>
    </motion.header>
  );
}
