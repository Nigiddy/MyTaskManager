"use client"

import { WelcomeCard } from "@/components/welcome-card"
import { StatsCards } from "@/components/stats-cards"
import { TimeGreeting } from "@/components/time-greeting"
import { DailyQuote } from "@/components/daily-quote"
import { QuickActions } from "@/components/quick-actions"
import { InlineAmbientMessage } from "@/components/ambient-messages"

export function HomePage() {
  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <WelcomeCard />
        </div>
        <div className="lg:col-span-1">
          <TimeGreeting />
        </div>
      </div>

      {/* Daily Quote and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <DailyQuote />
        </div>
        <div className="lg:col-span-1">
          <StatsCards />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Ambient Message */}
      <InlineAmbientMessage />

      {/* Page Description */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Welcome to Your Command Center</h3>
          <p className="text-sm text-blue-600">
            This is your daily overview. Use the sidebar to navigate to specific areas: Tasks, Productivity, Analytics, and more.
          </p>
        </div>
      </div>
    </div>
  )
}
