'use client';

import { useState, useEffect } from 'react';
import { Trophy, Star, Zap, Target, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Win = {
  id: number;
  title: string;
  description: string;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
  timeSpent: string;
  celebration: string;
};

export function TodaysWin() {
  const [wins, setWins] = useState<Win[]>([
    {
      id: 1,
      title: 'Completed WiFi Billing MVP',
      description:
        'Finished core functionality for cybercafé management system',
      category: 'Development',
      impact: 'High',
      timeSpent: '4 hours',
      celebration: '🎉 Major milestone achieved!',
    },
    {
      id: 2,
      title: '4 AM Workout Streak',
      description: 'Maintained 7-day consecutive early morning workout routine',
      category: 'Fitness',
      impact: 'High',
      timeSpent: '1.5 hours',
      celebration: '💪 Discipline champion!',
    },
    {
      id: 3,
      title: 'Python Data Structures',
      description: 'Mastered advanced Python data structures and algorithms',
      category: 'Learning',
      impact: 'Medium',
      timeSpent: '2 hours',
      celebration: '🧠 Knowledge expanded!',
    },
  ]);

  const [showConfetti, setShowConfetti] = useState(false);
  const [celebratingWin, setCelebratingWin] = useState<number | null>(null);

  const celebrateWin = (winId: number) => {
    setCelebratingWin(winId);
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
      setCelebratingWin(null);
    }, 3000);
  };

  const addNewWin = () => {
    const newWin: Win = {
      id: Date.now(),
      title: 'New Achievement Unlocked!',
      description: "You've accomplished something amazing today",
      category: 'Personal',
      impact: 'High',
      timeSpent: '1 hour',
      celebration: '🌟 New win added!',
    };
    setWins([newWin, ...wins]);
    celebrateWin(newWin.id);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Development':
        return '💻';
      case 'Fitness':
        return '💪';
      case 'Learning':
        return '📚';
      case 'Business':
        return '🎯';
      case 'Personal':
        return '🌟';
      default:
        return '✨';
    }
  };

  const totalWins = wins.length;
  const highImpactWins = wins.filter(win => win.impact === 'High').length;
  const totalTimeSpent = wins.reduce((sum, win) => {
    const hours = parseFloat(
      win.timeSpent.replace(' hours', '').replace(' hour', '')
    );
    return sum + hours;
  }, 0);

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              <span className="text-2xl">
                {
                  ['🎉', '🎊', '✨', '🌟', '💫', '🔥', '💎', '🏆'][
                    Math.floor(Math.random() * 8)
                  ]
                }
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">TODAY'S WINS</h2>
        <Button
          onClick={addNewWin}
          size="sm"
          className="bg-[#FF9F43] hover:bg-[#FF8F33] text-white text-xs"
        >
          <Star size={14} className="mr-1" />
          Add Win
        </Button>
      </div>

      {/* Win Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="flex items-center justify-center mb-2">
            <Trophy size={16} className="text-yellow-600 mr-1" />
            <span className="text-xs text-[#666]">Total Wins</span>
          </div>
          <div className="text-2xl font-bold text-[#333]">{totalWins}</div>
          <div className="text-xs text-[#666]">Today</div>
        </div>

        <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="flex items-center justify-center mb-2">
            <Zap size={16} className="text-red-600 mr-1" />
            <span className="text-xs text-[#666]">High Impact</span>
          </div>
          <div className="text-2xl font-bold text-[#333]">{highImpactWins}</div>
          <div className="text-xs text-[#666]">Major Wins</div>
        </div>

        <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="flex items-center justify-center mb-2">
            <Target size={16} className="text-blue-600 mr-1" />
            <span className="text-xs text-[#666]">Time Invested</span>
          </div>
          <div className="text-2xl font-bold text-[#333]">
            {totalTimeSpent}h
          </div>
          <div className="text-xs text-[#666]">Productive Time</div>
        </div>
      </div>

      {/* Wins List */}
      <div className="space-y-3">
        {wins.map(win => (
          <div
            key={win.id}
            className={`p-4 rounded-lg border transition-all ${
              celebratingWin === win.id
                ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 shadow-lg scale-105'
                : 'bg-white border-[#FFE8D6] hover:border-[#FF9F43]'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">
                  {getCategoryIcon(win.category)}
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#333] mb-1">
                    {win.title}
                  </h3>
                  <p className="text-xs text-[#666] mb-2">{win.description}</p>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getImpactColor(win.impact)}`}
                    >
                      {win.impact} Impact
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs bg-gray-100 text-gray-700 border-gray-200"
                    >
                      {win.timeSpent}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 w-8 p-0 ${
                    celebratingWin === win.id
                      ? 'text-yellow-600 hover:bg-yellow-50'
                      : 'text-[#FF9F43] hover:bg-[#FFE8D6]'
                  }`}
                  onClick={() => celebrateWin(win.id)}
                >
                  {celebratingWin === win.id ? (
                    <Sparkles size={16} />
                  ) : (
                    <Star size={16} />
                  )}
                </Button>
              </div>
            </div>

            {celebratingWin === win.id && (
              <div className="mt-3 p-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border border-yellow-200">
                <div className="text-center">
                  <div className="text-lg mb-1">🎉</div>
                  <div className="text-sm font-medium text-yellow-800">
                    {win.celebration}
                  </div>
                  <div className="text-xs text-yellow-700 mt-1">
                    Keep up the amazing work!
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Motivation Section */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg border border-[#FF9F43]">
        <div className="text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-lg font-bold text-[#FF9F43] mb-2">
            You're Crushing It Today!
          </div>
          <div className="text-sm text-[#666] mb-3">
            {totalWins > 0
              ? `You've accomplished ${totalWins} amazing things today. That's ${totalWins} reasons to be proud!`
              : 'Ready to start building your success story? Every win counts, no matter how small.'}
          </div>
          <div className="flex items-center justify-center space-x-4 text-xs text-[#666]">
            <div className="flex items-center">
              <CheckCircle size={14} className="mr-1 text-green-600" />
              <span>Stay Consistent</span>
            </div>
            <div className="flex items-center">
              <Target size={14} className="mr-1 text-blue-600" />
              <span>Keep Focused</span>
            </div>
            <div className="flex items-center">
              <Zap size={14} className="mr-1 text-yellow-600" />
              <span>Build Momentum</span>
            </div>
          </div>
        </div>
      </div>

      {/* Win Streak */}
      <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-purple-700">Win Streak</span>
          <span className="font-bold text-purple-700">7 Days Strong! 🔥</span>
        </div>
        <div className="mt-2 text-xs text-purple-600">
          You're on a roll! Consistency is the key to long-term success. Keep
          building those winning habits.
        </div>
      </div>
    </div>
  );
}
