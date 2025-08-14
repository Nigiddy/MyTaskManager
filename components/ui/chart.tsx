"use client"
import {
  Line,
  Bar,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface ChartProps {
  data: any[]
  categories: string[]
  index?: string
  colors?: string[]
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGridLines?: boolean
  valueFormatter?: (value: number) => string
  startEndOnly?: boolean
}

export function LineChart({
  data,
  categories,
  index,
  colors = ["#2196F3"],
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  valueFormatter = (value: number) => `${value}`,
  startEndOnly = false,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}

        {showXAxis && (
          <XAxis
            dataKey={index || "name"}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#f0f0f0" }}
            tickFormatter={(value) => {
              if (startEndOnly) {
                const isFirst = data[0]?.[index || "name"] === value
                const isLast = data[data.length - 1]?.[index || "name"] === value
                return isFirst || isLast ? value : ""
              }
              return value
            }}
          />
        )}

        {showYAxis && (
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#f0f0f0" }}
            tickFormatter={valueFormatter}
          />
        )}

        {showLegend && <Legend />}

        <Tooltip
          formatter={valueFormatter}
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "none",
          }}
        />

        {categories.map((category, index) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

interface BarChartProps extends ChartProps {
  layout?: "vertical" | "horizontal"
}

export function BarChart({
  data,
  categories,
  index,
  colors = ["#2196F3"],
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  valueFormatter = (value: number) => `${value}`,
  layout = "vertical",
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} layout={layout} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}

        {showXAxis && (
          <XAxis
            type={layout === "vertical" ? "number" : "category"}
            dataKey={layout === "vertical" ? "" : index || "name"}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#f0f0f0" }}
            tickFormatter={layout === "vertical" ? valueFormatter : undefined}
          />
        )}

        {showYAxis && (
          <YAxis
            type={layout === "vertical" ? "category" : "number"}
            dataKey={layout === "vertical" ? index || "name" : ""}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#f0f0f0" }}
            tickFormatter={layout === "vertical" ? undefined : valueFormatter}
          />
        )}

        {showLegend && <Legend />}

        <Tooltip
          formatter={valueFormatter}
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "none",
          }}
        />

        {categories.map((category, index) => (
          <Bar key={category} dataKey={category} fill={colors[index % colors.length]} radius={[4, 4, 0, 0]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
