"use client"

import { HomePage } from "@/components/pages/home-page"
import { TasksPage } from "@/components/pages/tasks-page"
import { ProductivityPage } from "@/components/pages/productivity-page"
import { AnalyticsPage } from "@/components/pages/analytics-page"
import { LifePage } from "@/components/pages/life-page"
import { DataPage } from "@/components/pages/data-page"

interface PageRouterProps {
  currentPage: string
}

export function PageRouter({ currentPage }: PageRouterProps) {
  switch (currentPage) {
    case 'home':
      return <HomePage />
    case 'tasks':
      return <TasksPage />
    case 'productivity':
      return <ProductivityPage />
    case 'analytics':
      return <AnalyticsPage />
    case 'life':
      return <LifePage />
    case 'data':
      return <DataPage />
    default:
      return <HomePage />
  }
}
