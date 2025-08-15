"use client"

import { useState } from "react"
import { BookOpen, Code, Palette, Target, Trophy, ExternalLink, Play, CheckCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type Skill = {
  id: number
  name: string
  level: number
  maxLevel: number
  category: "Python" | "Full-Stack" | "Design" | "Business"
  description: string
  projects: number
  lastPracticed: string
}

type Project = {
  id: number
  name: string
  description: string
  techStack: string[]
  status: "Completed" | "In Progress" | "Planned"
  progress: number
  githubUrl?: string
  liveUrl?: string
  category: string
}

type LearningResource = {
  id: number
  title: string
  type: "Course" | "Tutorial" | "Documentation" | "Challenge"
  url: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: string
  completed: boolean
}

export function LearningProgress() {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      name: "Python Fundamentals",
      level: 7,
      maxLevel: 10,
      category: "Python",
      description: "Core Python syntax, data structures, and OOP",
      projects: 3,
      lastPracticed: "2 days ago"
    },
    {
      id: 2,
      name: "Python Data Science",
      level: 4,
      maxLevel: 10,
      category: "Python",
      description: "Pandas, NumPy, Matplotlib, and data analysis",
      projects: 1,
      lastPracticed: "1 week ago"
    },
    {
      id: 3,
      name: "React & Next.js",
      level: 8,
      maxLevel: 10,
      category: "Full-Stack",
      description: "Modern React with hooks, Next.js framework",
      projects: 5,
      lastPracticed: "Today"
    },
    {
      id: 4,
      name: "Node.js & Backend",
      level: 6,
      maxLevel: 10,
      category: "Full-Stack",
      description: "Server-side JavaScript, APIs, databases",
      projects: 3,
      lastPracticed: "3 days ago"
    },
    {
      id: 5,
      name: "UI/UX Design",
      level: 5,
      maxLevel: 10,
      category: "Design",
      description: "Figma, design principles, user experience",
      projects: 2,
      lastPracticed: "4 days ago"
    },
    {
      id: 6,
      name: "Business Strategy",
      level: 6,
      maxLevel: 10,
      category: "Business",
      description: "Brand development, marketing, growth",
      projects: 4,
      lastPracticed: "Yesterday"
    }
  ])

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "WiFi Billing System",
      description: "Full-stack application for cybercafé management",
      techStack: ["React", "Node.js", "MongoDB", "Express"],
      status: "In Progress",
      progress: 75,
      githubUrl: "https://github.com/username/wifi-billing",
      category: "Full-Stack"
    },
    {
      id: 2,
      name: "Portfolio Website",
      description: "Personal portfolio showcasing projects and skills",
      techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
      status: "Completed",
      progress: 100,
      githubUrl: "https://github.com/username/portfolio",
      liveUrl: "https://portfolio.com",
      category: "Full-Stack"
    },
    {
      id: 3,
      name: "Python Data Analyzer",
      description: "Tool for analyzing trading data and patterns",
      techStack: ["Python", "Pandas", "NumPy", "Matplotlib"],
      status: "In Progress",
      progress: 60,
      githubUrl: "https://github.com/username/trading-analyzer",
      category: "Python"
    },
    {
      id: 4,
      name: "Dem Man Brand Website",
      description: "Fitness brand landing page and e-commerce",
      techStack: ["React", "Stripe", "Tailwind CSS"],
      status: "Planned",
      progress: 0,
      category: "Business"
    }
  ])

  const [resources, setResources] = useState<LearningResource[]>([
    {
      id: 1,
      title: "Python for Data Science",
      type: "Course",
      url: "https://coursera.org/python-data-science",
      difficulty: "Intermediate",
      estimatedTime: "20 hours",
      completed: false
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      type: "Tutorial",
      url: "https://reactpatterns.com",
      difficulty: "Advanced",
      estimatedTime: "8 hours",
      completed: false
    },
    {
      id: 3,
      title: "Figma Design Fundamentals",
      type: "Course",
      url: "https://figma.com/learn",
      difficulty: "Beginner",
      estimatedTime: "12 hours",
      completed: true
    },
    {
      id: 4,
      title: "Node.js Best Practices",
      type: "Documentation",
      url: "https://nodejs.org/docs",
      difficulty: "Intermediate",
      estimatedTime: "6 hours",
      completed: false
    }
  ])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Python": return "bg-green-100 text-green-700 border-green-200"
      case "Full-Stack": return "bg-blue-100 text-blue-700 border-blue-200"
      case "Design": return "bg-pink-100 text-pink-700 border-pink-200"
      case "Business": return "bg-orange-100 text-orange-700 border-orange-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700 border-green-200"
      case "In Progress": return "bg-blue-100 text-blue-700 border-blue-200"
      case "Planned": return "bg-gray-100 text-gray-700 border-gray-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700 border-green-200"
      case "Intermediate": return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Advanced": return "bg-red-100 text-red-700 border-red-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const totalSkills = skills.length
  const completedSkills = skills.filter(skill => skill.level === skill.maxLevel).length
  const averageLevel = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / totalSkills)

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">LEARNING PROGRESS</h2>
        <Button variant="ghost" size="sm" className="text-xs text-[#666] hover:text-[#333]">
          <BookOpen size={16} className="mr-1" />
          View All
        </Button>
      </div>

      {/* Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="flex items-center justify-center mb-2">
            <Code size={20} className="text-blue-600 mr-2" />
            <span className="text-xs text-[#666]">Total Skills</span>
          </div>
          <div className="text-2xl font-bold text-[#333]">{totalSkills}</div>
          <div className="text-xs text-[#666] mt-1">Active Learning</div>
        </div>
        
        <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="flex items-center justify-center mb-2">
            <Trophy size={20} className="text-green-600 mr-2" />
            <span className="text-xs text-[#666]">Completed</span>
          </div>
          <div className="text-2xl font-bold text-[#333]">{completedSkills}</div>
          <div className="text-xs text-[#666] mt-1">Mastered Skills</div>
        </div>
        
        <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="flex items-center justify-center mb-2">
            <Target size={20} className="text-orange-600 mr-2" />
            <span className="text-xs text-[#666]">Avg Level</span>
          </div>
          <div className="text-2xl font-bold text-[#333]">{averageLevel}/10</div>
          <div className="text-xs text-[#666] mt-1">Skill Proficiency</div>
        </div>
      </div>

      {/* Skill Trees */}
      <div className="mb-6">
        <h3 className="font-medium text-[#333] mb-3">Skill Development</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="p-3 bg-white rounded-lg border border-[#FFE8D6] hover:border-[#FF9F43] transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-medium text-[#333]">{skill.name}</h3>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getCategoryColor(skill.category)}`}
                  >
                    {skill.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#FF9F43]">{skill.level}/{skill.maxLevel}</div>
                  <div className="text-xs text-[#666]">{skill.projects} projects</div>
                </div>
              </div>
              
              <p className="text-xs text-[#666] mb-3">{skill.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#666]">
                  <span>Progress</span>
                  <span>{Math.round((skill.level / skill.maxLevel) * 100)}%</span>
                </div>
                <Progress value={(skill.level / skill.maxLevel) * 100} className="h-2 bg-[#FFE8D6]" />
                <div className="text-xs text-[#666] flex items-center">
                  <Clock size={12} className="mr-1" />
                  Last practiced: {skill.lastPracticed}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Portfolio */}
      <div className="mb-6">
        <h3 className="font-medium text-[#333] mb-3">Project Portfolio</h3>
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="p-3 bg-white rounded-lg border border-[#FFE8D6] hover:border-[#FF9F43] transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#333]">{project.name}</h3>
                  <p className="text-xs text-[#666] mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.techStack.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-gray-100 text-gray-700 border-gray-200">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <Badge
                    variant="outline"
                    className={`text-xs ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </Badge>
                  <div className="text-sm font-bold text-[#FF9F43] mt-1">{project.progress}%</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#666]">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2 bg-[#FFE8D6]" />
                
                <div className="flex items-center space-x-2">
                  {project.githubUrl && (
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-[#666] hover:text-[#333]">
                      <Code size={12} className="mr-1" />
                      Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-[#666] hover:text-[#333]">
                      <ExternalLink size={12} className="mr-1" />
                      Live
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Resources */}
      <div className="mb-4">
        <h3 className="font-medium text-[#333] mb-3">Learning Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {resources.map((resource) => (
            <div key={resource.id} className={`p-3 rounded-lg border transition-colors ${
              resource.completed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white border-[#FFE8D6] hover:border-[#FF9F43]'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className={`text-sm font-medium ${
                    resource.completed ? 'text-green-700' : 'text-gray-800'
                  }`}>
                    {resource.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getDifficultyColor(resource.difficulty)}`}
                    >
                      {resource.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-gray-100 text-gray-700 border-gray-200">
                      {resource.type}
                    </Badge>
                  </div>
                </div>
                <div className="text-right ml-2">
                  <div className="text-xs text-[#666]">{resource.estimatedTime}</div>
                  {resource.completed && (
                    <CheckCircle size={16} className="text-green-600 mt-1" />
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#666]">{resource.type}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-6 px-2 text-xs ${
                    resource.completed 
                      ? 'text-green-600 hover:bg-green-50' 
                      : 'text-[#FF9F43] hover:bg-[#FFE8D6]'
                  }`}
                >
                  {resource.completed ? 'Completed' : 'Start Learning'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666]">Learning Goals</span>
          <span className="font-bold text-[#FF9F43]">Master • Build • Scale</span>
        </div>
        <div className="mt-2 text-xs text-[#666]">
          Complete Python data science course • Build 3 full-stack projects • Master UI/UX design principles
        </div>
      </div>
    </div>
  )
}
