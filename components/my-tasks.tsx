import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

type Task = {
  id: number
  title: string
  date: string
}

export function MyTasks() {
  const tasks: Task[] = [
    { id: 1, title: "Lorem ipsum dolor sit...", date: "May 18" },
    { id: 2, title: "Lorem ipsum dolor", date: "May 20" },
    { id: 3, title: "Lorem ipsum dolor sit...", date: "May 25" },
  ]

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">LIST OF MY TASKS</h2>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-[#FF9F43]">
          <MoreHorizontal size={16} />
        </Button>
      </div>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-[#FF9F43] mr-2">•</span>
              <span className="text-sm">{task.title}</span>
            </div>
            <span className="text-xs text-[#666]">{task.date}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
