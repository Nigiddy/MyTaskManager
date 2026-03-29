'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { BusinessMetric, ClientPipelineStage } from '@/types';
import { getStats } from '@/lib/api/analytics';

export function BusinessIntelligence() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<BusinessMetric[]>([]);
  const [pipeline, setPipeline] = useState<ClientPipelineStage[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        await getStats();
        if (cancelled) return;
        // TODO: replace with real business metrics + pipeline endpoints.
        setMetrics([]);
        setPipeline([]);
      } catch {
        if (cancelled) return;
        setError('Failed to load business intelligence.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalRevenue = useMemo(() => {
    return metrics
      .filter(m => m.category === 'Revenue')
      .reduce((sum, m) => {
        const n = Number(m.value.replace(/[^0-9.]/g, ''));
        return sum + (Number.isFinite(n) ? n : 0);
      }, 0);
  }, [metrics]);

  const totalClients = useMemo(() => {
    return metrics
      .filter(m => m.category === 'Clients')
      .reduce((sum, m) => {
        const n = Number(m.value.replace(/[^0-9.]/g, ''));
        return sum + (Number.isFinite(n) ? n : 0);
      }, 0);
  }, [metrics]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Revenue':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Clients':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Growth':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Brand':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getChangeIcon = (changeType: string) => {
    return changeType === 'increase' ? (
      <ArrowUpRight size={16} className="text-green-600" />
    ) : (
      <ArrowDownRight size={16} className="text-red-600" />
    );
  };

  const getChangeColor = (changeType: string) => {
    return changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">BUSINESS INTELLIGENCE</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-[#666] hover:text-[#333]"
        >
          <BarChart3 size={16} className="mr-1" />
          Full Report
        </Button>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="flex items-center justify-center mb-2">
            <DollarSign size={20} className="text-green-600 mr-2" />
            <span className="text-xs text-[#666]">Total Revenue</span>
          </div>
          <div className="text-2xl font-bold text-[#333]">
            {isLoading ? '—' : `$${totalRevenue.toLocaleString()}`}
          </div>
          <div className="text-xs text-[#666] mt-1">This Month</div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="flex items-center justify-center mb-2">
            <Users size={20} className="text-blue-600 mr-2" />
            <span className="text-xs text-[#666]">Active Clients</span>
          </div>
          <div className="text-2xl font-bold text-[#333]">{isLoading ? '—' : totalClients}</div>
          <div className="text-xs text-[#666] mt-1">Current Month</div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="flex items-center justify-center mb-2">
            <Target size={20} className="text-orange-600 mr-2" />
            <span className="text-xs text-[#666]">Conversion Rate</span>
          </div>
          <div className="text-2xl font-bold text-[#333]">{isLoading ? '—' : '0%'}</div>
          <div className="text-xs text-[#666] mt-1">Lead to Client</div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 mb-4">
          {error}
        </div>
      )}

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {!isLoading && !error && metrics.length === 0 && (
          <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-sm text-[#666] lg:col-span-2">
            No business metrics yet.
          </div>
        )}
        {!isLoading && !error && metrics.map(metric => (
          <div
            key={metric.id}
            className="p-3 bg-white rounded-lg border border-[#FFE8D6] hover:border-[#FF9F43] transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-medium text-[#333]">
                  {metric.name}
                </h3>
                <Badge
                  variant="outline"
                  className={`text-xs ${getCategoryColor(metric.category)}`}
                >
                  {metric.category}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-[#333]">
                  {metric.value}
                </div>
                <div
                  className={`text-xs flex items-center ${getChangeColor(metric.changeType)}`}
                >
                  {getChangeIcon(metric.changeType)}
                  <span className="ml-1">{metric.change}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#666]">
                <span>Target: {metric.target}</span>
                <span>{metric.progress}%</span>
              </div>
              <Progress value={metric.progress} className="h-2 bg-[#FFE8D6]" />
            </div>
          </div>
        ))}
      </div>

      {/* Client Pipeline */}
      <div className="mb-4">
        <h3 className="font-medium text-[#333] mb-3">Client Pipeline</h3>
        <div className="space-y-3">
          {!isLoading && !error && pipeline.length === 0 && (
            <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-sm text-[#666]">
              No pipeline data yet.
            </div>
          )}
          {!isLoading && !error && pipeline.map((stage, index) => (
            <div
              key={stage.stage}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#FFE8D6]"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                <div>
                  <span className="text-sm font-medium text-[#333]">
                    {stage.stage}
                  </span>
                  <div className="text-xs text-[#666]">
                    {stage.count} prospects •{' '}
                    {stage.conversionRate > 0
                      ? `${stage.conversionRate}%`
                      : 'N/A'}{' '}
                    conversion
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[#333]">
                  {stage.count}
                </div>
                {stage.value > 0 && (
                  <div className="text-xs text-green-600">
                    ${stage.value.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">
              Dem Man Brand
            </span>
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-700 border-blue-200 text-xs"
            >
              Fitness
            </Badge>
          </div>
          <div className="text-lg font-bold text-blue-700">
            {isLoading ? '—' : '0 followers'}
          </div>
          <div className="text-xs text-blue-600 mt-1">
            No brand analytics yet.
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-pink-700">
              Dicla Clothing
            </span>
            <Badge
              variant="outline"
              className="bg-pink-100 text-pink-700 border-pink-200 text-xs"
            >
              Fashion
            </Badge>
          </div>
          <div className="text-lg font-bold text-pink-700">
            {isLoading ? '—' : '$0 revenue'}
          </div>
          <div className="text-xs text-pink-600 mt-1">
            No sales analytics yet.
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="mt-4 p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666]">Next Actions</span>
          <span className="font-bold text-[#FF9F43]">
            Scale • Optimize • Convert
          </span>
        </div>
        <div className="mt-2 text-xs text-[#666]">
          Focus on WiFi billing system completion • Increase Discord community
          engagement • Develop Dem Man gym partnerships
        </div>
      </div>
    </div>
  );
}
