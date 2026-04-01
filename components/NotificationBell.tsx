'use client';

import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function NotificationBell() {
  const { toast } = useToast();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Button
        variant="ghost"
        size="icon"
        aria-label="View notifications"
        onClick={() =>
          toast({
            title: 'No new notifications',
            description: 'You\u2019re all caught up! Notifications will appear here once connected.',
          })
        }
        className="relative h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300"
      >
        <Bell size={18} className="text-white/60" />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30, delay: 0.5 }}
          className="absolute right-2 top-2 flex h-2 w-2"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4cc9f0] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4cc9f0]" />
        </motion.span>
      </Button>
    </motion.div>
  );
}
