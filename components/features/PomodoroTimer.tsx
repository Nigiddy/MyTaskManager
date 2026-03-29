/**
 * components/features/PomodoroTimer.tsx
 * Renders the Pomodoro timer UI.
 * All timer state and effects live in usePomodoroTimer().
 */
'use client';

import { Play, Pause, RotateCcw, Settings, Focus, Coffee, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { usePomodoroTimer } from '@/hooks/usePomodoroTimer';
import type { TimerMode } from '@/types';

const modeConfig: Record<TimerMode, { color: string; label: string; Icon: React.ElementType }> = {
  work: { color: 'bg-red-500', label: 'Focus Time', Icon: Focus },
  shortBreak: { color: 'bg-green-500', label: 'Short Break', Icon: Coffee },
  longBreak: { color: 'bg-blue-500', label: 'Long Break', Icon: CheckCircle },
};

export function PomodoroTimer() {
  const {
    settings, currentMode, timerState, timeLeft, completedPomodoros,
    isFocusMode, setIsFocusMode, startTimer, pauseTimer, resetTimer,
    progressPercentage, formatTime,
  } = usePomodoroTimer();

  const { color, label, Icon } = modeConfig[currentMode];

  return (
    <div className={`bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 ${isFocusMode ? 'ring-2 ring-[#FF9F43] ring-opacity-50' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">POMODORO TIMER</h2>
        <Button variant={isFocusMode ? 'default' : 'outline'} size="sm"
          className={`h-8 px-3 text-xs ${isFocusMode ? 'bg-[#FF9F43]' : ''}`}
          onClick={() => setIsFocusMode(!isFocusMode)}>
          <Focus size={14} className="mr-1" />{isFocusMode ? 'Focus On' : 'Focus Off'}
        </Button>
      </div>

      <div className="text-center mb-6">
        <div className={`inline-flex items-center px-4 py-2 rounded-full mb-3 ${color} text-white text-sm font-medium`}>
          <Icon size={16} className="mr-2" />{label}
        </div>
        <div className="text-6xl font-bold text-[#333] mb-2 font-mono">{formatTime(timeLeft)}</div>
        <Progress value={progressPercentage} className="h-3 bg-[#FFE8D6] max-w-md mx-auto" />
      </div>

      <div className="flex items-center justify-center space-x-3 mb-6">
        {timerState === 'idle' || timerState === 'paused' ? (
          <Button onClick={startTimer} className="bg-[#FF9F43] hover:bg-[#FF8F33] text-white px-6 py-2">
            <Play size={16} className="mr-2" />Start
          </Button>
        ) : (
          <Button onClick={pauseTimer} variant="outline" className="border-[#FF9F43] text-[#FF9F43] hover:bg-[#FF9F43] hover:text-white px-6 py-2">
            <Pause size={16} className="mr-2" />Pause
          </Button>
        )}
        <Button onClick={resetTimer} variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2">
          <RotateCcw size={16} className="mr-2" />Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {[
          { value: completedPomodoros, label: 'Completed Today', color: 'text-[#FF9F43]' },
          { value: `${Math.floor((completedPomodoros * 25) / 60)}h`, label: 'Focus Time', color: 'text-green-600' },
          { value: settings.longBreakInterval, label: 'Until Long Break', color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="text-center p-3 bg-white rounded-lg border border-[#FFE8D6]">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-[#666]">{s.label}</div>
          </div>
        ))}
      </div>

      {isFocusMode && (
        <div className="p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
          <div className="flex items-center justify-between text-red-700">
            <span className="text-sm font-medium">Focus Mode Active</span>
            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">Distraction-Free</Badge>
          </div>
          <div className="mt-2 text-xs text-red-600">Notifications muted • Stay focused • Break timer will remind you to rest</div>
        </div>
      )}

      <div className="mt-4 p-3 bg-[#FFE8D6] rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666]">Timer Settings</span>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-[#FF9F43]">
            <Settings size={14} className="mr-1" />Customize
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-[#666]">
          <div>Work: {settings.workDuration}m</div>
          <div>Short: {settings.shortBreakDuration}m</div>
          <div>Long: {settings.longBreakDuration}m</div>
        </div>
      </div>
    </div>
  );
}
