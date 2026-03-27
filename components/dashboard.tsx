'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { PageRouter } from '@/components/page-router';
import { PageIndicator } from '@/components/page-indicator';
import { PageTransition } from '@/components/page-transition';

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-[#0f0f12]" />
        
        {/* Subtle mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(76,201,240,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(162,155,254,0.06)_0%,_transparent_50%)]" />
        
        {/* Floating orbs with refined animation */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-[10%] w-64 h-64 bg-gradient-to-br from-[#4cc9f0] to-[#a29bfe] rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-20 right-[15%] w-80 h-80 bg-gradient-to-br from-[#a29bfe] to-[#4cc9f0] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 10, 0],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-[#10b981] to-[#4cc9f0] rounded-full blur-[80px]"
        />
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <div className="flex flex-1">
          <Sidebar
            currentPage={currentPage}
            onPageChange={handlePageChange}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="flex-1 px-4 pb-8 lg:px-8 transition-all duration-300">
            <PageIndicator currentPage={currentPage} />
            <PageTransition currentPage={currentPage}>
              <PageRouter currentPage={currentPage} />
            </PageTransition>
          </main>
        </div>
      </div>
    </div>
  );
}
