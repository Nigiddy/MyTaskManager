"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  CheckSquare, 
  Zap, 
  BarChart3, 
  Heart, 
  Database,
  Menu,
  X,
  ChevronRight
} from "lucide-react"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const navigationItems = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    description: 'Daily overview and quick actions',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'tasks',
    label: 'Tasks & Projects',
    icon: CheckSquare,
    description: 'Manage tasks, projects, and calendar',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'productivity',
    label: 'Productivity',
    icon: Zap,
    description: 'Pomodoro timer, habits, and focus tools',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'Performance metrics and insights',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'life',
    label: 'Life & Wellness',
    icon: Heart,
    description: 'Wellness tracking and life balance',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'data',
    label: 'Data Input',
    icon: Database,
    description: 'Log activities and track progress',
    color: 'from-amber-500 to-orange-500'
  }
]

export function Sidebar({ currentPage, onPageChange, sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 glass-nav
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-accent to-highlight rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">TM</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-primary">Task Master</h1>
              <p className="text-xs text-secondary">Your Command Center</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden glass-button hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-8rem)] custom-scrollbar">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id)
                  setSidebarOpen(false) // Close sidebar on mobile after selection
                }}
                className={`
                  w-full p-3 rounded-lg text-left transition-all duration-200
                  active:scale-95 touch-manipulation
                  ${isActive 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-md` 
                    : 'glass-card hover:bg-white/20 text-primary hover:shadow-sm'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-secondary'}`} />
                    <div>
                      <div className={`font-medium ${isActive ? 'text-white' : 'text-primary'}`}>
                        {item.label}
                      </div>
                      <div className={`text-xs ${isActive ? 'text-white/80' : 'text-secondary'}`}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <ChevronRight className="h-4 w-4 text-white" />
                  )}
                </div>
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20 glass-panel rounded-t-2xl">
          <div className="text-center">
            <div className="text-xs text-secondary mb-2">Current Page</div>
            <div className="text-sm font-medium text-primary capitalize">
              {currentPage.replace('-', ' ')}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden glass-button hover:bg-white/20 active:scale-95 touch-manipulation"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  )
}
