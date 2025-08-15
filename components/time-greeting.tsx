"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Coffee, Zap, Target, Crown } from "lucide-react"

type TimePeriod = "morning" | "afternoon" | "evening" | "night"

const greetings = {
  morning: {
    icon: Sun,
    color: "text-orange-500",
    bgColor: "bg-gradient-to-r from-orange-50 to-yellow-50",
    borderColor: "border-orange-200",
    message: "4 AM club. Let's go, Dem Man 🚀",
    subtitle: "Early bird gets the worm. You're already ahead.",
    motivation: "Today's the day you've been waiting for."
  },
  afternoon: {
    icon: Coffee,
    color: "text-blue-500",
    bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    message: "Halfway there. Don't slow down now.",
    subtitle: "Keep the momentum going strong.",
    motivation: "Your future self is watching this moment."
  },
  evening: {
    icon: Target,
    color: "text-purple-500",
    bgColor: "bg-gradient-to-r from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    message: "One last push, then rest like a king.",
    subtitle: "Finish strong. You've earned it.",
    motivation: "Tomorrow's success starts with today's finish."
  },
  night: {
    icon: Moon,
    color: "text-indigo-500",
    bgColor: "bg-gradient-to-r from-indigo-50 to-blue-50",
    borderColor: "border-indigo-200",
    message: "Time to recharge. Tomorrow's another battle.",
    subtitle: "Rest well, dream big, wake up stronger.",
    motivation: "Your discipline today builds your freedom tomorrow."
  }
}

export function TimeGreeting() {
  const [currentPeriod, setCurrentPeriod] = useState<TimePeriod>("morning")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hour = now.getHours()
      
      let period: TimePeriod
      if (hour >= 4 && hour < 12) {
        period = "morning"
      } else if (hour >= 12 && hour < 17) {
        period = "afternoon"
      } else if (hour >= 17 && hour < 22) {
        period = "evening"
      } else {
        period = "night"
      }
      
      setCurrentPeriod(period)
      setCurrentTime(now)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const greeting = greetings[currentPeriod]
  const IconComponent = greeting.icon

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getProgressPercentage = () => {
    const hour = currentTime.getHours()
    const minute = currentTime.getMinutes()
    
    if (currentPeriod === "morning") {
      // 4 AM to 12 PM = 8 hours
      const totalMinutes = 8 * 60
      const elapsedMinutes = (hour - 4) * 60 + minute
      return Math.min(Math.max((elapsedMinutes / totalMinutes) * 100, 0), 100)
    } else if (currentPeriod === "afternoon") {
      // 12 PM to 5 PM = 5 hours
      const totalMinutes = 5 * 60
      const elapsedMinutes = (hour - 12) * 60 + minute
      return Math.min(Math.max((elapsedMinutes / totalMinutes) * 100, 0), 100)
    } else if (currentPeriod === "evening") {
      // 5 PM to 10 PM = 5 hours
      const totalMinutes = 5 * 60
      const elapsedMinutes = (hour - 17) * 60 + minute
      return Math.min(Math.max((elapsedMinutes / totalMinutes) * 100, 0), 100)
    } else {
      // 10 PM to 4 AM = 6 hours
      const totalMinutes = 6 * 60
      const elapsedMinutes = (hour >= 22 ? (hour - 22) : (hour + 2)) * 60 + minute
      return Math.min(Math.max((elapsedMinutes / totalMinutes) * 100, 0), 100)
    }
  }

  return (
    <div className={`${greeting.bgColor} rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border ${greeting.borderColor}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <IconComponent size={24} className={greeting.color} />
          <h2 className="font-semibold text-lg text-[#333]">TIME GREETING</h2>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#333]">{formatTime(currentTime)}</div>
          <div className="text-xs text-[#666] capitalize">{currentPeriod}</div>
        </div>
      </div>

      <div className="text-center py-3">
        <div className="text-xl font-bold text-[#333] mb-2">
          {greeting.message}
        </div>
        <div className="text-sm text-[#666] mb-3">
          {greeting.subtitle}
        </div>
        <div className="text-xs text-[#666] italic">
          {greeting.motivation}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-[#666] mb-1">
          <span>Progress</span>
          <span>{Math.round(getProgressPercentage())}%</span>
        </div>
        <div className="w-full bg-white rounded-full h-2 border border-[#FFE8D6]">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${greeting.color.replace('text-', 'bg-')}`}
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      {/* Time Period Stats */}
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="p-2 bg-white rounded-lg border border-[#FFE8D6]">
          <div className="text-xs text-[#666]">Period</div>
          <div className="text-sm font-semibold text-[#333] capitalize">{currentPeriod}</div>
        </div>
        <div className="p-2 bg-white rounded-lg border border-[#FFE8D6]">
          <div className="text-xs text-[#666]">Status</div>
          <div className="text-sm font-semibold text-[#333]">
            {currentPeriod === "morning" ? "Building" : 
             currentPeriod === "afternoon" ? "Maintaining" :
             currentPeriod === "evening" ? "Finishing" : "Resting"}
          </div>
        </div>
      </div>

      {/* Motivational Footer */}
      <div className="mt-3 p-2 bg-white rounded-lg border border-[#FFE8D6] text-center">
        <div className="flex items-center justify-center space-x-1 text-xs text-[#666]">
          <Crown size={12} className="text-yellow-500" />
          <span>
            {currentPeriod === "morning" ? "Today's your day to shine" :
             currentPeriod === "afternoon" ? "Keep pushing through" :
             currentPeriod === "evening" ? "Finish what you started" : "Rest well, warrior"}
          </span>
        </div>
      </div>
    </div>
  )
}
