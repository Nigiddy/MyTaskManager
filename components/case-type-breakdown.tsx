import { ChevronRight, Clock, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart } from '@/components/ui/chart';
import type { CaseTypeBreakdownItem } from '@/types';
import { getStats } from '@/lib/api/analytics';

export function CaseTypeBreakdown() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CaseTypeBreakdownItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        await getStats();
        if (cancelled) return;
        // TODO: replace with real breakdown data from backend.
        setData([]);
      } catch {
        if (cancelled) return;
        setError('Failed to load breakdown.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">DAILY PRODUCTIVITY BREAKDOWN</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-[#666] hover:text-[#333]"
        >
          View Details <ChevronRight size={16} />
        </Button>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex-1 h-32">
          {error ? (
            <div className="h-full flex items-center justify-center text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
              {error}
            </div>
          ) : (
            <BarChart
              data={isLoading ? [] : data}
              categories={['value']}
              colors={(isLoading ? [] : data).map(item => item.color)}
              showLegend={false}
              showXAxis={true}
              showYAxis={false}
              layout="horizontal"
            />
          )}
        </div>

        <div className="md:ml-4 mt-4 md:mt-0 space-y-3">
          {isLoading && (
            <div className="p-2 bg-white rounded-lg border border-[#FFE8D6]">
              <div className="h-4 w-40 bg-[#FFE8D6] rounded mb-2" />
              <div className="h-3 w-24 bg-[#FFE8D6] rounded" />
            </div>
          )}
          {!isLoading && !error && data.length === 0 && (
            <div className="p-2 bg-white rounded-lg border border-[#FFE8D6] text-sm text-[#666]">
              No breakdown data yet.
            </div>
          )}
          {!isLoading && !error && data.map(item => (
            <div
              key={item.name}
              className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#FFE8D6]"
            >
              <div className="flex items-center">
                <div
                  className="h-3 w-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[#333]">
                  {item.value}%
                </div>
                <div className="text-xs text-[#666] flex items-center">
                  <Target size={12} className="mr-1" />
                  {item.target}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-[#666]">
            <Clock size={16} className="mr-2 text-[#FF9F43]" />
            <span className="text-sm font-medium">Today's Goal</span>
          </div>
          <span className="text-sm font-bold text-[#FF9F43]">
            Stay Disciplined • Build Daily • Scale Up
          </span>
        </div>
      </div>
    </div>
  );
}
