/**
 * components/features/TodaysWin.tsx
 * Renders today's wins with celebration animation.
 * All state lives in useTodaysWins().
 */
'use client';

import { Trophy, Star, Zap, Target, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTodaysWins } from '@/hooks/useTodaysWins';
import type { Win } from '@/types';

const impactColor: Record<Win['impact'], string> = {
  High: 'bg-red-100 text-red-700 border-red-200',
  Medium: 'bg-orange-100 text-orange-700 border-orange-200',
  Low: 'bg-green-100 text-green-700 border-green-200',
};

const categoryIcon: Record<string, string> = {
  Development: '💻', Fitness: '💪', Learning: '📚', Business: '🎯', Personal: '🌟',
};

export function TodaysWin() {
  const { wins, isLoading, error, celebratingWinId, showConfetti, celebrateWin, addNewWin, highImpactWins, totalTimeSpent } = useTodaysWins();

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute animate-bounce"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }}>
              <span className="text-2xl">{['🎉','🎊','✨','🌟','💫','🔥','💎','🏆'][Math.floor(Math.random() * 8)]}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">TODAY&apos;S WINS</h2>
        <Button onClick={addNewWin} size="sm" className="bg-[#FF9F43] hover:bg-[#FF8F33] text-white text-xs">
          <Star size={14} className="mr-1" />Add Win
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { icon: Trophy, color: 'text-yellow-600', label: 'Total Wins', value: wins.length, sub: 'Today' },
          { icon: Zap, color: 'text-red-600', label: 'High Impact', value: highImpactWins, sub: 'Major Wins' },
          { icon: Target, color: 'text-blue-600', label: 'Time Invested', value: `${totalTimeSpent}h`, sub: 'Productive Time' },
        ].map(s => (
          <div key={s.label} className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-center">
            <div className="flex items-center justify-center mb-2"><s.icon size={16} className={`${s.color} mr-1`} /><span className="text-xs text-[#666]">{s.label}</span></div>
            <div className="text-2xl font-bold text-[#333]">{isLoading ? '—' : s.value}</div>
            <div className="text-xs text-[#666]">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {isLoading && (
          <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-sm text-[#666]">
            Loading…
          </div>
        )}
        {!isLoading && error && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}
        {!isLoading && !error && wins.length === 0 && (
          <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-sm text-[#666]">
            No wins yet — add one when you achieve something today.
          </div>
        )}
        {!isLoading && !error && wins.map(win => (
          <div key={win.id}
            className={`p-4 rounded-lg border transition-all ${celebratingWinId === win.id ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 shadow-lg scale-105' : 'bg-white border-[#FFE8D6] hover:border-[#FF9F43]'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{categoryIcon[win.category] ?? '✨'}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#333] mb-1">{win.title}</h3>
                  <p className="text-xs text-[#666] mb-2">{win.description}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={`text-xs ${impactColor[win.impact]}`}>{win.impact} Impact</Badge>
                    <Badge variant="outline" className="text-xs bg-gray-100 text-gray-700 border-gray-200">{win.timeSpent}</Badge>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm"
                className={`h-8 w-8 p-0 ${celebratingWinId === win.id ? 'text-yellow-600 hover:bg-yellow-50' : 'text-[#FF9F43] hover:bg-[#FFE8D6]'}`}
                onClick={() => celebrateWin(win.id)}>
                {celebratingWinId === win.id ? <Sparkles size={16} /> : <Star size={16} />}
              </Button>
            </div>
            {celebratingWinId === win.id && (
              <div className="mt-3 p-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border border-yellow-200 text-center">
                <div className="text-lg mb-1">🎉</div>
                <div className="text-sm font-medium text-yellow-800">{win.celebration}</div>
                <div className="text-xs text-yellow-700 mt-1">Keep up the amazing work!</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg border border-[#FF9F43] text-center">
        <div className="text-3xl mb-2">🏆</div>
        <div className="text-lg font-bold text-[#FF9F43] mb-2">You&apos;re Crushing It Today!</div>
        <div className="text-sm text-[#666] mb-3">
          {isLoading ? 'Loading…' : wins.length > 0 ? `You've accomplished ${wins.length} amazing things today!` : 'Ready to start building your success story?'}
        </div>
        <div className="flex items-center justify-center space-x-4 text-xs text-[#666]">
          <div className="flex items-center"><CheckCircle size={14} className="mr-1 text-green-600" /><span>Stay Consistent</span></div>
          <div className="flex items-center"><Target size={14} className="mr-1 text-blue-600" /><span>Keep Focused</span></div>
          <div className="flex items-center"><Zap size={14} className="mr-1 text-yellow-600" /><span>Build Momentum</span></div>
        </div>
      </div>
    </div>
  );
}
