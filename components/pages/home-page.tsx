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
          <p className="text-sm text-blue-600 mb-4">
            This is your daily overview. Use the sidebar to navigate to specific areas: Tasks, Productivity, Analytics, and more.
          </p>
          
          {/* Mobile Navigation Tips */}
          <div className="block lg:hidden">
            <div className="text-xs text-blue-500 mb-2">📱 Mobile Tips:</div>
            <div className="grid grid-cols-2 gap-2 text-xs text-blue-600">
              <div>• Tap menu button to open sidebar</div>
              <div>• Swipe to navigate between sections</div>
              <div>• Each page is optimized for mobile</div>
              <div>• Touch-friendly buttons throughout</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Page Navigation for Mobile */}
      <div className="block lg:hidden">
        <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
          <h3 className="font-semibold text-[#333] mb-3 text-center">Quick Navigation</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-green-700 text-sm font-medium transition-colors active:scale-95 touch-manipulation">
              📝 Tasks
            </button>
            <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-purple-700 text-sm font-medium transition-colors active:scale-95 touch-manipulation">
              ⚡ Productivity
            </button>
            <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-blue-700 text-sm font-medium transition-colors active:scale-95 touch-manipulation">
              📊 Analytics
            </button>
            <button className="p-3 bg-pink-50 hover:bg-pink-100 rounded-lg border border-pink-200 text-pink-700 text-sm font-medium transition-colors active:scale-95 touch-manipulation">
              💖 Life
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
