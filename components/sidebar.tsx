"use client"

import type React from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Activity,
  BarChart2,
  Briefcase,
  CheckSquare,
  Library,
  Bookmark,
  Settings,
  LogOut,
  X,
  Code,
  TrendingUp,
  Dumbbell,
  Palette,
  MessageSquare,
  Target,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#FFF8F3] shadow-md transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-[#FFE8D6]">
        <h1 className="text-xl font-bold text-[#333]">Task Master</h1>
        <button className="md:hidden rounded-full p-1 hover:bg-[#FFE8D6]" onClick={() => setOpen(false)}>
          <X size={20} />
        </button>
      </div>

      <div className="px-4 py-6">
        <p className="text-xs font-semibold text-[#999] mb-4 uppercase">Daily Grind</p>
        <nav className="space-y-1">
          <SidebarItem href="/" icon={LayoutDashboard} text="Dashboard" active />
          <SidebarItem href="/coding" icon={Code} text="Coding Sessions" />
          <SidebarItem href="/fitness" icon={Dumbbell} text="Fitness & Wellness" />
          <SidebarItem href="/business" icon={Briefcase} text="Business Strategy" />
          <SidebarItem href="/trading" icon={TrendingUp} text="Trading Review" />
          <SidebarItem href="/design" icon={Palette} text="Design Work" />
        </nav>

        <div className="mt-8">
          <p className="text-xs font-semibold text-[#999] mb-4 uppercase">Business Focus</p>
          <nav className="space-y-1">
            <SidebarItem href="/dem-man" icon={Target} text="Dem Man Brand" />
            <SidebarItem href="/dicla" icon={Users} text="Dicla Clothing" />
            <SidebarItem href="/outreach" icon={MessageSquare} text="Client Outreach" />
            <SidebarItem href="/projects" icon={Library} text="Personal Projects" />
          </nav>
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold text-[#999] mb-4 uppercase">Analytics</p>
          <nav className="space-y-1">
            <SidebarItem href="/activity" icon={Activity} text="Activity Tracker" />
            <SidebarItem href="/statistic" icon={BarChart2} text="Performance Stats" />
            <SidebarItem href="/tasks" icon={CheckSquare} text="Task History" badge={12} />
          </nav>
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold text-[#999] mb-4 uppercase">Quick Actions</p>
          <div className="space-y-3">
            <QuickAction name="Add New Task" action="+" />
            <QuickAction name="Start Coding Session" action="▶" />
            <QuickAction name="Log Workout" action="💪" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full border-t border-[#FFE8D6] p-4">
        <nav className="space-y-1">
          <SidebarItem href="/settings" icon={Settings} text="Settings" />
          <SidebarItem href="/logout" icon={LogOut} text="Logout" />
        </nav>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  href: string
  icon: React.ElementType
  text: string
  active?: boolean
  badge?: number
}

function SidebarItem({ href, icon: Icon, text, active, badge }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors",
        active ? "bg-[#FFE8D6] text-[#333]" : "text-[#666] hover:bg-[#FFE8D6] hover:text-[#333]",
      )}
    >
      <Icon size={20} className="mr-3" />
      <span>{text}</span>
      {badge && (
        <span className="ml-auto bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  )
}

function QuickAction({ name, action }: { name: string; action: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#FFE8D6] hover:border-[#FF9F43] transition-colors cursor-pointer">
      <span className="text-sm text-[#666]">{name}</span>
      <span className="text-lg font-bold text-[#FF9F43]">{action}</span>
    </div>
  )
}
