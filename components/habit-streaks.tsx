'use client';

import { useState } from 'react';
import { Flame, Target, Trophy, Calendar, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type Habit = {
  id: number;
  name: string;
  icon: string;
  currentStreak: number;
  longestStreak: number;
  completedToday: boolean;
  category: 'Fitness' | 'Productivity' | 'Learning' | 'Business';
};

export function HabitStreaks() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: '4 AM Wake-up',
      icon: '🌅',
      currentStreak: 7,
      longestStreak: 12,
      completedToday: true,
      category: 'Productivity',
    },
    {
      id: 2,
      name: 'Morning Workout',
      icon: '💪',
      currentStreak: 5,
      longestStreak: 8,
      completedToday: true,
      category: 'Fitness',
    },
    {
      id: 3,
      name: 'Coding Session',
      icon: '💻',
      currentStreak: 9,
      longestStreak: 15,
      completedToday: false,
      category: 'Learning',
    },
    {
      id: 4,
      name: 'Business Strategy',
      icon: '🎯',
      currentStreak: 3,
      longestStreak: 6,
      completedToday: false,
      category: 'Business',
    },
    {
      id: 5,
      name: 'Evening Reflection',
      icon: '📝',
      currentStreak: 4,
      longestStreak: 7,
      completedToday: false,
      category: 'Productivity',
    },
  ]);

  const toggleHabitCompletion = (habitId: number) => {
    setHabits(
      habits.map(habit =>
        habit.id === habitId
          ? { ...habit, completedToday: !habit.completedToday }
          : habit
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fitness':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Productivity':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Learning':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Business':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const totalStreaks = habits.reduce(
    (sum, habit) => sum + habit.currentStreak,
    0
  );
  const completedToday = habits.filter(habit => habit.completedToday).length;
  const completionRate = Math.round((completedToday / habits.length) * 100);

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">HABIT STREAKS</h2>
        <div className="flex items-center space-x-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="text-sm font-bold text-orange-500">
            {totalStreaks}
          </span>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-4 p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#666]">
            Today's Progress
          </span>
          <span className="text-sm font-bold text-[#FF9F43]">
            {completionRate}%
          </span>
        </div>
        <Progress value={completionRate} className="h-2 bg-[#FFE8D6]" />
        <div className="flex items-center justify-between mt-2 text-xs text-[#666]">
          <span>
            {completedToday} of {habits.length} habits completed
          </span>
          <span className="text-[#FF9F43] font-medium">
            Keep the streak alive!
          </span>
        </div>
      </div>

      {/* Individual Habits */}
      <div className="space-y-3">
        {habits.map(habit => (
          <div
            key={habit.id}
            className={`p-3 rounded-lg border transition-all ${
              habit.completedToday
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-[#FFE8D6] hover:border-[#FF9F43]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{habit.icon}</span>
                <div>
                  <h3
                    className={`font-medium text-sm ${
                      habit.completedToday ? 'text-green-700' : 'text-gray-800'
                    }`}
                  >
                    {habit.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getCategoryColor(habit.category)}`}
                  >
                    {habit.category}
                  </Badge>
                </div>
              </div>
              <Button
                variant={habit.completedToday ? 'outline' : 'default'}
                size="sm"
                className={`h-8 px-3 text-xs ${
                  habit.completedToday
                    ? 'border-green-300 text-green-700 hover:bg-green-50'
                    : 'bg-[#FF9F43] hover:bg-[#FF8F33] text-white'
                }`}
                onClick={() => toggleHabitCompletion(habit.id)}
              >
                {habit.completedToday ? '✓ Done' : 'Mark Done'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center text-orange-500">
                  <Flame size={14} className="mr-1" />
                  <span className="font-medium">
                    {habit.currentStreak} days
                  </span>
                </div>
                <div className="flex items-center text-blue-500">
                  <Trophy size={14} className="mr-1" />
                  <span className="font-medium">
                    Best: {habit.longestStreak}
                  </span>
                </div>
              </div>

              {habit.completedToday && (
                <div className="flex items-center text-green-600">
                  <Target size={14} className="mr-1" />
                  <span className="text-xs font-medium">Streak Active!</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Challenge */}
      <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-purple-700">
            <TrendingUp size={16} className="mr-2" />
            <span className="text-sm font-medium">Weekly Challenge</span>
          </div>
          <span className="text-sm font-bold text-purple-700">
            7-Day Streak Goal
          </span>
        </div>
        <div className="mt-2 text-xs text-purple-600">
          Complete all habits for 7 consecutive days to unlock the "Discipline
          Master" badge!
        </div>
      </div>
    </div>
  );
}
