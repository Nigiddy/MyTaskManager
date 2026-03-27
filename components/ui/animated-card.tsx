'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number;
  enableHover?: boolean;
  glowColor?: string;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, children, index = 0, enableHover = true, glowColor, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={
          enableHover
            ? {
                y: -4,
                transition: { duration: 0.2 },
              }
            : undefined
        }
        className={cn(
          'glass-card p-5 transition-all duration-300',
          enableHover && 'cursor-pointer',
          className
        )}
        style={{
          ['--glow-color' as string]: glowColor || 'rgba(76, 201, 240, 0.15)',
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
AnimatedCard.displayName = 'AnimatedCard';

const AnimatedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 mb-4', className)}
    {...props}
  />
));
AnimatedCardHeader.displayName = 'AnimatedCardHeader';

const AnimatedCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-display font-semibold text-lg text-white tracking-tight',
      className
    )}
    {...props}
  />
));
AnimatedCardTitle.displayName = 'AnimatedCardTitle';

const AnimatedCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-white/50', className)}
    {...props}
  />
));
AnimatedCardDescription.displayName = 'AnimatedCardDescription';

const AnimatedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));
AnimatedCardContent.displayName = 'AnimatedCardContent';

export {
  AnimatedCard,
  AnimatedCardHeader,
  AnimatedCardTitle,
  AnimatedCardDescription,
  AnimatedCardContent,
};
