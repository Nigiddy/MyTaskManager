'use client';

import { motion } from 'framer-motion';
import { Target, TrendingUp, type LucideIcon } from 'lucide-react';

type StatPillProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: string;
  index: number;
};

function StatPill({ icon: Icon, label, value, color, index }: StatPillProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/10 transition-all duration-300 cursor-pointer"
    >
      <div
        className="flex items-center justify-center w-7 h-7 rounded-lg"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={14} style={{ color }} />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-semibold text-white">{value}</span>
        <span className="text-xs text-white/60">{label}</span>
      </div>
    </motion.div>
  );
}

export function QuickStats() {
  return (
    <div className="hidden items-center gap-3 lg:flex">
      <StatPill icon={Target} value={5} label="Goals" color="#4cc9f0" index={0} />
      <StatPill icon={TrendingUp} value="85%" label="Productivity" color="#10b981" index={1} />
    </div>
  );
}
