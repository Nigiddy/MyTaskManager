import { LineChart } from "@/components/ui/chart"

export function StatsCards() {
  // Sample data for charts
  const newCasesData = [
    { name: "Week 1", value: 80 },
    { name: "Week 2", value: 90 },
    { name: "Week 3", value: 85 },
    { name: "Week 4", value: 104 },
  ]

  const newTasksData = [
    { name: "Week 1", value: 40 },
    { name: "Week 2", value: 35 },
    { name: "Week 3", value: 30 },
    { name: "Week 4", value: 34 },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        title="NEW CASES"
        value="104"
        trend="+14,88%"
        trendUp={true}
        chartData={newCasesData}
        chartColor="#4CAF50"
      />
      <StatCard
        title="NEW TASKS"
        value="34"
        trend="-5,67%"
        trendUp={false}
        chartData={newTasksData}
        chartColor="#F44336"
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
}

function StatCard({ title, value, trend, trendUp, chartData, chartColor }: StatCardProps) {
  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="mb-2">
        <p className="text-sm text-[#666]">{title}</p>
        <div className="flex items-baseline">
          <h3 className="text-3xl font-bold">{value}</h3>
          <span className={`ml-2 text-sm ${trendUp ? "text-green-500" : "text-red-500"}`}>{trend}</span>
        </div>
        <p className="text-xs text-[#999] mt-1">Trends last month</p>
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
