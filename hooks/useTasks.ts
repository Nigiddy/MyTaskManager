/**
 * hooks/useTasks.ts
 * Owns the daily task list state and exposes toggle action.
 */
import { useState } from 'react';
import {
  FileText, Code, TrendingUp, Briefcase,
  Dumbbell, Palette, MessageSquare,
} from 'lucide-react';
import type { Task } from '@/types';

const initialTasks: Task[] = [
  { id: 1, name: '4:00 AM - Morning Workout & Meditation', time: '4:00 AM - 5:30 AM', priority: 'High', category: 'Fitness', icon: Dumbbell, completed: false },
  { id: 2, name: 'Full-Stack Development Session', time: '6:00 AM - 9:00 AM', priority: 'High', category: 'Coding', icon: Code, completed: false },
  { id: 3, name: 'Python Learning & Practice', time: '9:30 AM - 11:00 AM', priority: 'Medium', category: 'Learning', icon: Code, completed: false },
  { id: 4, name: 'WiFi Billing System Development', time: '11:30 AM - 2:00 PM', priority: 'High', category: 'Projects', icon: Briefcase, completed: false },
  { id: 5, name: 'Sales Outreach - Cybercafes', time: '2:30 PM - 4:00 PM', priority: 'Medium', category: 'Business', icon: MessageSquare, completed: false },
  { id: 6, name: 'Discord Community Client Outreach', time: '4:30 PM - 6:00 PM', priority: 'Medium', category: 'Business', icon: MessageSquare, completed: false },
  { id: 7, name: 'UI/UX Design Work Session', time: '6:30 PM - 8:00 PM', priority: 'Low', category: 'Design', icon: Palette, completed: false },
  { id: 8, name: 'Trading Review & Analysis', time: '8:30 PM - 9:30 PM', priority: 'Medium', category: 'Trading', icon: TrendingUp, completed: false },
  { id: 9, name: 'Business Strategy - Dem Man & Dicla', time: '10:00 PM - 11:00 PM', priority: 'High', category: 'Business', icon: Briefcase, completed: false },
  { id: 10, name: 'Evening Reflection & Journaling', time: '11:30 PM - 12:00 AM', priority: 'Low', category: 'Personal', icon: FileText, completed: false },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleComplete = (taskId: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const completionPercent = Math.round((completedCount / tasks.length) * 100);

  return { tasks, toggleComplete, completedCount, completionPercent };
}
