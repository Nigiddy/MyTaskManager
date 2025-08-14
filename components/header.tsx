"use client"

import { Bell, ChevronDown, Menu, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-[#FFF8F3] border-b border-[#FFE8D6] h-16 flex items-center px-4 shadow-sm">
      <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onMenuClick}>
        <Menu size={20} />
      </Button>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#999]" size={18} />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-10 bg-[#FFF1E6] border-[#FFE8D6] rounded-full h-10 focus-visible:ring-[#FFD7BA]"
        />
      </div>

      <div className="flex items-center ml-auto">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        <div className="flex items-center ml-4">
          <div className="mr-3 text-right hidden sm:block">
            <p className="text-xs text-[#999]">DELL LAWYER</p>
            <p className="text-sm font-medium">Peter Malby</p>
          </div>
          <Avatar className="h-10 w-10 border-2 border-[#FFE8D6]">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="bg-[#FFD7BA] text-[#333]">PM</AvatarFallback>
          </Avatar>
          <ChevronDown size={16} className="ml-1 text-[#999]" />
        </div>
      </div>
    </header>
  )
}
