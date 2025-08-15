"use client"

import { useState } from "react"
import { ChevronRight, FileText, Code, TrendingUp, Briefcase, Dumbbell, Palette, MessageSquare } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Priority = "Low" | "Medium" | "High"
type Task = {
  id: number
  name: string
  time?: string
  priority: Priority
  category: string
  icon: React.ElementType
  completed: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "4:00 AM - Morning Workout & Meditation",
      time: "4:00 AM - 5:30 AM",
      priority: "High",
      category: "Fitness",
      icon: Dumbbell,
      completed: false,
    },
    {
      id: 2,
      name: "Full-Stack Development Session",
      time: "6:00 AM - 9:00 AM",
      priority: "High",
      category: "Coding",
      icon: Code,
      completed: false,
    },
    {
      id: 3,
      name: "Python Learning & Practice",
      time: "9:30 AM - 11:00 AM",
      priority: "Medium",
      category: "Learning",
      icon: Code,
      completed: false,
    },
    {
      id: 4,
      name: "WiFi Billing System Development",
      time: "11:30 AM - 2:00 PM",
      priority: "High",
      category: "Projects",
      icon: Briefcase,
      completed: false,
    },
    {
      id: 5,
      name: "Sales Outreach - Cybercafés",
      time: "2:30 PM - 4:00 PM",
      priority: "Medium",
      category: "Business",
      icon: MessageSquare,
      completed: false,
    },
    {
      id: 6,
      name: "Discord Community Client Outreach",
      time: "4:30 PM - 6:00 PM",
      priority: "Medium",
      category: "Business",
      icon: MessageSquare,
      completed: false,
    },
    {
      id: 7,
      name: "UI/UX Design Work Session",
      time: "6:30 PM - 8:00 PM",
      priority: "Low",
      category: "Design",
      icon: Palette,
      completed: false,
    },
    {
      id: 8,
      name: "Trading Review & Analysis",
      time: "8:30 PM - 9:30 PM",
      priority: "Medium",
      category: "Trading",
      icon: TrendingUp,
      completed: false,
    },
    {
      id: 9,
      name: "Business Strategy - Dem Man & Dicla",
      time: "10:00 PM - 11:00 PM",
      priority: "High",
      category: "Business",
      icon: Briefcase,
      completed: false,
    },
    {
      id: 10,
      name: "Evening Reflection & Journaling",
      time: "11:30 PM - 12:00 AM",
      priority: "Low",
      category: "Personal",
      icon: FileText,
      completed: false,
    },
  ])

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Fitness": return "bg-blue-100 text-blue-700 border-blue-200"
      case "Coding": return "bg-green-100 text-green-700 border-green-200"
      case "Learning": return "bg-purple-100 text-purple-700 border-purple-200"
      case "Projects": return "bg-orange-100 text-orange-700 border-orange-200"
      case "Business": return "bg-indigo-100 text-indigo-700 border-indigo-200"
      case "Design": return "bg-pink-100 text-pink-700 border-pink-200"
      case "Trading": return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "Personal": return "bg-gray-100 text-gray-700 border-gray-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">YOUR DAILY POWER ROUTINE</h2>
        <Button variant="ghost" size="sm" className="text-xs text-[#666] hover:text-[#333]">
          View All <ChevronRight size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => {
          const Icon = task.icon
          return (
            <div key={task.id} className={`flex items-center p-3 rounded-lg border transition-all ${
              task.completed 
                ? 'bg-green-50 border-green-200 opacity-75' 
                : 'bg-white border-[#FFE8D6] hover:border-[#FF9F43]'
            }`}>
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="border-[#FFD7BA] data-[state=checked]:bg-[#FF9F43] data-[state=checked]:border-[#FF9F43] mr-3"
              />
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFE8D6] mr-3">
                <Icon size={16} className="text-[#FF9F43]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.name}
                  </span>
                  <Badge
                    variant="outline"
                    className={`rounded-md font-normal text-xs ${getCategoryColor(task.category)}`}
                  >
                    {task.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#666]">{task.time}</span>
                  <Badge
                    variant="outline"
                    className={`rounded-md font-normal text-xs ${
                      task.priority === "Low" ? "bg-green-100 text-green-700 border-green-200" : ""
                    } ${
                      task.priority === "Medium" ? "bg-orange-100 text-orange-700 border-orange-200" : ""
                    } ${
                      task.priority === "High" ? "bg-red-100 text-red-700 border-red-200" : ""
                    }`}
                  >
                    {task.priority}
                  </Badge>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
