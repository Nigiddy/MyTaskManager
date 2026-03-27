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
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { clsx } from 'clsx';
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
    gradient: 'from-blue-500 to-cyan-400',
    glowColor: 'rgba(59, 130, 246, 0.4)',
  },
  {
    id: 'tasks',
    label: 'Tasks & Projects',
    icon: CheckSquare,
    description: 'Manage tasks, projects, and calendar',
    gradient: 'from-emerald-500 to-teal-400',
    glowColor: 'rgba(16, 185, 129, 0.4)',
  },
  {
    id: 'productivity',
    label: 'Productivity',
    icon: Zap,
    description: 'Pomodoro timer, habits, and focus tools',
    gradient: 'from-violet-500 to-purple-400',
    glowColor: 'rgba(139, 92, 246, 0.4)',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'Performance metrics and insights',
    gradient: 'from-indigo-500 to-blue-400',
    glowColor: 'rgba(99, 102, 241, 0.4)',
  },
  {
    id: 'life',
    label: 'Life & Wellness',
    icon: Heart,
    description: 'Wellness tracking and life balance',
    gradient: 'from-pink-500 to-rose-400',
    glowColor: 'rgba(236, 72, 153, 0.4)',
  },
  {
    id: 'data',
    label: 'Data Input',
    icon: Database,
    description: 'Log activities and track progress',
    gradient: 'from-amber-500 to-orange-400',
    glowColor: 'rgba(245, 158, 11, 0.4)',
  },
];

type NavItemProps = {
  item: (typeof navigationItems)[number];
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
  index: number;
};

function NavItem({ item, isActive, isCollapsed, onClick, index }: NavItemProps) {
  const Icon = item.icon;

  const content = (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: 'easeInOut' as const,
      }}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        'group relative flex w-full items-center gap-3.5 rounded-xl px-3.5 py-3 text-left transition-all duration-300',
        {
          'justify-center px-3': isCollapsed,
        }
      )}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${item.glowColor}, transparent)`
          : 'transparent',
      }}
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

      {/* Icon container */}
      <div
        className={clsx(
          'relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300',
          {
            [`bg-gradient-to-br ${item.gradient} shadow-lg`]: isActive,
            'bg-white/5 group-hover:bg-white/10': !isActive,
          }
        )}
        style={{
          boxShadow: isActive ? `0 4px 20px ${item.glowColor}` : 'none',
        }}
      >
        <Icon
          className={clsx('h-5 w-5 transition-all duration-300', {
            'text-white': isActive,
            'text-white/60 group-hover:text-white/90': !isActive,
          })}
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
              className={clsx(
                'font-display font-semibold text-sm truncate transition-colors duration-300',
                {
                  'text-white': isActive,
                  'text-white/70 group-hover:text-white': !isActive,
                }
              )}
            >
              {item.label}
            </span>
            <span className="text-xs text-white/40 truncate">
              {item.description}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
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

  return content;
}

type SidebarProps = {
  currentPage: string;
  onPageChange: (pageId: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export function Sidebar({
  currentPage,
  onPageChange,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.div
        initial={false}
        animate={{
          width: isCollapsed ? 88 : 280,
          x: sidebarOpen ? 0 : -280,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut' as const,
        }}
        className={clsx(
          'fixed inset-y-0 left-0 z-50 flex h-full flex-col m-4 lg:relative lg:m-0 lg:translate-x-0',
          'glass-nav'
        )}
        style={{
          width: isCollapsed ? 88 : 280,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-4 h-20">
          <motion.div
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className={clsx('flex items-center gap-3 overflow-hidden', {
              'opacity-0 pointer-events-none': isCollapsed,
            })}
          >
            <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4cc9f0] to-[#a29bfe] shadow-lg shadow-cyan-500/20">
              <span className="font-display text-sm font-bold text-white">TM</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white whitespace-nowrap">
                Task Master
              </h1>
              <p className="text-xs text-white/50">Your productivity hub</p>
            </div>
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="flex-shrink-0 lg:hidden text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow space-y-1.5 overflow-y-auto p-4 custom-scrollbar">
          {navigationItems.map((item, index) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={currentPage === item.id}
              isCollapsed={isCollapsed}
              index={index}
              onClick={() => {
                onPageChange(item.id);
                if (window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
            />
          ))}
        </nav>

        {/* Footer & Collapse Toggle */}
        <div className="border-t border-white/10 p-4">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 px-2"
            >
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>Pro Version</span>
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#4cc9f0]/20 to-[#a29bfe]/20 text-[#4cc9f0] font-medium">
                  Active
                </span>
              </div>
            </motion.div>
          )}
          <Button
            variant="ghost"
            className="hidden w-full justify-center lg:flex text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
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

      {/* Mobile Toggle Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-6 left-6 z-30 lg:hidden"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-white/70 hover:text-white hover:bg-white/10 shadow-lg shadow-black/20"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </motion.div>
    </>
  );
}
