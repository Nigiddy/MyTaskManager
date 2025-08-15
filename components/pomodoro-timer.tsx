"use client"

import { useState, useEffect, useCallback } from "react"
import { Play, Pause, RotateCcw, Settings, Focus, Coffee, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

type TimerMode = "work" | "shortBreak" | "longBreak"
type TimerState = "idle" | "running" | "paused" | "completed"

interface TimerSettings {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  longBreakInterval: number
}

export function PomodoroTimer() {
  const [settings, setSettings] = useState<TimerSettings>({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4
  })

  const [currentMode, setCurrentMode] = useState<TimerMode>("work")
  const [timerState, setTimerState] = useState<TimerState>("idle")
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [isFocusMode, setIsFocusMode] = useState(false)

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getModeColor = (mode: TimerMode): string => {
    switch (mode) {
      case "work": return "bg-red-500"
      case "shortBreak": return "bg-green-500"
      case "longBreak": return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  const getModeLabel = (mode: TimerMode): string => {
    switch (mode) {
      case "work": return "Focus Time"
      case "shortBreak": return "Short Break"
      case "longBreak": return "Long Break"
      default: return "Unknown"
    }
  }

  const startTimer = useCallback(() => {
    setTimerState("running")
  }, [])

  const pauseTimer = useCallback(() => {
    setTimerState("paused")
  }, [])

  const resetTimer = useCallback(() => {
    setTimerState("idle")
    setTimeLeft(settings.workDuration * 60)
    setCurrentMode("work")
  }, [settings.workDuration])

  const completeSession = useCallback(() => {
    if (currentMode === "work") {
      setCompletedPomodoros(prev => prev + 1)
    }
    
    // Determine next mode
    if (currentMode === "work") {
      if (completedPomodoros + 1 >= settings.longBreakInterval) {
        setCurrentMode("longBreak")
        setTimeLeft(settings.longBreakDuration * 60)
      } else {
        setCurrentMode("shortBreak")
        setTimeLeft(settings.shortBreakDuration * 60)
      }
    } else {
      setCurrentMode("work")
      setTimeLeft(settings.workDuration * 60)
    }
    
    setTimerState("idle")
  }, [currentMode, completedPomodoros, settings])

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (timerState === "running" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimerState("completed")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerState, timeLeft])

  // Auto-start next session when completed
  useEffect(() => {
    if (timerState === "completed") {
      const timer = setTimeout(() => {
        completeSession()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [timerState, completeSession])

  const progressPercentage = ((settings[currentMode === "work" ? "workDuration" : 
    currentMode === "shortBreak" ? "shortBreakDuration" : "longBreakDuration"] * 60) - timeLeft) / 
    (settings[currentMode === "work" ? "workDuration" : 
    currentMode === "shortBreak" ? "shortBreakDuration" : "longBreakDuration"] * 60) * 100

  return (
    <div className={`bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 ${
      isFocusMode ? 'ring-2 ring-[#FF9F43] ring-opacity-50' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">POMODORO TIMER</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={isFocusMode ? "default" : "outline"}
            size="sm"
            className={`h-8 px-3 text-xs ${isFocusMode ? 'bg-[#FF9F43]' : ''}`}
            onClick={() => setIsFocusMode(!isFocusMode)}
          >
            <Focus size={14} className="mr-1" />
            {isFocusMode ? 'Focus On' : 'Focus Off'}
          </Button>
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center px-4 py-2 rounded-full mb-3 ${
          getModeColor(currentMode)
        } text-white text-sm font-medium`}>
          {currentMode === "work" && <Focus size={16} className="mr-2" />}
          {currentMode === "shortBreak" && <Coffee size={16} className="mr-2" />}
          {currentMode === "longBreak" && <CheckCircle size={16} className="mr-2" />}
          {getModeLabel(currentMode)}
        </div>
        
        <div className="text-6xl font-bold text-[#333] mb-2 font-mono">
          {formatTime(timeLeft)}
        </div>
        
        <Progress 
          value={progressPercentage} 
          className="h-3 bg-[#FFE8D6] max-w-md mx-auto"
        />
      </div>

      {/* Timer Controls */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        {timerState === "idle" || timerState === "paused" ? (
          <Button
            onClick={startTimer}
            className="bg-[#FF9F43] hover:bg-[#FF8F33] text-white px-6 py-2"
          >
            <Play size={16} className="mr-2" />
            Start
          </Button>
        ) : (
          <Button
            onClick={pauseTimer}
            variant="outline"
            className="border-[#FF9F43] text-[#FF9F43] hover:bg-[#FF9F43] hover:text-white px-6 py-2"
          >
            <Pause size={16} className="mr-2" />
            Pause
          </Button>
        )}
        
        <Button
          onClick={resetTimer}
          variant="outline"
          className="border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2"
        >
          <RotateCcw size={16} className="mr-2" />
          Reset
        </Button>
      </div>

      {/* Session Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-white rounded-lg border border-[#FFE8D6]">
          <div className="text-2xl font-bold text-[#FF9F43]">{completedPomodoros}</div>
          <div className="text-xs text-[#666]">Completed Today</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border border-[#FFE8D6]">
          <div className="text-2xl font-bold text-green-600">{Math.floor(completedPomodoros * 25 / 60)}h</div>
          <div className="text-xs text-[#666]">Focus Time</div>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border border-[#FFE8D6]">
          <div className="text-2xl font-bold text-blue-600">{settings.longBreakInterval}</div>
          <div className="text-xs text-[#666]">Until Long Break</div>
        </div>
      </div>

      {/* Focus Mode Features */}
      {isFocusMode && (
        <div className="p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
          <div className="flex items-center justify-between text-red-700">
            <span className="text-sm font-medium">Focus Mode Active</span>
            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
              Distraction-Free
            </Badge>
          </div>
          <div className="mt-2 text-xs text-red-600">
            Notifications muted • Stay focused on your current task • Break timer will remind you to rest
          </div>
        </div>
      )}

      {/* Timer Settings */}
      <div className="mt-4 p-3 bg-[#FFE8D6] rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666]">Timer Settings</span>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-[#FF9F43]">
            <Settings size={14} className="mr-1" />
            Customize
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-[#666]">
          <div>Work: {settings.workDuration}m</div>
          <div>Short: {settings.shortBreakDuration}m</div>
          <div>Long: {settings.longBreakDuration}m</div>
        </div>
      </div>
    </div>
  )
}
