"use client"

import { PerformanceAnalytics } from "@/components/performance-analytics"
import { BusinessIntelligence } from "@/components/business-intelligence"
import { LearningProgress } from "@/components/learning-progress"
import { CaseTypeBreakdown } from "@/components/case-type-breakdown"

export function AnalyticsPage() {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">Analytics & Insights</h2>
          <p className="text-sm text-indigo-600">
            Track performance, monitor business metrics, and analyze your progress
          </p>
        </div>
      </div>

      {/* Performance Analytics */}
      <PerformanceAnalytics />

      {/* Business Intelligence */}
      <BusinessIntelligence />

      {/* Learning Progress */}
      <LearningProgress />

      {/* Case Type Breakdown */}
      <CaseTypeBreakdown />

      {/* Analytics Summary */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">This Week's Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">92%</div>
            <div className="text-xs text-blue-600">Productivity</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">18h</div>
            <div className="text-xs text-green-600">Focus Time</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-xl font-bold text-purple-600">24</div>
            <div className="text-xs text-purple-600">Tasks Done</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-xl font-bold text-orange-600">7/7</div>
            <div className="text-xs text-orange-600">Habits</div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-800 mb-3">🔍 Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-700">
          <div>• Peak productivity: 4-6 AM (95% focus score)</div>
          <div>• WiFi billing system: 80% completion rate</div>
          <div>• Python learning: 12 hours this week</div>
          <div>• Business outreach: 3 new prospects</div>
        </div>
      </div>

      {/* Quick Analytics Actions */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">Quick Analytics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-blue-700 text-sm font-medium transition-colors">
            📊 Export Data
          </button>
          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-green-700 text-sm font-medium transition-colors">
            📈 Trends
          </button>
          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-purple-700 text-sm font-medium transition-colors">
            🎯 Goals
          </button>
          <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 text-orange-700 text-sm font-medium transition-colors">
            📅 Timeline
          </button>
        </div>
      </div>
    </div>
  )
}
