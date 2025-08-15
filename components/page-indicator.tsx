"use client"

import { ChevronRight, Home } from "lucide-react"

interface PageIndicatorProps {
  currentPage: string
}

const pageTitles: Record<string, string> = {
  'home': 'Home',
  'tasks': 'Tasks & Projects',
  'productivity': 'Productivity Tools',
  'analytics': 'Analytics & Insights',
  'life': 'Life & Wellness',
  'data': 'Data Input & Tracking'
}

const pageDescriptions: Record<string, string> = {
  'home': 'Your daily overview and command center',
  'tasks': 'Manage tasks, projects, and stay organized',
  'productivity': 'Focus, build habits, and track wins',
  'analytics': 'Monitor performance and gain insights',
  'life': 'Balance work with wellness and relationships',
  'data': 'Log activities and maintain detailed records'
}

export function PageIndicator({ currentPage }: PageIndicatorProps) {
  const title = pageTitles[currentPage] || 'Home'
  const description = pageDescriptions[currentPage] || 'Your daily overview'

  return (
    <div className="mb-6 glass-card p-6">
      <div className="flex items-center space-x-2 text-sm text-secondary mb-3">
        <Home className="h-4 w-4" />
        <span>Dashboard</span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-primary capitalize">
          {currentPage.replace('-', ' ')}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-2">{title}</h1>
          <p className="text-secondary">{description}</p>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-secondary mb-1">Current Page</div>
          <div className="text-sm font-medium text-accent capitalize">
            {currentPage.replace('-', ' ')}
          </div>
        </div>
      </div>
    </div>
  )
}
