/**
 * components/features/HabitStreaks.tsx
 * Renders habit tracker with streak counters and daily toggle.
 * All state lives in useHabits().
 */
'use client';

import { Flame, Target, Trophy, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useHabits } from '@/hooks/useHabits';
import type { Habit } from '@/types';

const categoryColors: Record<string, string> = {
  Fitness: 'bg-blue-100 text-blue-700 border-blue-200',
  Productivity: 'bg-green-100 text-green-700 border-green-200',
  Learning: 'bg-purple-100 text-purple-700 border-purple-200',
  Business: 'bg-orange-100 text-orange-700 border-orange-200',
};

function HabitCard({ habit, onToggle }: { habit: Habit; onToggle: () => void }) {
  return (
    <div className={`p-3 rounded-lg border transition-all ${habit.completedToday ? 'bg-green-50 border-green-200' : 'bg-white border-[#FFE8D6] hover:border-[#FF9F43]'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{habit.icon}</span>
          <div>
            <h3 className={`font-medium text-sm ${habit.completedToday ? 'text-green-700' : 'text-gray-800'}`}>{habit.name}</h3>
            <Badge variant="outline" className={`text-xs ${categoryColors[habit.category] ?? 'bg-gray-100 text-gray-700 border-gray-200'}`}>
              {habit.category}
            </Badge>
          </div>
        </div>
        <Button
          variant={habit.completedToday ? 'outline' : 'default'} size="sm"
          className={`h-8 px-3 text-xs ${habit.completedToday ? 'border-green-300 text-green-700 hover:bg-green-50' : 'bg-[#FF9F43] hover:bg-[#FF8F33] text-white'}`}
          onClick={onToggle}>{habit.completedToday ? '✓ Done' : 'Mark Done'}
        </Button>
      </div>
      <div className="flex items-center space-x-4 text-xs">
        <div className="flex items-center text-orange-500">
          <Flame size={14} className="mr-1" /><span className="font-medium">{habit.currentStreak} days</span>
        </div>
        <div className="flex items-center text-blue-500">
          <Trophy size={14} className="mr-1" /><span className="font-medium">Best: {habit.longestStreak}</span>
        </div>
        {habit.completedToday && (
          <div className="flex items-center text-green-600">
            <Target size={14} className="mr-1" /><span className="font-medium">Streak Active!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function HabitStreaks() {
  const { habits, toggleHabitCompletion, totalStreaks, completedToday, completionRate } = useHabits();

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">HABIT STREAKS</h2>
        <div className="flex items-center space-x-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="text-sm font-bold text-orange-500">{totalStreaks}</span>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#666]">Today&apos;s Progress</span>
          <span className="text-sm font-bold text-[#FF9F43]">{completionRate}%</span>
        </div>
        <Progress value={completionRate} className="h-2 bg-[#FFE8D6]" />
        <div className="flex items-center justify-between mt-2 text-xs text-[#666]">
          <span>{completedToday} of {habits.length} habits completed</span>
          <span className="text-[#FF9F43] font-medium">Keep the streak alive!</span>
        </div>
      </div>

      <div className="space-y-3">
        {habits.map(habit => (
          <HabitCard key={habit.id} habit={habit} onToggle={() => toggleHabitCompletion(habit.id)} />
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-purple-700">
            <TrendingUp size={16} className="mr-2" />
            <span className="text-sm font-medium">Weekly Challenge</span>
          </div>
          <span className="text-sm font-bold text-purple-700">7-Day Streak Goal</span>
        </div>
        <div className="mt-2 text-xs text-purple-600">
          Complete all habits for 7 consecutive days to unlock the &quot;Discipline Master&quot; badge!
        </div>
      </div>
    </div>
  );
}
