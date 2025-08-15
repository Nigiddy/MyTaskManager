"use client"

import { useState, useEffect } from "react"

interface LazyLoaderProps {
  children: React.ReactNode
  threshold?: number
  placeholder?: React.ReactNode
}

export function LazyLoader({ 
  children, 
  threshold = 0.1, 
  placeholder = (
    <div className="animate-pulse">
      <div className="h-32 bg-gray-200 rounded-lg"></div>
    </div>
  ) 
}: LazyLoaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setIsVisible(true)
          setHasIntersected(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    const element = document.getElementById('lazy-loader')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [threshold, hasIntersected])

  if (!isVisible) {
    return (
      <div id="lazy-loader">
        {placeholder}
      </div>
    )
  }

  return <>{children}</>
}
