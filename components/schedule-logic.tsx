"use client"

interface TimeSlot {
  start: string
  end: string
  label: string
}

interface WorkSchedule {
  workHours: TimeSlot[]
  breaks: TimeSlot[]
  isEnabled: boolean
}

export class ScheduleLogic {
  private schedule: WorkSchedule

  constructor(schedule: WorkSchedule) {
    this.schedule = schedule
  }

  /**
   * Check if notifications are currently allowed based on schedule
   */
  canSendNotification(): boolean {
    if (!this.schedule.isEnabled) {
      return true // If schedule is disabled, allow notifications anytime
    }

    const now = new Date()
    const currentTime = this.formatTime(now)
    const currentDay = now.getDay()

    // Don't send notifications on weekends (0 = Sunday, 6 = Saturday)
    if (currentDay === 0 || currentDay === 6) {
      return true
    }

    // Check if we're in a break time
    if (this.isInBreakTime(currentTime)) {
      return true
    }

    // Check if we're in work hours
    if (this.isInWorkHours(currentTime)) {
      return false // Don't send during work hours (unless it's break time)
    }

    // Outside work hours - allow notifications
    return true
  }

  /**
   * Check if current time is within work hours
   */
  private isInWorkHours(currentTime: string): boolean {
    return this.schedule.workHours.some(hour => 
      this.isTimeBetween(currentTime, hour.start, hour.end)
    )
  }

  /**
   * Check if current time is within break time
   */
  private isInBreakTime(currentTime: string): boolean {
    return this.schedule.breaks.some(break_ => 
      this.isTimeBetween(currentTime, break_.start, break_.end)
    )
  }

  /**
   * Check if a time is between start and end times
   */
  private isTimeBetween(time: string, start: string, end: string): boolean {
    return time >= start && time <= end
  }

  /**
   * Format current time to HH:MM format
   */
  private formatTime(date: Date): string {
    return date.toTimeString().slice(0, 5)
  }

  /**
   * Get next break time
   */
  getNextBreak(): TimeSlot | null {
    const now = new Date()
    const currentTime = this.formatTime(now)
    
    const upcomingBreaks = this.schedule.breaks
      .filter(break_ => break_.start > currentTime)
      .sort((a, b) => a.start.localeCompare(b.start))

    return upcomingBreaks[0] || null
  }

  /**
   * Get current status description
   */
  getCurrentStatus(): { status: string; description: string; color: string } {
    if (!this.schedule.isEnabled) {
      return {
        status: 'Schedule Disabled',
        description: 'Notifications allowed anytime',
        color: 'text-yellow-600'
      }
    }

    const now = new Date()
    const currentTime = this.formatTime(now)
    const currentDay = now.getDay()

    // Weekend
    if (currentDay === 0 || currentDay === 6) {
      return {
        status: 'Weekend',
        description: 'Notifications allowed',
        color: 'text-green-600'
      }
    }

    // Check if in break time
    if (this.isInBreakTime(currentTime)) {
      const currentBreak = this.schedule.breaks.find(break_ => 
        this.isTimeBetween(currentTime, break_.start, break_.end)
      )
      return {
        status: 'Break Time',
        description: currentBreak?.label || 'Take a break!',
        color: 'text-green-600'
      }
    }

    // Check if in work hours
    if (this.isInWorkHours(currentTime)) {
      const nextBreak = this.getNextBreak()
      if (nextBreak) {
        return {
          status: 'Work Hours',
          description: `Next break: ${nextBreak.start} (${nextBreak.label})`,
          color: 'text-red-600'
        }
      } else {
        return {
          status: 'Work Hours',
          description: 'No more breaks today',
          color: 'text-red-600'
        }
      }
    }

    // Outside work hours
    return {
      status: 'After Hours',
      description: 'Notifications allowed',
      color: 'text-green-600'
    }
  }

  /**
   * Get time until next notification opportunity
   */
  getTimeUntilNextOpportunity(): string | null {
    if (!this.schedule.isEnabled) {
      return null
    }

    const now = new Date()
    const currentTime = this.formatTime(now)
    const currentDay = now.getDay()

    // Weekend - no waiting needed
    if (currentDay === 0 || currentDay === 6) {
      return null
    }

    // If we can send now, no waiting needed
    if (this.canSendNotification()) {
      return null
    }

    // Find next break or end of work day
    const nextBreak = this.getNextBreak()
    if (nextBreak) {
      return this.calculateTimeDifference(currentTime, nextBreak.start)
    }

    // Find next work period end
    const nextWorkEnd = this.schedule.workHours
      .filter(hour => hour.end > currentTime)
      .sort((a, b) => a.end.localeCompare(b.end))[0]

    if (nextWorkEnd) {
      return this.calculateTimeDifference(currentTime, nextWorkEnd.end)
    }

    return null
  }

  /**
   * Calculate time difference between two times
   */
  private calculateTimeDifference(from: string, to: string): string {
    const [fromHour, fromMinute] = from.split(':').map(Number)
    const [toHour, toMinute] = to.split(':').map(Number)
    
    let diffMinutes = (toHour * 60 + toMinute) - (fromHour * 60 + fromMinute)
    
    if (diffMinutes < 0) {
      diffMinutes += 24 * 60 // Add 24 hours if negative
    }
    
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else {
      return `${minutes}m`
    }
  }

  /**
   * Update schedule
   */
  updateSchedule(newSchedule: WorkSchedule): void {
    this.schedule = newSchedule
  }

  /**
   * Get current schedule
   */
  getSchedule(): WorkSchedule {
    return this.schedule
  }
}

// Export utility functions for use in other components
export const scheduleUtils = {
  /**
   * Load schedule from localStorage
   */
  loadSchedule(): WorkSchedule | null {
    try {
      const saved = localStorage.getItem('workSchedule')
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.error('Error loading schedule:', error)
      return null
    }
  },

  /**
   * Save schedule to localStorage
   */
  saveSchedule(schedule: WorkSchedule): void {
    try {
      localStorage.setItem('workSchedule', JSON.stringify(schedule))
    } catch (error) {
      console.error('Error saving schedule:', error)
    }
  },

  /**
   * Get default schedule
   */
  getDefaultSchedule(): WorkSchedule {
    return {
      workHours: [
        { start: "09:00", end: "12:00", label: "Morning Work" },
        { start: "13:00", end: "17:00", label: "Afternoon Work" }
      ],
      breaks: [
        { start: "10:30", end: "10:45", label: "Morning Break" },
        { start: "15:00", end: "15:15", label: "Afternoon Break" },
        { start: "12:00", end: "13:00", label: "Lunch Break" }
      ],
      isEnabled: true
    }
  }
}
