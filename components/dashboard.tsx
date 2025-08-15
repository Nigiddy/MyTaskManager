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
import { HabitStreaks } from "@/components/habit-streaks"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { BusinessIntelligence } from "@/components/business-intelligence"
import { LearningProgress } from "@/components/learning-progress"
import { PerformanceAnalytics } from "@/components/performance-analytics"
import { QuickActions } from "@/components/quick-actions"
import { TodaysWin } from "@/components/todays-win"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-[#FFF1E6]">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-2 sm:p-4">
          {/* Main Content Grid - Responsive Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
            
            {/* Left Column - Main Content */}
            <div className="xl:col-span-3 space-y-4">
              
              {/* Top Row - Hero and Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <WelcomeCard />
                </div>
                <div className="lg:col-span-1">
                  <TodaysWin />
                </div>
              </div>

              {/* Stats Row */}
              <StatsCards />

              {/* Main Task Management */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TaskList />
                <HabitStreaks />
              </div>

              {/* Business Intelligence */}
              <BusinessIntelligence />

              {/* Learning and Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <LearningProgress />
                <PerformanceAnalytics />
              </div>

              {/* Productivity Tools */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PomodoroTimer />
                <QuickActions />
              </div>

              {/* Case Type Breakdown */}
              <CaseTypeBreakdown />
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="xl:col-span-1 space-y-4">
              <Calendar />
              <MyTasks />
              <AssignedTasks />
            </div>
          </div>

          {/* Mobile-First Responsive Adjustments */}
          <div className="block xl:hidden mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
