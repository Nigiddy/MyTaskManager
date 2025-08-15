'use client';

import { useState, useEffect } from 'react';
import { Quote, RefreshCw, Heart, Zap, Brain, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quotes = [
  {
    text: 'Discipline equals freedom.',
    author: 'Jocko Willink',
    category: 'stoic',
    icon: Target,
  },
  {
    text: "You're not tired. You're just unmotivated. Move.",
    author: 'Unknown',
    category: 'motivational',
    icon: Zap,
  },
  {
    text: 'Make it happen. Then make it better.',
    author: 'Unknown',
    category: 'motivational',
    icon: Target,
  },
  {
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    category: 'wisdom',
    icon: Heart,
  },
  {
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    category: 'stoic',
    icon: Brain,
  },
  {
    text: 'Every morning we are born again. What we do today matters most.',
    author: 'Buddha',
    category: 'wisdom',
    icon: Target,
  },
  {
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    category: 'motivational',
    icon: Zap,
  },
  {
    text: "It's not about having time, it's about making time.",
    author: 'Unknown',
    category: 'wisdom',
    icon: Brain,
  },
  {
    text: 'Wake up with determination. Go to bed with satisfaction.',
    author: 'Unknown',
    category: 'motivational',
    icon: Target,
  },
  {
    text: 'The only person you are destined to become is the person you decide to be.',
    author: 'Ralph Waldo Emerson',
    category: 'stoic',
    icon: Brain,
  },
];

export function DailyQuote() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const refreshQuote = () => {
    setIsRefreshing(true);
    const newQuote = getRandomQuote();
    // Ensure we don't get the same quote twice in a row
    if (newQuote.text === currentQuote.text) {
      const filteredQuotes = quotes.filter(q => q.text !== currentQuote.text);
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      setCurrentQuote(filteredQuotes[randomIndex]);
    } else {
      setCurrentQuote(newQuote);
    }

    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Change quote every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentQuote(getRandomQuote());
      },
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'stoic':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'motivational':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'wisdom':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const IconComponent = currentQuote.icon;

  return (
    <div className="bg-gradient-to-br from-[#FFF8F3] to-[#FFE8D6] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#FFE8D6]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Quote size={20} className="text-[#FF9F43]" />
          <h2 className="font-semibold text-lg text-[#333]">
            QUOTE OF THE DAY
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshQuote}
          disabled={isRefreshing}
          className="text-xs text-[#666] hover:text-[#333] hover:bg-[#FFE8D6] transition-all duration-200"
        >
          <RefreshCw
            size={14}
            className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`}
          />
          New Quote
        </Button>
      </div>

      <div className="text-center py-4">
        <div className="flex justify-center mb-3">
          <div
            className={`p-2 rounded-full ${getCategoryColor(currentQuote.category)}`}
          >
            <IconComponent size={24} />
          </div>
        </div>

        <blockquote className="text-lg font-medium text-[#333] mb-3 leading-relaxed">
          "{currentQuote.text}"
        </blockquote>

        <cite className="text-sm text-[#666] font-medium">
          — {currentQuote.author}
        </cite>
      </div>

      <div className="flex items-center justify-between text-xs text-[#666]">
        <span>Category: {currentQuote.category}</span>
        <span>Refreshes every 5 min</span>
      </div>

      {/* Category Badge */}
      <div className="mt-3 flex justify-center">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(currentQuote.category)}`}
        >
          {currentQuote.category.charAt(0).toUpperCase() +
            currentQuote.category.slice(1)}
        </span>
      </div>
    </div>
  );
}
