"use client"

import { useState } from "react"
import { Heart, Phone, Sun, Coffee, Users, BookOpen, Music, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type Reminder = {
  id: number
  text: string
  category: string
  priority: "low" | "medium" | "high"
  completed: boolean
  createdAt: Date
}

const defaultReminders: Reminder[] = [
  {
    id: 1,
    text: "Text her before she texts you 😉",
    category: "relationships",
    priority: "medium",
    completed: false,
    createdAt: new Date()
  },
  {
    id: 2,
    text: "Call Mum — it's been 3 days",
    category: "family",
    priority: "high",
    completed: false,
    createdAt: new Date()
  },
  {
    id: 3,
    text: "Go outside. You're not a vampire",
    category: "health",
    priority: "medium",
    completed: false,
    createdAt: new Date()
  },
  {
    id: 4,
    text: "Drink water, not just coffee",
    category: "health",
    priority: "low",
    completed: false,
    createdAt: new Date()
  },
  {
    id: 5,
    text: "Listen to that new album you saved",
    category: "leisure",
    priority: "low",
    completed: false,
    createdAt: new Date()
  }
]

export function LifeReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(defaultReminders)
  const [newReminder, setNewReminder] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("general")

  const categories = [
    { id: "relationships", name: "Relationships", icon: Heart, color: "text-pink-600 bg-pink-50 border-pink-200" },
    { id: "family", name: "Family", icon: Users, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { id: "health", name: "Health", icon: Sun, color: "text-green-600 bg-green-50 border-green-200" },
    { id: "leisure", name: "Leisure", icon: Music, color: "text-purple-600 bg-purple-50 border-purple-200" },
    { id: "general", name: "General", icon: BookOpen, color: "text-gray-600 bg-gray-50 border-gray-200" }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200"
      case "medium": return "text-orange-600 bg-orange-50 border-orange-200"
      case "low": return "text-green-600 bg-green-50 border-green-200"
      default: return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const addReminder = () => {
    if (newReminder.trim()) {
      const reminder: Reminder = {
        id: Date.now(),
        text: newReminder.trim(),
        category: selectedCategory,
        priority: "medium",
        completed: false,
        createdAt: new Date()
      }
      setReminders([reminder, ...reminders])
      setNewReminder("")
    }
  }

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ))
  }

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id))
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.icon : BookOpen
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.color : "text-gray-600 bg-gray-50 border-gray-200"
  }

  const completedCount = reminders.filter(r => r.completed).length
  const totalCount = reminders.length

  return (
    <div className="bg-gradient-to-br from-[#FFF8F3] to-[#FFE8D6] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#FFE8D6]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Heart size={20} className="text-pink-500" />
          <h2 className="font-semibold text-lg text-[#333]">LIFE REMINDERS</h2>
        </div>
        <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200 text-xs">
          {completedCount}/{totalCount} Done
        </Badge>
      </div>

      {/* Add New Reminder */}
      <div className="mb-4 p-3 bg-white rounded-lg border border-[#FFE8D6]">
        <div className="flex space-x-2 mb-2">
          <Input
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            placeholder="Add a life reminder..."
            className="flex-1 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && addReminder()}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-sm border border-[#FFE8D6] rounded-md bg-white text-[#333]"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <Button
          onClick={addReminder}
          disabled={!newReminder.trim()}
          size="sm"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white text-xs"
        >
          Add Reminder
        </Button>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.map((reminder) => {
          const IconComponent = getCategoryIcon(reminder.category)
          return (
            <div
              key={reminder.id}
              className={`p-3 bg-white rounded-lg border transition-all duration-200 hover:shadow-md ${
                reminder.completed 
                  ? 'border-green-200 bg-green-50 opacity-75' 
                  : 'border-[#FFE8D6] hover:border-pink-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                      reminder.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 hover:border-pink-400'
                    }`}
                  >
                    {reminder.completed && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className={`text-sm ${reminder.completed ? 'line-through text-gray-500' : 'text-[#333]'}`}>
                      {reminder.text}
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(reminder.category)}`}>
                        <IconComponent size={12} className="mr-1" />
                        {categories.find(c => c.id === reminder.category)?.name}
                      </span>
                      
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(reminder.priority)}`}>
                        {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="ml-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  ×
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Add Suggestions */}
      <div className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
        <div className="text-xs text-pink-700 mb-2 font-medium">Quick Add:</div>
        <div className="flex flex-wrap gap-2">
          {[
            "Take a walk",
            "Call a friend",
            "Read 10 pages",
            "Practice gratitude"
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                setNewReminder(suggestion)
                setSelectedCategory("general")
              }}
              className="text-xs px-2 py-1 bg-white rounded border border-pink-200 text-pink-700 hover:bg-pink-50 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
