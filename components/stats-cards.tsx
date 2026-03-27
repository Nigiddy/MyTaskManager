'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart } from '@/components/ui/chart';

export function StatsCards() {
  const codingSessionsData = [
    { name: 'Week 1', value: 85 },
    { name: 'Week 2', value: 92 },
    { name: 'Week 3', value: 88 },
    { name: 'Week 4', value: 95 },
  ];

  const businessTasksData = [
    { name: 'Week 1', value: 65 },
    { name: 'Week 2', value: 78 },
    { name: 'Week 3', value: 82 },
    { name: 'Week 4', value: 89 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        title="CODING SESSIONS"
        value="95%"
        trend="+7.2%"
        trendUp={true}
        chartData={codingSessionsData}
        chartColor="#10b981"
        subtitle="Full-Stack & Python Focus"
        index={0}
      />
      <StatCard
        title="BUSINESS TASKS"
        value="89%"
        trend="+8.5%"
        trendUp={true}
        chartData={businessTasksData}
        chartColor="#4cc9f0"
        subtitle="Dem Man & Dicla Growth"
        index={1}
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  chartData: { name: string; value: number }[];
  chartColor: string;
  subtitle: string;
  index: number;
}

function StatCard({
  title,
  value,
  trend,
  trendUp,
  chartData,
  chartColor,
  subtitle,
  index,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card p-5"
    >
      <div className="mb-3">
        <p className="caption-text text-white/40 mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <motion.h3
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
            className="font-display text-3xl font-bold text-white"
          >
            {value}
          </motion.h3>
          <span
            className={`flex items-center gap-1 text-sm font-medium ${
              trendUp ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {trendUp ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {trend}
          </span>
        </div>
        <p className="text-xs text-white/30 mt-1">{subtitle}</p>
      </div>
      <div className="h-16 -mx-2">
        <LineChart
          data={chartData}
          categories={['value']}
          colors={[chartColor]}
          showLegend={false}
          showXAxis={false}
          showYAxis={false}
          showGridLines={false}
        />
      </div>
    </motion.div>
  );
}
