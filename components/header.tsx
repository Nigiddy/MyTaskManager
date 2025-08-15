"use client"

import { Bell, ChevronDown, Search, Target, TrendingUp, Settings, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="bg-gradient-to-r from-[#FFF8F3] to-[#FFF1E6] border-b border-[#FFE8D6] h-20 flex items-center px-6 shadow-lg">
      {/* Search Section */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#999]" size={20} />
        <Input
          type="search"
          placeholder="Search tasks, projects, or goals..."
          className="pl-12 bg-white/80 backdrop-blur-sm border-[#FFE8D6] rounded-full h-12 focus-visible:ring-2 focus-visible:ring-[#FF9F43] focus-visible:ring-opacity-50 transition-all duration-200"
        />
      </div>

      {/* Stats Section */}
      <div className="flex items-center ml-auto space-x-6 text-sm">
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center text-[#666] bg-white/60 px-3 py-2 rounded-full backdrop-blur-sm">
            <Target size={16} className="mr-2 text-[#FF9F43]" />
            <span className="font-medium">Dem Man</span>
          </div>
          <div className="flex items-center text-[#666] bg-white/60 px-3 py-2 rounded-full backdrop-blur-sm">
            <TrendingUp size={16} className="mr-2 text-[#FF9F43]" />
            <span className="font-medium">Dicla</span>
          </div>
        </div>

        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative hover:bg-white/60 transition-all duration-200">
          <Bell size={22} className="text-[#666]" />
          <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
        </Button>

        {/* Enhanced User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-3 p-2 hover:bg-white/60 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="text-right hidden lg:block">
                  <p className="text-xs text-[#999] uppercase tracking-wider font-medium">Full-Stack Developer</p>
                  <p className="text-sm font-semibold text-[#333]">Peter Malby</p>
                  <p className="text-xs text-[#FF9F43] font-medium">Building the Future</p>
                </div>
                <Avatar className="h-12 w-12 border-3 border-[#FFE8D6] shadow-lg hover:shadow-xl transition-all duration-200">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-gradient-to-br from-[#FF9F43] to-[#FF7F50] text-white font-bold text-lg">PM</AvatarFallback>
                </Avatar>
                <ChevronDown size={18} className="text-[#999] transition-transform duration-200" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-4 bg-white/95 backdrop-blur-md border-[#FFE8D6] shadow-xl">
            {/* User Bio Section */}
            <div className="flex items-start space-x-4 p-3 bg-gradient-to-r from-[#FFF8F3] to-[#FFF1E6] rounded-lg mb-3">
              <Avatar className="h-16 w-16 border-3 border-[#FFE8D6]">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-[#FF9F43] to-[#FF7F50] text-white font-bold text-xl">PM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#333]">Peter Malby</h3>
                <p className="text-sm text-[#666] mb-2">Full-Stack Developer</p>
                <p className="text-xs text-[#999] leading-relaxed">
                  Passionate about creating intuitive user experiences and building scalable applications. 
                  Always learning and exploring new technologies to deliver better solutions.
                </p>
              </div>
            </div>
            
            <DropdownMenuSeparator className="bg-[#FFE8D6]" />
            
            <DropdownMenuItem className="flex items-center space-x-3 p-3 hover:bg-[#FFF8F3] rounded-lg cursor-pointer">
              <User size={18} className="text-[#FF9F43]" />
              <span className="text-[#333]">View Profile</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center space-x-3 p-3 hover:bg-[#FFF8F3] rounded-lg cursor-pointer">
              <Settings size={18} className="text-[#FF9F43]" />
              <span className="text-[#333]">Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
