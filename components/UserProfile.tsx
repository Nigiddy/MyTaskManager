// src/components/layout/UserProfile.tsx
'use client';

import {
  ChevronDown,
  LogOut,
  Settings,
  User,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const user = {
  name: 'Gideon Papa',
  role: 'Full-Stack Dev',
  avatarUrl: '/placeholder-user.jpg',
  initials: 'AJ',
  status: 'Peak Productivity',
};

export function UserProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group flex items-center space-x-3 rounded-full p-2 transition-colors duration-200 hover:bg-white/10"
        >
          <div className="hidden text-right lg:block">
            <p className="text-sm font-semibold text-primary">{user.name}</p>
            <p className="text-xs font-medium text-accent">{user.status}</p>
          </div>
          <Avatar className="h-10 w-10 border-2 border-white/30">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback className="bg-gradient-to-br from-[#FF9F43] to-[#FF7F50] text-lg font-bold text-white">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <ChevronDown
            size={18}
            className="text-secondary transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </Button>
      </DropdownMenuTrigger>

      {/* --- REFINED DROPDOWN CONTENT --- */}
      <DropdownMenuContent
        align="end"
        className="w-72 rounded-xl border border-slate-800 bg-[#161B22] p-2 text-white shadow-2xl"
      >
        <DropdownMenuLabel className="flex items-center space-x-3 p-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback className="bg-gradient-to-br from-[#FF9F43] to-[#FF7F50] font-bold text-white">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-bold text-slate-50">{user.name}</p>
            <p className="text-xs text-slate-400">{user.role}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="m-1 bg-slate-800" />
        
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer rounded-md p-2 text-slate-300 focus:bg-slate-800 focus:text-white">
            <User className="mr-2 h-4 w-4 text-slate-400" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer rounded-md p-2 text-slate-300 focus:bg-slate-800 focus:text-white">
            <Settings className="mr-2 h-4 w-4 text-slate-400" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator className="m-1 bg-slate-800" />

        <DropdownMenuItem className="cursor-pointer rounded-md p-2 text-red-400 focus:bg-red-500/20 focus:text-red-300">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}