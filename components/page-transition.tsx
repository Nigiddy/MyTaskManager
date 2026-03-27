'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  currentPage: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.99,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -10,
    scale: 0.99,
  },
};

const pageTransition = {
  type: 'tween' as const,
  ease: [0.22, 1, 0.36, 1],
  duration: 0.4,
};

export function PageTransition({ children, currentPage }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
