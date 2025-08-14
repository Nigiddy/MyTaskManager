import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BarChart } from "@/components/ui/chart"

export function CaseTypeBreakdown() {
  const data = [
    { name: "Product", value: 76, color: "#FF9F43" },
    { name: "Trademark", value: 48, color: "#2196F3" },
    { name: "Patent", value: 16, color: "#9C27B0" },
    { name: "Copyright", value: 0, color: "#F44336" },
    { name: "Gray market", value: 0, color: "#4CAF50" },
  ]

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">CASE TYPE BREAKDOWN</h2>
        <Button variant="ghost" size="sm" className="text-xs text-[#666] hover:text-[#333]">
          Full report <ChevronRight size={16} />
        </Button>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex-1 h-32">
          <BarChart
            data={data}
            categories={["value"]}
            colors={data.map((item) => item.color)}
            showLegend={false}
            showXAxis={true}
            showYAxis={false}
            layout="horizontal"
          />
        </div>

        <div className="md:ml-4 mt-4 md:mt-0 space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
