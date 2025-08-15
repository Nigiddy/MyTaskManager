"use client"

import { useState } from 'react'
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800"></div>
        
        {/* Abstract floating shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-30 blur-lg animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-25 blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-20 blur-lg animate-float" style={{animationDelay: '0.5s'}}></div>
        
        {/* Subtle grid pattern - simplified */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30"></div>
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        <Header />
        
        <div className="flex">
          <Sidebar
            currentPage={currentPage}
            onPageChange={handlePageChange}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          
          <main className="flex-1 padding-responsive transition-all duration-300">
            <PageIndicator currentPage={currentPage} />
            <PageTransition currentPage={currentPage}>
              <PageRouter currentPage={currentPage} />
            </PageTransition>
          </main>
        </div>
      </div>
    </div>
  )
}
