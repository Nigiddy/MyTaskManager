'use client';

import { useState } from 'react';
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
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'tasks',
    label: 'Tasks & Projects',
    icon: CheckSquare,
    description: 'Manage tasks, projects, and calendar',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'productivity',
    label: 'Productivity',
    icon: Zap,
    description: 'Pomodoro timer, habits, and focus tools',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'Performance metrics and insights',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'life',
    label: 'Life & Wellness',
    icon: Heart,
    description: 'Wellness tracking and life balance',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'data',
    label: 'Data Input',
    icon: Database,
    description: 'Log activities and track progress',
    color: 'from-amber-500 to-orange-500',
  },
];

type NavItemProps = {
  item: (typeof navigationItems)[number];
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
};

function NavItem({ item, isActive, isCollapsed, onClick }: NavItemProps) {
  const Icon = item.icon;
  const content = (
    <button
      onClick={onClick}
      className={clsx(
        'group flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all duration-200 active:scale-95',
        {
          [`bg-gradient-to-r ${item.color} text-white shadow-lg`]: isActive,
          'text-primary hover:bg-white/10 glass-card': !isActive,
          'justify-center': isCollapsed,
        }
      )}
    >
      <Icon
        className={clsx('h-5 w-5 flex-shrink-0', {
          'text-white': isActive,
          'text-secondary group-hover:text-primary': !isActive,
        })}
      />
      {!isCollapsed && (
        <span className="flex-grow truncate font-medium">{item.label}</span>
      )}
    </button>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.label}</p>
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
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-50 flex h-full flex-col glass-nav transition-all duration-300 ease-in-out lg:relative',
          {
            'w-64': !isCollapsed,
            'w-20': isCollapsed,
            'translate-x-0': sidebarOpen,
            '-translate-x-full lg:translate-x-0': !sidebarOpen,
          }
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/20 p-4">
          <div
            className={clsx('flex items-center gap-2 overflow-hidden', {
              'opacity-0': isCollapsed,
            })}
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-accent to-highlight shadow-lg">
              <span className="text-sm font-bold text-white">TM</span>
            </div>
            <div className="transition-opacity">
              <h1 className="whitespace-nowrap font-bold text-primary">
                Task Master
              </h1>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="flex-shrink-0 lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow space-y-2 overflow-y-auto p-4 custom-scrollbar">
          {navigationItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={currentPage === item.id}
              isCollapsed={isCollapsed}
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
        <div className="border-t border-white/20 p-4">
          <Button
            variant="ghost"
            className="hidden w-full justify-center lg:flex"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronsRight className="h-5 w-5 text-secondary" />
            ) : (
              <ChevronsLeft className="h-5 w-5 text-secondary" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden glass-button"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}
