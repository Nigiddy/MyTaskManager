'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Home,
  CheckSquare,
  Zap,
  BarChart3,
  Heart,
  Database,
  ChevronsLeft,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navigationItems = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    description: 'Daily overview and quick actions',
  },
  {
    id: 'tasks',
    label: 'Tasks & Projects',
    icon: CheckSquare,
    description: 'Manage tasks, projects, and calendar',
  },
  {
    id: 'productivity',
    label: 'Productivity',
    icon: Zap,
    description: 'Pomodoro timer, habits, and focus tools',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'Performance metrics and insights',
  },
  {
    id: 'life',
    label: 'Life & Wellness',
    icon: Heart,
    description: 'Wellness tracking and life balance',
  },
  {
    id: 'data',
    label: 'Data Input',
    icon: Database,
    description: 'Log activities and track progress',
  },
];

type SidebarProps = {
  currentPage: string;
  onPageChange: (pageId: string) => void;
};

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex fixed inset-y-0 left-0 z-50 flex-col glass-nav"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-4 h-20">
          {!isCollapsed && (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4cc9f0] to-[#a29bfe] shadow-lg shadow-cyan-500/20">
                <span className="font-display text-sm font-bold text-white">TM</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              <div>
                <h1 className="font-display font-bold text-white whitespace-nowrap">Task Master</h1>
                <p className="text-xs text-white/50">Your productivity hub</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-grow space-y-1.5 overflow-y-auto p-4 custom-scrollbar">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            const button = (
              <motion.button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.03,
                  ease: 'easeOut',
                }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex w-full items-center gap-3.5 rounded-xl px-3.5 py-3 text-left transition-all duration-300 ${
                  isCollapsed ? 'justify-center px-3' : ''
                }`}
              >
                {/* Active indicator bar */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-[#4cc9f0] to-[#a29bfe]"
                    />
                  )}
                </AnimatePresence>

                {/* Icon container with tinted background */}
                <div
                  className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                    isActive ? 'shadow-lg' : ''
                  } ${isActive ? 'bg-blue-500/10' : 'bg-white/5 group-hover:bg-white/10'}`}
                >
                  <Icon
                    className={`h-5 w-5 transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                    }`}
                  />
                </div>

                {/* Label and description */}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col overflow-hidden"
                    >
                      <span
                        className={`font-display font-semibold text-sm truncate transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="text-xs text-white/50 truncate">{item.description}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );

            if (isCollapsed) {
              return (
                <TooltipProvider key={item.id} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>{button}</TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="glass-panel border-white/10 bg-[#1a1a1f]/95 px-3 py-2"
                    >
                      <p className="font-display font-semibold text-sm text-white">{item.label}</p>
                      <p className="text-xs text-white/50">{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }

            return button;
          })}
        </nav>

        {/* Footer - Collapse Toggle */}
        <div className="border-t border-white/10 p-4">
          <Button
            variant="ghost"
            className="w-full justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronsLeft className="h-5 w-5" />
            </motion.div>
          </Button>
        </div>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 flex items-center justify-around h-16 border-t border-white/10 bg-[#1a1a1f]/95 backdrop-blur-xl">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className="flex flex-col items-center gap-1 flex-1"
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded transition-all duration-300 ${
                  isActive ? 'bg-blue-500/20' : ''
                }`}
              >
                <Icon
                  className={`h-6 w-6 transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-white/60'
                  }`}
                />
              </div>
              <span className="text-[10px] text-white/60 leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
