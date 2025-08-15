'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, Eye, Target, Zap, Crown } from 'lucide-react';

const ambientMessages = [
  {
    text: 'Stay in the fight',
    icon: Target,
    color: 'text-blue-600',
    category: 'motivation',
  },
  {
    text: 'One more task',
    icon: Zap,
    color: 'text-orange-600',
    category: 'productivity',
  },
  {
    text: 'Your future self is watching',
    icon: Eye,
    color: 'text-purple-600',
    category: 'reflection',
  },
  {
    text: 'Every step counts',
    icon: Sparkles,
    color: 'text-green-600',
    category: 'progress',
  },
  {
    text: 'Build the empire',
    icon: Crown,
    color: 'text-yellow-600',
    category: 'ambition',
  },
  {
    text: 'Discipline = Freedom',
    icon: Target,
    color: 'text-red-600',
    category: 'wisdom',
  },
  {
    text: 'Code • Build • Scale',
    icon: Zap,
    color: 'text-indigo-600',
    category: 'focus',
  },
  {
    text: "Today's work, tomorrow's success",
    icon: Crown,
    color: 'text-pink-600',
    category: 'vision',
  },
  {
    text: 'Keep pushing forward',
    icon: Target,
    color: 'text-teal-600',
    category: 'persistence',
  },
  {
    text: "You've got this",
    icon: Sparkles,
    color: 'text-amber-600',
    category: 'encouragement',
  },
];

export function AmbientMessages() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % ambientMessages.length);
    }, 60000); // Change every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fade out and in effect
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, [currentMessageIndex]);

  const currentMessage = ambientMessages[currentMessageIndex];
  const IconComponent = currentMessage.icon;

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <div
        className={`
        bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-[#FFE8D6]
        transition-all duration-500 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
      >
        <div className="flex items-center space-x-2">
          <IconComponent size={16} className={currentMessage.color} />
          <span className="text-sm font-medium text-[#333] whitespace-nowrap">
            {currentMessage.text}
          </span>
        </div>

        {/* Subtle indicator */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF9F43] rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}

// Alternative: Inline ambient message for dashboard integration
export function InlineAmbientMessage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % ambientMessages.length);
    }, 60000); // Change every minute

    return () => clearInterval(interval);
  }, []);

  const currentMessage = ambientMessages[currentMessageIndex];
  const IconComponent = currentMessage.icon;

  return (
    <div className="bg-gradient-to-r from-[#FFF8F3] to-[#FFE8D6] rounded-xl p-3 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#FFE8D6]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageCircle size={18} className="text-[#FF9F43]" />
          <span className="text-xs text-[#666] font-medium">
            AMBIENT MESSAGE
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <IconComponent size={16} className={currentMessage.color} />
          <span className="text-sm font-medium text-[#333]">
            {currentMessage.text}
          </span>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-2 w-full bg-white rounded-full h-1 border border-[#FFE8D6]">
        <div
          className="h-1 bg-[#FF9F43] rounded-full transition-all duration-1000 ease-linear"
          style={{ width: '100%' }}
        ></div>
      </div>
    </div>
  );
}
