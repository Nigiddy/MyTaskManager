// src/components/layout/NotificationBell.tsx
'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotificationBell() {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="View notifications"
      className="glass-button relative rounded-full hover:bg-white/20"
    >
      <Bell size={22} className="text-secondary" />
      {/* Example of an active notification */}
      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
    </Button>
  );
}