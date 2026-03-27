'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function WelcomeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-6 relative overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4cc9f0]/10 via-transparent to-[#a29bfe]/5 pointer-events-none" />
      
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar with gradient ring */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#4cc9f0] to-[#a29bfe] blur-md opacity-50" />
            <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-[#4cc9f0] to-[#a29bfe] flex items-center justify-center text-white font-display font-bold text-lg shadow-lg">
              PF
            </div>
          </motion.div>
          
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="font-display text-2xl font-bold text-white mb-1 tracking-tight"
            >
              Ready to Build Something Amazing?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-white/60 text-base"
            >
              Your daily grind fuels your dreams. Let&apos;s make today count.
            </motion.p>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="hidden md:block text-right flex-shrink-0"
        >
          <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Today&apos;s Focus</span>
          </div>
          <div className="font-display font-semibold text-lg bg-gradient-to-r from-[#4cc9f0] to-[#a29bfe] bg-clip-text text-transparent">
            Code - Build - Scale
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
