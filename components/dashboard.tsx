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
        
        {/* Subtle static ambient glows - reduced animation for less visual noise */}
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-gradient-to-br from-[#4cc9f0] to-[#a29bfe] rounded-full blur-[120px] opacity-[0.06]" />
        <div className="absolute bottom-20 right-[15%] w-80 h-80 bg-gradient-to-br from-[#a29bfe] to-[#4cc9f0] rounded-full blur-[140px] opacity-[0.04]" />
        
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
          />

          <main className="flex-1 px-4 pb-24 lg:pb-8 lg:px-8 transition-all duration-300">
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
