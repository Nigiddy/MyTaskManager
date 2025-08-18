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
  name: 'Alex Johnson',
  role: 'Product Manager',
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
          className="group flex items-center space-x-3 p-2 hover:bg-white/20 glass-button"
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

      <DropdownMenuContent
        align="end"
        className="w-64 border-0 p-2 glass-card shadow-xl"
      >
        <DropdownMenuLabel className="flex items-center space-x-3 p-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback className="bg-gradient-to-br from-[#FF9F43] to-[#FF7F50] font-bold text-white">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-bold text-primary">{user.name}</p>
            <p className="text-xs text-secondary">{user.role}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-white/20" />
        
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer p-2 hover:bg-white/20">
            <User className="mr-2 h-4 w-4 text-accent" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer p-2 hover:bg-white/20">
            <Settings className="mr-2 h-4 w-4 text-accent" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator className="bg-white/20" />

        <DropdownMenuItem className="cursor-pointer p-2 focus:bg-red-500/50">
          <LogOut className="mr-2 h-4 w-4 text-accent" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}