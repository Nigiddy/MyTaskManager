/**
 * components/features/MicroWins.tsx
 * Renders the Micro-Wins tracker.
 * All state lives in useMicroWins().
 */
'use client';

import { useState } from 'react';
import { Trophy, Plus, Star, Target, Zap, Heart, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useMicroWins } from '@/hooks/useMicroWins';
import type { MicroWin } from '@/types';

const categories = [
  { id: 'fitness', name: 'Fitness', icon: Target, color: 'text-green-600 bg-green-50 border-green-200' },
  { id: 'discipline', name: 'Discipline', icon: Zap, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { id: 'health', name: 'Health', icon: Heart, color: 'text-pink-600 bg-pink-50 border-pink-200' },
  { id: 'relationships', name: 'Relationships', icon: Heart, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { id: 'learning', name: 'Learning', icon: Brain, color: 'text-orange-600 bg-orange-50 border-orange-200' },
  { id: 'creativity', name: 'Creativity', icon: Star, color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
];

const impactIcon: Record<MicroWin['impact'], string> = { high: '🔥', medium: '⚡', low: '💡' };
const impactColor: Record<MicroWin['impact'], string> = { high: 'text-red-600 bg-red-50 border-red-200', medium: 'text-orange-600 bg-orange-50 border-orange-200', low: 'text-green-600 bg-green-50 border-green-200' };

function getCategoryMeta(id: string) {
  return categories.find(c => c.id === id) ?? categories[0];
}

export function MicroWins() {
  const { wins, addWin, deleteWin, todayWins, highImpactWins } = useMicroWins();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('discipline');
  const [impact, setImpact] = useState<MicroWin['impact']>('medium');

  const handleAdd = () => {
    if (title.trim() && desc.trim()) {
      addWin(title, desc, category, impact);
      setTitle(''); setDesc(''); setShowForm(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#FFF8F3] to-[#FFE8D6] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#FFE8D6]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy size={20} className="text-yellow-500" />
          <h2 className="font-semibold text-lg text-[#333]">MICRO-WINS TRACKER</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setShowForm(!showForm)} className="text-xs text-[#666] hover:text-[#333] hover:bg-[#FFE8D6]">
          <Plus size={14} className="mr-1" />Add Win
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[{ label: 'Total Wins', value: wins.length }, { label: 'Today', value: todayWins }, { label: 'High Impact', value: highImpactWins }].map(s => (
          <div key={s.label} className="p-2 bg-white rounded-lg border border-[#FFE8D6] text-center">
            <div className="text-lg font-bold text-[#333]">{s.value}</div>
            <div className="text-xs text-[#666]">{s.label}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="mb-4 p-3 bg-white rounded-lg border border-[#FFE8D6]">
          <div className="space-y-3">
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="What's your micro-win?" className="text-sm" />
            <Input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe why this matters..." className="text-sm" />
            <div className="flex space-x-2">
              <select value={category} onChange={e => setCategory(e.target.value)} className="flex-1 px-3 py-2 text-sm border border-[#FFE8D6] rounded-md bg-white text-[#333]">
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <select value={impact} onChange={e => setImpact(e.target.value as MicroWin['impact'])} className="flex-1 px-3 py-2 text-sm border border-[#FFE8D6] rounded-md bg-white text-[#333]">
                <option value="low">Low Impact</option>
                <option value="medium">Medium Impact</option>
                <option value="high">High Impact</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAdd} disabled={!title.trim() || !desc.trim()} size="sm" className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs">Add Win</Button>
              <Button onClick={() => setShowForm(false)} variant="outline" size="sm" className="flex-1 border-[#FFE8D6] text-[#666] hover:bg-[#FFE8D6] text-xs">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {wins.map(win => {
          const cat = getCategoryMeta(win.category);
          const CatIcon = cat.icon;
          return (
            <div key={win.id} className="p-3 bg-white rounded-lg border border-[#FFE8D6] hover:border-yellow-200 transition-all duration-200 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{impactIcon[win.impact]}</span>
                    <h4 className="text-sm font-medium text-[#333]">{win.title}</h4>
                  </div>
                  <div className="text-xs text-[#666] mb-3">{win.description}</div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${cat.color}`}>
                      <CatIcon size={12} className="mr-1" />{cat.name}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${impactColor[win.impact]}`}>
                      {win.impact.charAt(0).toUpperCase() + win.impact.slice(1)} Impact
                    </span>
                  </div>
                </div>
                <button onClick={() => deleteWin(win.id)} className="ml-2 text-gray-400 hover:text-red-500 transition-colors p-1">×</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
        <div className="text-xs text-yellow-700 mb-2 font-medium">Quick Win Ideas:</div>
        <div className="flex flex-wrap gap-2">
          {['Did 10 squats', 'Read 5 pages', 'Called a friend', 'Meditated 5 min', 'Drank water', 'Went outside'].map(s => (
            <button key={s} onClick={() => { setTitle(s); setDesc(`Quick win: ${s.toLowerCase()}`); setCategory('discipline'); setImpact('low'); setShowForm(true); }}
              className="text-xs px-2 py-1 bg-white rounded border border-yellow-200 text-yellow-700 hover:bg-yellow-50 transition-colors">{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
