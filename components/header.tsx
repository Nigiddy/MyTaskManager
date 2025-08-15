"use client"

import { Bell, ChevronDown, Search, Target, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-[#FFF8F3] border-b border-[#FFE8D6] h-16 flex items-center px-4 shadow-sm">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#999]" size={18} />
        <Input
          type="search"
          placeholder="Search tasks, projects, or goals..."
          className="pl-10 bg-[#FFF1E6] border-[#FFE8D6] rounded-full h-10 focus-visible:ring-[#FFD7BA]"
        />
      </div>

      <div className="flex items-center ml-auto space-x-4">
        <div className="hidden md:flex items-center space-x-3 text-sm">
          <div className="flex items-center text-[#666]">
            <Target size={16} className="mr-1 text-[#FF9F43]" />
            <span>Dem Man</span>
          </div>
          <div className="flex items-center text-[#666]">
            <TrendingUp size={16} className="mr-1 text-[#FF9F43]" />
            <span>Dicla</span>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        <div className="flex items-center ml-4">
          <div className="mr-3 text-right hidden sm:block">
            <p className="text-xs text-[#999] uppercase tracking-wide">Full-Stack Developer</p>
            <p className="text-sm font-medium text-[#333]">Peter Malby</p>
            <p className="text-xs text-[#FF9F43] font-medium">Building the Future</p>
          </div>
          <Avatar className="h-10 w-10 border-2 border-[#FFE8D6]">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="bg-gradient-to-br from-[#FF9F43] to-[#FF7F50] text-white font-bold">PM</AvatarFallback>
          </Avatar>
          <ChevronDown size={16} className="ml-1 text-[#999]" />
        </div>
      </div>
    </header>
  )
}
