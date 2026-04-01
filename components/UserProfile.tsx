'use client';

import { motion } from 'framer-motion';
import {
  ChevronDown,
  LogOut,
  Settings,
  User,
  Sparkles,
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
import { useToast } from '@/hooks/use-toast';

const user = {
  name: 'Gideon Papa',
  role: 'Full-Stack Dev',
  avatarUrl: '/placeholder-user.jpg',
  initials: 'GP',
  status: 'Peak Productivity',
};

export function UserProfile() {
  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button
            variant="ghost"
            className="group flex items-center gap-3 rounded-xl p-2 pr-3 transition-all duration-300 hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]"
          >
            <Avatar className="h-9 w-9 border-2 border-[#4cc9f0]/30">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="bg-gradient-to-br from-[#4cc9f0] to-[#a29bfe] text-sm font-display font-bold text-white">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold text-white">{user.name}</p>
              <p className="text-xs text-[#4cc9f0] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {user.status}
              </p>
            </div>
            <ChevronDown
              size={16}
              className="text-white/40 transition-transform duration-200 group-data-[state=open]:rotate-180"
            />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-xl border border-white/10 bg-[#16161a]/95 backdrop-blur-xl p-2 text-white shadow-2xl shadow-black/50"
      >
        <DropdownMenuLabel className="flex items-center gap-3 p-3">
          <Avatar className="h-10 w-10 border-2 border-[#4cc9f0]/30">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback className="bg-gradient-to-br from-[#4cc9f0] to-[#a29bfe] font-display font-bold text-white">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-display font-semibold text-white">{user.name}</p>
            <p className="text-xs text-white/50">{user.role}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1 bg-white/[0.08]" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer rounded-lg p-2.5 text-white/70 focus:bg-white/[0.06] focus:text-white transition-colors"
            onSelect={() =>
              toast({ title: 'Profile', description: 'Profile settings coming soon.' })
            }
          >
            <User className="mr-2.5 h-4 w-4 text-white/50" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer rounded-lg p-2.5 text-white/70 focus:bg-white/[0.06] focus:text-white transition-colors"
            onSelect={() =>
              toast({ title: 'Settings', description: 'App settings coming soon.' })
            }
          >
            <Settings className="mr-2.5 h-4 w-4 text-white/50" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1 bg-white/[0.08]" />

        <DropdownMenuItem
          className="cursor-pointer rounded-lg p-2.5 text-red-400 focus:bg-red-500/10 focus:text-red-300 transition-colors"
          onSelect={() =>
            toast({
              title: 'Sign Out',
              description: 'Authentication is not yet connected.',
              variant: 'destructive',
            })
          }
        >
          <LogOut className="mr-2.5 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
