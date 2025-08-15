"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { PageRouter } from "@/components/page-router"
import { PageIndicator } from "@/components/page-indicator"
import { PageTransition } from "@/components/page-transition"

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F3] via-[#FFF1E6] to-[#FFE8D6]">
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
        <main className="flex-1 padding-responsive transition-all duration-300">
          <PageIndicator currentPage={currentPage} />
          <PageTransition currentPage={currentPage}>
            <PageRouter currentPage={currentPage} />
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
