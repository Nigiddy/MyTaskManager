import { MoreHorizontal, MessageSquare, Users, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Task = {
  id: number
  title: string
  client: string
  status: "Pending" | "In Progress" | "Completed"
  priority: "High" | "Medium" | "Low"
}

export function AssignedTasks() {
  const tasks: Task[] = [
    { 
      id: 1, 
      title: "Cybercafé WiFi Solution Pitch", 
      client: "CyberNet Gaming",
      status: "In Progress",
      priority: "High"
    },
    { 
      id: 2, 
      title: "Discord Community Bot Demo", 
      client: "TechTraders",
      status: "Pending",
      priority: "Medium"
    },
    { 
      id: 3, 
      title: "Portfolio Website Review", 
      client: "Startup Incubator",
      status: "Completed",
      priority: "Low"
    },
    { 
      id: 4, 
      title: "Dem Man Brand Partnership", 
      client: "Local Gym Chain",
      status: "In Progress",
      priority: "High"
    },
    { 
      id: 5, 
      title: "Dicla Clothing Marketing", 
      client: "Fashion Influencer",
      status: "Pending",
      priority: "Medium"
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700 border-green-200"
      case "In Progress": return "bg-blue-100 text-blue-700 border-blue-200"
      case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700 border-red-200"
      case "Medium": return "bg-orange-100 text-orange-700 border-orange-200"
      case "Low": return "bg-green-100 text-green-700 border-green-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">BUSINESS OUTREACH</h2>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-[#FF9F43] hover:bg-[#FFE8D6]">
          <MessageSquare size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="p-3 bg-white rounded-lg border border-[#FFE8D6] hover:border-[#FF9F43] transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-2 text-[#FF9F43]" />
                <span className="text-sm font-medium text-[#333]">{task.title}</span>
              </div>
              <Badge
                variant="outline"
                className={`text-xs ${getPriorityColor(task.priority)}`}
              >
                {task.priority}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#666] flex items-center">
                <Users size={12} className="mr-1" />
                {task.client}
              </span>
              <Badge
                variant="outline"
                className={`text-xs ${getStatusColor(task.status)}`}
              >
                {task.status}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#999]">Client Acquisition</span>
              <span className="text-[#FF9F43] font-medium">Scale Up</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666]">Outreach Goal</span>
          <span className="font-bold text-[#FF9F43]">Connect • Convert • Scale</span>
        </div>
      </div>
    </div>
  )
}
