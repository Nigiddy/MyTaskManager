'use client';

import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Calendar,
  Activity,
  Zap,
  Brain,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type ProductivityData = {
  hour: number;
  focusScore: number;
  tasksCompleted: number;
  deepWorkMinutes: number;
};

type WeeklyMetric = {
  week: string;
  productivity: number;
  focusTime: number;
  tasksCompleted: number;
  habitsMaintained: number;
};

type FocusSession = {
  id: number;
  startTime: string;
  duration: number;
  task: string;
  focusScore: number;
  interruptions: number;
};

export function PerformanceAnalytics() {
  const [productivityData] = useState<ProductivityData[]>([
    { hour: 4, focusScore: 95, tasksCompleted: 2, deepWorkMinutes: 90 },
    { hour: 5, focusScore: 90, tasksCompleted: 1, deepWorkMinutes: 60 },
    { hour: 6, focusScore: 88, tasksCompleted: 3, deepWorkMinutes: 180 },
    { hour: 7, focusScore: 85, tasksCompleted: 2, deepWorkMinutes: 120 },
    { hour: 8, focusScore: 82, tasksCompleted: 1, deepWorkMinutes: 60 },
    { hour: 9, focusScore: 78, tasksCompleted: 2, deepWorkMinutes: 90 },
    { hour: 10, focusScore: 75, tasksCompleted: 1, deepWorkMinutes: 60 },
    { hour: 11, focusScore: 72, tasksCompleted: 2, deepWorkMinutes: 90 },
    { hour: 12, focusScore: 65, tasksCompleted: 1, deepWorkMinutes: 30 },
    { hour: 13, focusScore: 70, tasksCompleted: 2, deepWorkMinutes: 60 },
    { hour: 14, focusScore: 75, tasksCompleted: 3, deepWorkMinutes: 90 },
    { hour: 15, focusScore: 80, tasksCompleted: 2, deepWorkMinutes: 120 },
    { hour: 16, focusScore: 78, tasksCompleted: 2, deepWorkMinutes: 90 },
    { hour: 17, focusScore: 75, tasksCompleted: 1, deepWorkMinutes: 60 },
    { hour: 18, focusScore: 70, tasksCompleted: 2, deepWorkMinutes: 60 },
    { hour: 19, focusScore: 68, tasksCompleted: 1, deepWorkMinutes: 45 },
    { hour: 20, focusScore: 65, tasksCompleted: 2, deepWorkMinutes: 60 },
    { hour: 21, focusScore: 60, tasksCompleted: 1, deepWorkMinutes: 30 },
    { hour: 22, focusScore: 55, tasksCompleted: 1, deepWorkMinutes: 45 },
    { hour: 23, focusScore: 50, tasksCompleted: 1, deepWorkMinutes: 30 },
    { hour: 0, focusScore: 45, tasksCompleted: 0, deepWorkMinutes: 0 },
  ]);

  const [weeklyMetrics] = useState<WeeklyMetric[]>([
    {
      week: 'Week 1',
      productivity: 85,
      focusTime: 42,
      tasksCompleted: 45,
      habitsMaintained: 6,
    },
    {
      week: 'Week 2',
      productivity: 88,
      focusTime: 45,
      tasksCompleted: 48,
      habitsMaintained: 7,
    },
    {
      week: 'Week 3',
      productivity: 82,
      focusTime: 40,
      tasksCompleted: 42,
      habitsMaintained: 5,
    },
    {
      week: 'Week 4',
      productivity: 90,
      focusTime: 48,
      tasksCompleted: 52,
      habitsMaintained: 7,
    },
  ]);

  const [focusSessions] = useState<FocusSession[]>([
    {
      id: 1,
      startTime: '6:00 AM',
      duration: 180,
      task: 'Full-Stack Development',
      focusScore: 95,
      interruptions: 1,
    },
    {
      id: 2,
      startTime: '9:30 AM',
      duration: 90,
      task: 'Python Learning',
      focusScore: 88,
      interruptions: 2,
    },
    {
      id: 3,
      startTime: '11:30 AM',
      duration: 150,
      task: 'WiFi Billing System',
      focusScore: 92,
      interruptions: 0,
    },
    {
      id: 4,
      startTime: '2:30 PM',
      duration: 90,
      task: 'Sales Outreach',
      focusScore: 78,
      interruptions: 3,
    },
    {
      id: 5,
      startTime: '6:30 PM',
      duration: 90,
      task: 'UI/UX Design',
      focusScore: 85,
      interruptions: 1,
    },
  ]);

  const getFocusScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getFocusScoreText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    if (score >= 60) return 'Poor';
    return 'Very Poor';
  };

  const totalFocusTime = focusSessions.reduce(
    (sum, session) => sum + session.duration,
    0
  );
  const averageFocusScore = Math.round(
    focusSessions.reduce((sum, session) => sum + session.focusScore, 0) /
      focusSessions.length
  );
  const totalInterruptions = focusSessions.reduce(
    (sum, session) => sum + session.interruptions,
    0
  );

  const currentWeek = weeklyMetrics[weeklyMetrics.length - 1];
  const previousWeek = weeklyMetrics[weeklyMetrics.length - 2];
  const productivityChange =
    currentWeek.productivity - previousWeek.productivity;

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">PERFORMANCE ANALYTICS</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-[#666] hover:text-[#333]"
        >
          <BarChart3 size={16} className="mr-1" />
          Export Data
        </Button>
      </div>

      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp size={16} className="text-green-600 mr-1" />
            <span className="text-xs text-[#666]">Productivity</span>
          </div>
          <div className="text-xl font-bold text-[#333]">
            {currentWeek.productivity}%
          </div>
          <div
            className={`text-xs ${productivityChange >= 0 ? 'text-green-600' : 'text-red-600'}`}
          >
            {productivityChange >= 0 ? '+' : ''}
            {productivityChange}% vs last week
          </div>
        </div>

        <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock size={16} className="text-blue-600 mr-1" />
            <span className="text-xs text-[#666]">Focus Time</span>
          </div>
          <div className="text-xl font-bold text-[#333]">
            {currentWeek.focusTime}h
          </div>
          <div className="text-xs text-[#666]">This week</div>
        </div>

        <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="flex items-center justify-center mb-2">
            <Target size={16} className="text-orange-600 mr-1" />
            <span className="text-xs text-[#666]">Tasks Done</span>
          </div>
          <div className="text-xl font-bold text-[#333]">
            {currentWeek.tasksCompleted}
          </div>
          <div className="text-xs text-[#666]">Completed</div>
        </div>

        <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="flex items-center justify-center mb-2">
            <Activity size={16} className="text-purple-600 mr-1" />
            <span className="text-xs text-[#666]">Habits</span>
          </div>
          <div className="text-xl font-bold text-[#333]">
            {currentWeek.habitsMaintained}/7
          </div>
          <div className="text-xs text-[#666]">Maintained</div>
        </div>
      </div>

      {/* Productivity Heatmap */}
      <div className="mb-6">
        <h3 className="font-medium text-[#333] mb-3">
          Daily Productivity Heatmap
        </h3>
        <div className="bg-white p-4 rounded-lg border border-[#FFE8D6]">
          <div className="grid grid-cols-12 gap-1 mb-2">
            {productivityData.map(data => (
              <div key={data.hour} className="text-center">
                <div className="text-xs text-[#666] mb-1">{data.hour}:00</div>
                <div
                  className={`w-full h-8 rounded transition-colors ${getFocusScoreColor(data.focusScore)}`}
                  style={{ opacity: data.focusScore / 100 }}
                  title={`${data.hour}:00 - Focus: ${data.focusScore}%, Tasks: ${data.tasksCompleted}, Deep Work: ${data.deepWorkMinutes}m`}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-4 text-xs text-[#666]">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
              <span>90%+ (Peak)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
              <span>80-89% (High)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
              <span>70-79% (Medium)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
              <span>60-69% (Low)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
              <span>&lt;60% (Poor)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Focus Sessions Analysis */}
      <div className="mb-6">
        <h3 className="font-medium text-[#333] mb-3">
          Focus Sessions Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(totalFocusTime / 60)}h
            </div>
            <div className="text-xs text-[#666]">Total Focus Time</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-center">
            <div className="text-2xl font-bold text-green-600">
              {averageFocusScore}%
            </div>
            <div className="text-xs text-[#666]">Average Focus Score</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-center">
            <div className="text-2xl font-bold text-red-600">
              {totalInterruptions}
            </div>
            <div className="text-xs text-[#666]">Total Interruptions</div>
          </div>
        </div>

        <div className="space-y-3">
          {focusSessions.map(session => (
            <div
              key={session.id}
              className="p-3 bg-white rounded-lg border border-[#FFE8D6] hover:border-[#FF9F43] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${getFocusScoreColor(session.focusScore)}`}
                  ></div>
                  <div>
                    <h4 className="text-sm font-medium text-[#333]">
                      {session.task}
                    </h4>
                    <div className="text-xs text-[#666]">
                      {session.startTime} • {session.duration}m
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#333]">
                    {session.focusScore}%
                  </div>
                  <div className="text-xs text-[#666]">
                    {getFocusScoreText(session.focusScore)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#666]">
                <span>Interruptions: {session.interruptions}</span>
                <span>
                  Focus Quality:{' '}
                  {session.focusScore >= 90
                    ? '🔥 Excellent'
                    : session.focusScore >= 80
                      ? '⚡ Good'
                      : '💡 Fair'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="mb-6">
        <h3 className="font-medium text-[#333] mb-3">Weekly Trends</h3>
        <div className="bg-white p-4 rounded-lg border border-[#FFE8D6]">
          <div className="grid grid-cols-4 gap-4">
            {weeklyMetrics.map((week, index) => (
              <div key={week.week} className="text-center">
                <div className="text-sm font-medium text-[#333] mb-2">
                  {week.week}
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-[#666]">Productivity</div>
                  <div className="text-lg font-bold text-[#FF9F43]">
                    {week.productivity}%
                  </div>
                  <Progress
                    value={week.productivity}
                    className="h-2 bg-[#FFE8D6]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Review Prompt */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-purple-700">
            <Brain size={16} className="mr-2" />
            <span className="font-medium">Weekly Review</span>
          </div>
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-700 border-purple-200 text-xs"
          >
            Due Today
          </Badge>
        </div>
        <div className="text-sm text-purple-700 mb-3">
          <strong>Reflection Questions:</strong>
        </div>
        <div className="space-y-2 text-xs text-purple-600">
          <div>• What were your 3 biggest wins this week?</div>
          <div>• Which habits helped you stay productive?</div>
          <div>• What can you optimize for next week?</div>
          <div>• How did your focus sessions perform?</div>
        </div>
        <div className="mt-3 flex space-x-2">
          <Button
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs"
          >
            <Zap size={14} className="mr-1" />
            Start Review
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-purple-300 text-purple-700 hover:bg-purple-50 text-xs"
          >
            <Calendar size={14} className="mr-1" />
            Schedule Later
          </Button>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mt-4 p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666]">Key Insights</span>
          <span className="font-bold text-[#FF9F43]">Data-Driven Growth</span>
        </div>
        <div className="mt-2 text-xs text-[#666]">
          Peak productivity: 4-6 AM • Focus quality improves with fewer
          interruptions • Weekly reviews boost consistency by 15%
        </div>
      </div>
    </div>
  );
}
