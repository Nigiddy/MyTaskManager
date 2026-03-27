/**
 * hooks/usePomodoroTimer.ts
 * Owns all Pomodoro timer state: countdown, mode switching, session tracking.
 */
import { useState, useEffect, useCallback } from 'react';
import type { TimerMode, TimerState, TimerSettings } from '@/types';

const defaultSettings: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
};

export function usePomodoroTimer() {
  const [settings] = useState<TimerSettings>(defaultSettings);
  const [currentMode, setCurrentMode] = useState<TimerMode>('work');
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [timeLeft, setTimeLeft] = useState(defaultSettings.workDuration * 60);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const getDuration = useCallback((mode: TimerMode) => {
    if (mode === 'work') return settings.workDuration * 60;
    if (mode === 'shortBreak') return settings.shortBreakDuration * 60;
    return settings.longBreakDuration * 60;
  }, [settings]);

  const startTimer = () => setTimerState('running');
  const pauseTimer = () => setTimerState('paused');

  const resetTimer = useCallback(() => {
    setTimerState('idle');
    setTimeLeft(settings.workDuration * 60);
    setCurrentMode('work');
  }, [settings.workDuration]);

  const completeSession = useCallback(() => {
    if (currentMode === 'work') {
      setCompletedPomodoros(prev => prev + 1);
    }
    if (currentMode === 'work') {
      const nextMode = completedPomodoros + 1 >= settings.longBreakInterval ? 'longBreak' : 'shortBreak';
      setCurrentMode(nextMode);
      setTimeLeft(nextMode === 'longBreak' ? settings.longBreakDuration * 60 : settings.shortBreakDuration * 60);
    } else {
      setCurrentMode('work');
      setTimeLeft(settings.workDuration * 60);
    }
    setTimerState('idle');
  }, [currentMode, completedPomodoros, settings]);

  // Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerState === 'running' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { setTimerState('completed'); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [timerState, timeLeft]);

  // Auto-advance after completion
  useEffect(() => {
    if (timerState === 'completed') {
      const timer = setTimeout(() => completeSession(), 2000);
      return () => clearTimeout(timer);
    }
  }, [timerState, completeSession]);

  const totalDuration = getDuration(currentMode);
  const progressPercentage = ((totalDuration - timeLeft) / totalDuration) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return {
    settings, currentMode, timerState, timeLeft, completedPomodoros,
    isFocusMode, setIsFocusMode, startTimer, pauseTimer, resetTimer,
    progressPercentage, formatTime,
  };
}
