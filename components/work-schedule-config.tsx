"use client"

import { useState, useEffect } from "react"
import { Clock, Calendar, Coffee, Save, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"

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

const defaultSchedule: WorkSchedule = {
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

interface WorkScheduleConfigProps {
  onScheduleChange?: (schedule: WorkSchedule) => void
  initialSchedule?: WorkSchedule
}

export function WorkScheduleConfig({ 
  onScheduleChange, 
  initialSchedule = defaultSchedule 
}: WorkScheduleConfigProps) {
  const [schedule, setSchedule] = useState<WorkSchedule>(initialSchedule)
  const [isEditing, setIsEditing] = useState(false)
  const [tempSchedule, setTempSchedule] = useState<WorkSchedule>(initialSchedule)

  useEffect(() => {
    // Load schedule from localStorage
    const saved = localStorage.getItem('workSchedule')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSchedule(parsed)
        setTempSchedule(parsed)
      } catch (error) {
        console.error('Error loading saved schedule:', error)
      }
    }
  }, [])

  const saveSchedule = () => {
    setSchedule(tempSchedule)
    setIsEditing(false)
    localStorage.setItem('workSchedule', JSON.stringify(tempSchedule))
    onScheduleChange?.(tempSchedule)
  }

  const cancelEdit = () => {
    setTempSchedule(schedule)
    setIsEditing(false)
  }

  const addWorkHour = () => {
    setTempSchedule(prev => ({
      ...prev,
      workHours: [...prev.workHours, { start: "09:00", end: "17:00", label: "New Work Period" }]
    }))
  }

  const removeWorkHour = (index: number) => {
    setTempSchedule(prev => ({
      ...prev,
      workHours: prev.workHours.filter((_, i) => i !== index)
    }))
  }

  const addBreak = () => {
    setTempSchedule(prev => ({
      ...prev,
      breaks: [...prev.breaks, { start: "10:00", end: "10:15", label: "New Break" }]
    }))
  }

  const removeBreak = (index: number) => {
    setTempSchedule(prev => ({
      ...prev,
      breaks: prev.breaks.filter((_, i) => i !== index)
    }))
  }

  const updateWorkHour = (index: number, field: keyof TimeSlot, value: string) => {
    setTempSchedule(prev => ({
      ...prev,
      workHours: prev.workHours.map((hour, i) => 
        i === index ? { ...hour, [field]: value } : hour
      )
    }))
  }

  const updateBreak = (index: number, field: keyof TimeSlot, value: string) => {
    setTempSchedule(prev => ({
      ...prev,
      breaks: prev.breaks.map((break_, i) => 
        i === index ? { ...break_, [field]: value } : break_
      )
    }))
  }

  const toggleSchedule = () => {
    setTempSchedule(prev => ({ ...prev, isEnabled: !prev.isEnabled }))
  }

  return (
    <div className="p-4 bg-white border border-[#FFE8D6] rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#333] flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          Work Schedule Configuration
        </h3>
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={tempSchedule.isEnabled}
              onChange={toggleSchedule}
              className="rounded border-gray-300"
            />
            <span>Enable Schedule</span>
          </label>
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={saveSchedule}
                className="text-green-600 hover:text-green-700"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelEdit}
                className="text-gray-600 hover:text-gray-700"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {!tempSchedule.isEnabled && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700 mb-4">
          ⚠️ Schedule is disabled. Notifications will be sent at any time.
        </div>
      )}

      <div className="space-y-4">
        {/* Work Hours */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-[#333] flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Work Hours
            </h4>
            {isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={addWorkHour}
                className="text-blue-600 hover:text-blue-700 text-xs"
              >
                + Add
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            {tempSchedule.workHours.map((hour, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <input
                  type="time"
                  value={hour.start}
                  onChange={(e) => updateWorkHour(index, 'start', e.target.value)}
                  disabled={!isEditing}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  value={hour.end}
                  onChange={(e) => updateWorkHour(index, 'end', e.target.value)}
                  disabled={!isEditing}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <input
                  type="text"
                  value={hour.label}
                  onChange={(e) => updateWorkHour(index, 'label', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Label"
                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                />
                {isEditing && tempSchedule.workHours.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeWorkHour(index)}
                    className="text-red-600 hover:text-red-700 text-xs"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Break Times */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-[#333] flex items-center">
              <Coffee className="h-4 w-4 mr-2" />
              Break Times
            </h4>
            {isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={addBreak}
                className="text-blue-600 hover:text-blue-700 text-xs"
              >
                + Add
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            {tempSchedule.breaks.map((break_, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                <input
                  type="time"
                  value={break_.start}
                  onChange={(e) => updateBreak(index, 'start', e.target.value)}
                  disabled={!isEditing}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  value={break_.end}
                  onChange={(e) => updateBreak(index, 'end', e.target.value)}
                  disabled={!isEditing}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <input
                  type="text"
                  value={break_.label}
                  onChange={(e) => updateBreak(index, 'label', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Label"
                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                />
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBreak(index)}
                    className="text-red-600 hover:text-red-700 text-xs"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Status */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
          <div className="text-sm text-blue-700">
            <strong>Current Status:</strong> {schedule.isEnabled ? 'Schedule Active' : 'Schedule Disabled'}
          </div>
          <div className="text-xs text-blue-600 mt-1">
            Notifications will be sent during breaks and outside work hours.
          </div>
        </div>
      </div>
    </div>
  )
}
