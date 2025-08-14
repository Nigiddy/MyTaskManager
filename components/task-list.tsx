"use client"

import { useState } from "react"
import { ChevronRight, FileText } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Priority = "Low" | "Medium" | "High"
type Task = {
  id: number
  name: string
  dates?: string
  priority: Priority
  attachment?: {
    name: string
    type: string
  }
  assignee?: {
    initials: string
    color?: string
  }
  completed: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "Lorem ipsum dolor sit...",
      dates: "May 18,2024 - May 25,2024",
      priority: "Low",
      attachment: {
        name: "Requirements.PM",
        type: "",
      },
      completed: true,
    },
    {
      id: 2,
      name: "Lorem ipsum dolor",
      dates: "May 18,2024 - May 25,2024",
      priority: "Medium",
      attachment: {
        name: "New case.doc",
        type: "doc",
      },
      assignee: {
        initials: "JL KS",
      },
      completed: false,
    },
    {
      id: 3,
      name: "Lorem ipsum dolor sit...",
      priority: "Low",
      attachment: {
        name: "Bike fraud.doc",
        type: "doc",
      },
      assignee: {
        initials: "PM",
      },
      completed: false,
    },
  ])

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">LIST OF CASES TO BE ACCEPTED</h2>
        <Button variant="ghost" size="sm" className="text-xs text-[#666] hover:text-[#333]">
          Full list <ChevronRight size={16} />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-[#666] border-b border-[#FFE8D6]">
              <th className="pb-2 font-medium text-left w-8"></th>
              <th className="pb-2 font-medium text-left">Name</th>
              <th className="pb-2 font-medium text-left">Dates</th>
              <th className="pb-2 font-medium text-left">Priority</th>
              <th className="pb-2 font-medium text-left">Attachment</th>
              <th className="pb-2 font-medium text-left">Assignee</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b border-[#FFE8D6] last:border-0">
                <td className="py-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    className="border-[#FFD7BA] data-[state=checked]:bg-[#FF9F43] data-[state=checked]:border-[#FF9F43]"
                  />
                </td>
                <td className="py-3 text-sm">{task.name}</td>
                <td className="py-3 text-sm text-[#666]">{task.dates || "—"}</td>
                <td className="py-3">
                  {task.priority && (
                    <Badge
                      variant="outline"
                      className={`
                        rounded-md font-normal
                        ${task.priority === "Low" ? "bg-green-100 text-green-700 border-green-200" : ""}
                        ${task.priority === "Medium" ? "bg-orange-100 text-orange-700 border-orange-200" : ""}
                        ${task.priority === "High" ? "bg-red-100 text-red-700 border-red-200" : ""}
                      `}
                    >
                      {task.priority}
                    </Badge>
                  )}
                </td>
                <td className="py-3">
                  {task.attachment && (
                    <div className="flex items-center text-sm">
                      <FileText size={16} className="mr-1 text-[#666]" />
                      {task.attachment.name}
                    </div>
                  )}
                </td>
                <td className="py-3">
                  {task.assignee && (
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-[#FFE8D6] flex items-center justify-center text-xs font-medium text-[#666]">
                        {task.assignee.initials.split(" ")[0]}
                      </div>
                      {task.assignee.initials.split(" ")[1] && (
                        <div className="h-6 w-6 rounded-full bg-purple-200 -ml-1 flex items-center justify-center text-xs font-medium text-purple-700">
                          {task.assignee.initials.split(" ")[1]}
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
