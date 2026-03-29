'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart } from '@/components/ui/chart';
import { useEffect, useMemo, useState } from 'react';
import { getStats } from '@/lib/api/analytics';
import type { StatSeriesPoint } from '@/types';

export function StatsCards() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartA, setChartA] = useState<StatSeriesPoint[]>([]);
  const [chartB, setChartB] = useState<StatSeriesPoint[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        await getStats();
        if (cancelled) return;
        // TODO: replace with real analytics series (weekly points) from backend.
        setChartA([]);
        setChartB([]);
      } catch {
        if (cancelled) return;
        setError('Failed to load stats.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const codingValue = useMemo(() => '0%', []);
  const codingTrend = useMemo(() => '0%', []);
  const businessValue = useMemo(() => '0%', []);
  const businessTrend = useMemo(() => '0%', []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        title="Coding Sessions"
        value={codingValue}
        trend={codingTrend}
        trendUp={true}
        chartData={chartA}
        chartColor="#10b981"
        subtitle="Full-Stack & Python Focus"
        index={0}
        isLoading={isLoading}
        error={error}
      />
      <StatCard
        title="Business Tasks"
        value={businessValue}
        trend={businessTrend}
        trendUp={true}
        chartData={chartB}
        chartColor="#4cc9f0"
        subtitle="Dem Man & Dicla Growth"
        index={1}
        isLoading={isLoading}
        error={error}
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
  isLoading: boolean;
  error: string | null;
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
  isLoading,
  error,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: 'easeOut' as const,
      }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="glass-card p-5"
    >
      <div className="mb-3">
        <p className="text-xs font-medium text-white/60 mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 + index * 0.05 }}
            className="font-display text-3xl font-bold text-white"
          >
            {isLoading ? '—' : value}
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
            {isLoading ? '—' : trend}
          </span>
        </div>
        <p className="text-xs text-white/50 mt-1">{subtitle}</p>
      </div>
      <div className="h-16 -mx-2">
        {error ? (
          <div className="h-full flex items-center justify-center text-xs text-red-200">
            {error}
          </div>
        ) : (
          <LineChart
            data={isLoading ? [] : chartData}
            categories={['value']}
            colors={[chartColor]}
            showLegend={false}
            showXAxis={false}
            showYAxis={false}
            showGridLines={false}
          />
        )}
      </div>
    </motion.div>
  );
}
