"use client"

import { useState } from "react"
import { Trophy, Plus, Star, Target, Zap, Heart, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type MicroWin = {
  id: number
  title: string
  description: string
  category: string
  impact: "low" | "medium" | "high"
  completedAt: Date
  tags: string[]
}

const defaultWins: MicroWin[] = [
  {
    id: 1,
    title: "Did 20 push-ups between code sessions",
    description: "Stayed active and energized during long coding hours",
    category: "fitness",
    impact: "medium",
    completedAt: new Date(),
    tags: ["fitness", "discipline", "energy"]
  },
  {
    id: 2,
    title: "Didn't touch social media till lunch",
    description: "Maintained focus and productivity in the morning",
    category: "discipline",
    impact: "high",
    completedAt: new Date(),
    tags: ["focus", "productivity", "self-control"]
  },
  {
    id: 3,
    title: "Drank 8 glasses of water today",
    description: "Stayed hydrated throughout the day",
    category: "health",
    impact: "medium",
    completedAt: new Date(),
    tags: ["health", "hydration", "wellness"]
  },
  {
    id: 4,
    title: "Called Mum and had a great chat",
    description: "Maintained important relationships",
    category: "relationships",
    impact: "high",
    completedAt: new Date(),
    tags: ["family", "connection", "balance"]
  }
]

const categories = [
  { id: "fitness", name: "Fitness", icon: Target, color: "text-green-600 bg-green-50 border-green-200" },
  { id: "discipline", name: "Discipline", icon: Zap, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { id: "health", name: "Health", icon: Heart, color: "text-pink-600 bg-pink-50 border-pink-200" },
  { id: "relationships", name: "Relationships", icon: Heart, color: "text-purple-600 bg-purple-50 border-purple-200" },
  { id: "learning", name: "Learning", icon: Brain, color: "text-orange-600 bg-orange-50 border-orange-200" },
  { id: "creativity", name: "Creativity", icon: Star, color: "text-yellow-600 bg-yellow-50 border-yellow-200" }
]

export function MicroWins() {
  const [wins, setWins] = useState<MicroWin[]>(defaultWins)
  const [newWin, setNewWin] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("discipline")
  const [selectedImpact, setSelectedImpact] = useState<"low" | "medium" | "high">("medium")
  const [showAddForm, setShowAddForm] = useState(false)

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-600 bg-red-50 border-red-200"
      case "medium": return "text-orange-600 bg-orange-50 border-orange-200"
      case "low": return "text-green-600 bg-green-50 border-green-200"
      default: return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high": return "🔥"
      case "medium": return "⚡"
      case "low": return "💡"
      default: return "✨"
    }
  }

  const addWin = () => {
    if (newWin.trim() && newDescription.trim()) {
      const win: MicroWin = {
        id: Date.now(),
        title: newWin.trim(),
        description: newDescription.trim(),
        category: selectedCategory,
        impact: selectedImpact,
        completedAt: new Date(),
        tags: [selectedCategory, selectedImpact]
      }
      setWins([win, ...wins])
      setNewWin("")
      setNewDescription("")
      setShowAddForm(false)
    }
  }

  const deleteWin = (id: number) => {
    setWins(wins.filter(w => w.id !== id))
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.icon : Target
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.color : "text-gray-600 bg-gray-50 border-gray-200"
  }

  const totalWins = wins.length
  const highImpactWins = wins.filter(w => w.impact === "high").length
  const todayWins = wins.filter(w => {
    const today = new Date()
    const winDate = new Date(w.completedAt)
    return winDate.toDateString() === today.toDateString()
  }).length

  return (
    <div className="bg-gradient-to-br from-[#FFF8F3] to-[#FFE8D6] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#FFE8D6]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy size={20} className="text-yellow-500" />
          <h2 className="font-semibold text-lg text-[#333]">MICRO-WINS TRACKER</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs text-[#666] hover:text-[#333] hover:bg-[#FFE8D6]"
        >
          <Plus size={14} className="mr-1" />
          Add Win
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-2 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="text-lg font-bold text-[#333]">{totalWins}</div>
          <div className="text-xs text-[#666]">Total Wins</div>
        </div>
        <div className="p-2 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="text-lg font-bold text-[#333]">{todayWins}</div>
          <div className="text-xs text-[#666]">Today</div>
        </div>
        <div className="p-2 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="text-lg font-bold text-[#333]">{highImpactWins}</div>
          <div className="text-xs text-[#666]">High Impact</div>
        </div>
      </div>

      {/* Add New Win Form */}
      {showAddForm && (
        <div className="mb-4 p-3 bg-white rounded-lg border border-[#FFE8D6]">
          <div className="space-y-3">
            <Input
              value={newWin}
              onChange={(e) => setNewWin(e.target.value)}
              placeholder="What's your micro-win?"
              className="text-sm"
            />
            <Input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Describe why this matters..."
              className="text-sm"
            />
            <div className="flex space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-[#FFE8D6] rounded-md bg-white text-[#333]"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedImpact}
                onChange={(e) => setSelectedImpact(e.target.value as "low" | "medium" | "high")}
                className="flex-1 px-3 py-2 text-sm border border-[#FFE8D6] rounded-md bg-white text-[#333]"
              >
                <option value="low">Low Impact</option>
                <option value="medium">Medium Impact</option>
                <option value="high">High Impact</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={addWin}
                disabled={!newWin.trim() || !newDescription.trim()}
                size="sm"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs"
              >
                Add Win
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                size="sm"
                className="flex-1 border-[#FFE8D6] text-[#666] hover:bg-[#FFE8D6] text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Wins List */}
      <div className="space-y-3">
        {wins.map((win) => {
          const IconComponent = getCategoryIcon(win.category)
          return (
            <div
              key={win.id}
              className="p-3 bg-white rounded-lg border border-[#FFE8D6] hover:border-yellow-200 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getImpactIcon(win.impact)}</span>
                    <h4 className="text-sm font-medium text-[#333]">{win.title}</h4>
                  </div>
                  
                  <div className="text-xs text-[#666] mb-3">
                    {win.description}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(win.category)}`}>
                      <IconComponent size={12} className="mr-1" />
                      {categories.find(c => c.id === win.category)?.name}
                    </span>
                    
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(win.impact)}`}>
                      {win.impact.charAt(0).toUpperCase() + win.impact.slice(1)} Impact
                    </span>
                  </div>
                  
                  <div className="text-xs text-[#666] mt-2">
                    {win.completedAt.toLocaleDateString()} at {win.completedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                <button
                  onClick={() => deleteWin(win.id)}
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
      <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
        <div className="text-xs text-yellow-700 mb-2 font-medium">Quick Win Ideas:</div>
        <div className="flex flex-wrap gap-2">
          {[
            "Did 10 squats",
            "Read 5 pages",
            "Called a friend",
            "Meditated 5 min",
            "Drank water",
            "Went outside"
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                setNewWin(suggestion)
                setNewDescription(`Quick win: ${suggestion.toLowerCase()}`)
                setSelectedCategory("discipline")
                setSelectedImpact("low")
                setShowAddForm(true)
              }}
              className="text-xs px-2 py-1 bg-white rounded border border-yellow-200 text-yellow-700 hover:bg-yellow-50 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
