// src/components/layout/QuickStats.tsx
'use client';

import { Target, TrendingUp, LucideIcon } from 'lucide-react';

type StatPillProps = {
  icon: LucideIcon; // ✅ explicitly typed for lucide-react icons
  label: string;
  value: string | number;
};

function StatPill({ icon: Icon, label, value }: StatPillProps) {
  return (
    <div className="glass-card flex items-center rounded-full px-3 py-2">
      <Icon size={16} className="mr-2 text-accent" />
      <span className="text-sm font-medium text-primary">
        {value} <span className="text-secondary">{label}</span>
      </span>
    </div>
  );
}

export function QuickStats() {
  return (
    <div className="hidden items-center space-x-4 md:flex">
      <StatPill icon={Target} value={5} label="Active Goals" />
      <StatPill icon={TrendingUp} value="85%" label="Productivity" />
    </div>
  );
}
