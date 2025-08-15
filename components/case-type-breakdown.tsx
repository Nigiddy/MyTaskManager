import { ChevronRight, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart } from '@/components/ui/chart';

export function CaseTypeBreakdown() {
  const data = [
    { name: 'Coding & Dev', value: 35, color: '#4CAF50', target: 40 },
    { name: 'Business Strategy', value: 25, color: '#FF9F43', target: 30 },
    { name: 'Fitness & Wellness', value: 20, color: '#2196F3', target: 20 },
    { name: 'Learning & Growth', value: 15, color: '#9C27B0', target: 15 },
    { name: 'Trading & Analysis', value: 5, color: '#F44336', target: 5 },
  ];

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
          <BarChart
            data={data}
            categories={['value']}
            colors={data.map(item => item.color)}
            showLegend={false}
            showXAxis={true}
            showYAxis={false}
            layout="horizontal"
          />
        </div>

        <div className="md:ml-4 mt-4 md:mt-0 space-y-3">
          {data.map(item => (
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
