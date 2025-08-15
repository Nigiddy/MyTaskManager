"use client"

import { useState, useEffect } from "react"

interface TouchEnhancerProps {
  children: React.ReactNode
  onTap?: () => void
  onLongPress?: () => void
  longPressDelay?: number
  className?: string
}

export function TouchEnhancer({ 
  children, 
  onTap, 
  onLongPress, 
  longPressDelay = 500,
  className = ""
}: TouchEnhancerProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)

  const handleTouchStart = () => {
    setIsPressed(true)
    
    if (onLongPress) {
      const timer = setTimeout(() => {
        onLongPress()
      }, longPressDelay)
      setLongPressTimer(timer)
    }
  }

  const handleTouchEnd = () => {
    setIsPressed(false)
    
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
    
    if (onTap) {
      onTap()
    }
  }

  const handleTouchCancel = () => {
    setIsPressed(false)
    
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
  }

  useEffect(() => {
    return () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer)
      }
    }
  }, [longPressTimer])

  return (
    <div
      className={`
        touch-manipulation select-none
        ${isPressed ? 'scale-95' : 'scale-100'}
        transition-transform duration-150
        ${className}
      `}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {children}
    </div>
  )
}
