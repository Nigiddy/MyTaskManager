'use client';

import { Search, Command } from 'lucide-react';
import { motion } from 'framer-motion';

export function SearchBar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="relative flex-1 max-w-md"
    >
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
        size={18}
      />
      <input
        type="search"
        placeholder="Search tasks, projects, or goals..."
        className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-20 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-[#4cc9f0]/50 focus:ring-2 focus:ring-[#4cc9f0]/20 transition-all duration-300"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.06] border border-white/[0.08]">
        <Command className="w-3 h-3 text-white/50" />
        <span className="text-xs text-white/50 font-medium">K</span>
      </div>
    </motion.div>
  );
}
