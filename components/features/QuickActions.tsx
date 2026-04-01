/**
 * components/features/QuickActions.tsx
 * Renders quick actions grid and voice notes panel.
 * All state lives in useQuickActions().
 */
'use client';

import { Plus, Mic, Play, Pause, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuickActions } from '@/hooks/useQuickActions';
import { useToast } from '@/hooks/use-toast';
import type { QuickAction } from '@/types';

const quickActions: QuickAction[] = [
  { id: 1, name: 'Add New Task', icon: '📝', action: 'Add', category: 'Task', shortcut: 'Ctrl+T' },
  { id: 2, name: 'Start Coding Session', icon: '💻', action: 'Start', category: 'Timer', shortcut: 'Ctrl+C' },
  { id: 3, name: 'Log Workout', icon: '💪', action: 'Log', category: 'Habit', shortcut: 'Ctrl+W' },
  { id: 4, name: 'Business Outreach', icon: '🎯', action: 'Outreach', category: 'Business', shortcut: 'Ctrl+B' },
  { id: 5, name: 'Start Pomodoro', icon: '⏰', action: 'Start', category: 'Timer', shortcut: 'Ctrl+P' },
  { id: 6, name: 'Quick Reflection', icon: '🧠', action: 'Reflect', category: 'Habit', shortcut: 'Ctrl+R' },
];

const categoryColor: Record<string, string> = {
  Task: 'bg-blue-100 text-blue-700 border-blue-200',
  Timer: 'bg-green-100 text-green-700 border-green-200',
  Habit: 'bg-purple-100 text-purple-700 border-purple-200',
  Business: 'bg-orange-100 text-orange-700 border-orange-200',
};

export function QuickActions() {
  const { isRecording, voiceNotes, showVoiceInput, currentActionName, triggerAction, startRecording, stopRecording, completeVoiceNote, deleteVoiceNote } = useQuickActions();
  const { toast } = useToast();

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">QUICK ACTIONS</h2>
        <Button variant="ghost" size="sm" className="text-xs text-[#666] hover:text-[#333]"
          onClick={() => toast({ title: 'Customize coming soon', description: 'You’ll be able to reorder and configure quick actions in a future update.' })}>
          <Plus size={16} className="mr-1" />Customize
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {quickActions.map(action => (
          <div key={action.id}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${currentActionName === action.name ? 'bg-[#FF9F43] border-[#FF9F43] text-white shadow-lg scale-105' : 'bg-white border-[#FFE8D6] hover:border-[#FF9F43] hover:shadow-md'}`}
            onClick={() => triggerAction(action.name)}>
            <div className="text-center">
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className={`text-sm font-medium mb-1 ${currentActionName === action.name ? 'text-white' : 'text-[#333]'}`}>{action.name}</div>
              <div className={`text-xs ${currentActionName === action.name ? 'text-orange-100' : 'text-[#666]'}`}>{action.action}</div>
              {action.shortcut && (
                <div className={`text-xs mt-1 px-2 py-1 rounded ${currentActionName === action.name ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{action.shortcut}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-[#333]">Voice Notes</h3>
          <Button variant={isRecording ? 'destructive' : 'default'} size="sm"
            className={`h-8 px-3 text-xs ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-[#FF9F43] hover:bg-[#FF8F33]'}`}
            onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? <><Pause size={14} className="mr-1" />Stop</> : <><Mic size={14} className="mr-1" />Record</>}
          </Button>
        </div>

        {showVoiceInput && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-700">Voice Input Active</span>
              {isRecording && (
                <div className="flex space-x-1">
                  {[0, 0.2, 0.4].map(d => <div key={d} className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: `${d}s` }} />)}
                </div>
              )}
            </div>
            <div className="text-xs text-blue-600">{isRecording ? 'Speak now... Recording your note' : 'Processing your voice input...'}</div>
          </div>
        )}

        <div className="space-y-2">
          {voiceNotes.map(note => (
            <div key={note.id} className={`p-3 rounded-lg border transition-colors ${note.completed ? 'bg-green-50 border-green-200' : 'bg-white border-[#FFE8D6] hover:border-[#FF9F43]'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`text-sm ${note.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{note.text}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className={`text-xs ${categoryColor[note.category] ?? 'bg-gray-100 text-gray-700 border-gray-200'}`}>{note.category}</Badge>
                    <span className="text-xs text-gray-500">{note.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  {!note.completed && (
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-green-600 hover:bg-green-50" onClick={() => completeVoiceNote(note.id)}>
                      <CheckCircle size={14} />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-red-600 hover:bg-red-50" onClick={() => deleteVoiceNote(note.id)}>
                    <X size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentActionName && (
        <div className="p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg border border-[#FF9F43]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#666]">Executing Action</span>
            <span className="font-bold text-[#FF9F43]">{currentActionName}</span>
          </div>
          <div className="mt-2 text-xs text-[#666]">Action completed successfully! Check your dashboard for updates.</div>
        </div>
      )}
    </div>
  );
}
