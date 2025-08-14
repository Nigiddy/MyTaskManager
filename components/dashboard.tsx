"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { WelcomeCard } from "@/components/welcome-card"
import { StatsCards } from "@/components/stats-cards"
import { TaskList } from "@/components/task-list"
import { Calendar } from "@/components/calendar"
import { MyTasks } from "@/components/my-tasks"
import { AssignedTasks } from "@/components/assigned-tasks"
import { CaseTypeBreakdown } from "@/components/case-type-breakdown"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-[#FFF1E6]">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <WelcomeCard />
              <StatsCards />
              <TaskList />
              <CaseTypeBreakdown />
            </div>
            <div className="space-y-4">
              <Calendar />
              <MyTasks />
              <AssignedTasks />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
