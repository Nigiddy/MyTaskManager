"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { PageRouter } from "@/components/page-router"
import { PageIndicator } from "@/components/page-indicator"

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onPageChange={handlePageChange}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 transition-all duration-300">
          <PageIndicator currentPage={currentPage} />
          <PageRouter currentPage={currentPage} />
        </main>
      </div>
    </div>
  )
}
