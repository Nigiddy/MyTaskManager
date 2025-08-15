import { LineChart } from "@/components/ui/chart"

export function StatsCards() {
  // Sample data for charts
  const codingSessionsData = [
    { name: "Week 1", value: 85 },
    { name: "Week 2", value: 92 },
    { name: "Week 3", value: 88 },
    { name: "Week 4", value: 95 },
  ]

  const businessTasksData = [
    { name: "Week 1", value: 65 },
    { name: "Week 2", value: 78 },
    { name: "Week 3", value: 82 },
    { name: "Week 4", value: 89 },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        title="CODING SESSIONS"
        value="95%"
        trend="+7.2%"
        trendUp={true}
        chartData={codingSessionsData}
        chartColor="#4CAF50"
        subtitle="Full-Stack & Python Focus"
      />
      <StatCard
        title="BUSINESS TASKS"
        value="89%"
        trend="+8.5%"
        trendUp={true}
        chartData={businessTasksData}
        chartColor="#FF9F43"
        subtitle="Dem Man & Dicla Growth"
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  trend: string
  trendUp: boolean
  chartData: { name: string; value: number }[]
  chartColor: string
  subtitle: string
}

function StatCard({ title, value, trend, trendUp, chartData, chartColor, subtitle }: StatCardProps) {
  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="mb-2">
        <p className="text-sm text-[#666]">{title}</p>
        <div className="flex items-baseline">
          <h3 className="text-3xl font-bold">{value}</h3>
          <span className={`ml-2 text-sm ${trendUp ? "text-green-500" : "text-red-500"}`}>{trend}</span>
        </div>
        <p className="text-xs text-[#999] mt-1">{subtitle}</p>
      </div>
      <div className="h-16">
        <LineChart
          data={chartData}
          categories={["value"]}
          colors={[chartColor]}
          showLegend={false}
          showXAxis={false}
          showYAxis={false}
          showGridLines={false}
        />
      </div>
    </div>
  )
}
