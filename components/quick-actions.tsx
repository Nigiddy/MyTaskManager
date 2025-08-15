'use client';

import { useState } from 'react';
import {
  Plus,
  Mic,
  Play,
  Pause,
  RotateCcw,
  Target,
  Zap,
  Clock,
  CheckCircle,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type QuickAction = {
  id: number;
  name: string;
  icon: string;
  action: string;
  category: 'Task' | 'Timer' | 'Habit' | 'Business';
  shortcut?: string;
};

type VoiceNote = {
  id: number;
  text: string;
  timestamp: Date;
  category: string;
  completed: boolean;
};

export function QuickActions() {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);

  const quickActions: QuickAction[] = [
    {
      id: 1,
      name: 'Add New Task',
      icon: '📝',
      action: 'Add',
      category: 'Task',
      shortcut: 'Ctrl+T',
    },
    {
      id: 2,
      name: 'Start Coding Session',
      icon: '💻',
      action: 'Start',
      category: 'Timer',
      shortcut: 'Ctrl+C',
    },
    {
      id: 3,
      name: 'Log Workout',
      icon: '💪',
      action: 'Log',
      category: 'Habit',
      shortcut: 'Ctrl+W',
    },
    {
      id: 4,
      name: 'Business Outreach',
      icon: '🎯',
      action: 'Outreach',
      category: 'Business',
      shortcut: 'Ctrl+B',
    },
    {
      id: 5,
      name: 'Start Pomodoro',
      icon: '⏰',
      action: 'Start',
      category: 'Timer',
      shortcut: 'Ctrl+P',
    },
    {
      id: 6,
      name: 'Quick Reflection',
      icon: '🧠',
      action: 'Reflect',
      category: 'Habit',
      shortcut: 'Ctrl+R',
    },
  ];

  const handleQuickAction = (action: QuickAction) => {
    setCurrentAction(action.name);

    // Simulate action execution
    setTimeout(() => {
      setCurrentAction(null);
    }, 2000);
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    setShowVoiceInput(true);

    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false);
      const newNote: VoiceNote = {
        id: Date.now(),
        text: 'Complete WiFi billing system MVP by end of week',
        timestamp: new Date(),
        category: 'Task',
        completed: false,
      };
      setVoiceNotes([newNote, ...voiceNotes]);
      setShowVoiceInput(false);
    }, 3000);
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    setShowVoiceInput(false);
  };

  const completeVoiceNote = (noteId: number) => {
    setVoiceNotes(
      voiceNotes.map(note =>
        note.id === noteId ? { ...note, completed: true } : note
      )
    );
  };

  const deleteVoiceNote = (noteId: number) => {
    setVoiceNotes(voiceNotes.filter(note => note.id !== noteId));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Task':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Timer':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Habit':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Business':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">QUICK ACTIONS</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-[#666] hover:text-[#333]"
        >
          <Plus size={16} className="mr-1" />
          Customize
        </Button>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {quickActions.map(action => (
          <div
            key={action.id}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              currentAction === action.name
                ? 'bg-[#FF9F43] border-[#FF9F43] text-white shadow-lg scale-105'
                : 'bg-white border-[#FFE8D6] hover:border-[#FF9F43] hover:shadow-md'
            }`}
            onClick={() => handleQuickAction(action)}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{action.icon}</div>
              <div
                className={`text-sm font-medium mb-1 ${
                  currentAction === action.name ? 'text-white' : 'text-[#333]'
                }`}
              >
                {action.name}
              </div>
              <div
                className={`text-xs ${
                  currentAction === action.name
                    ? 'text-orange-100'
                    : 'text-[#666]'
                }`}
              >
                {action.action}
              </div>
              {action.shortcut && (
                <div
                  className={`text-xs mt-1 px-2 py-1 rounded ${
                    currentAction === action.name
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {action.shortcut}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Voice Notes Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-[#333]">Voice Notes</h3>
          <Button
            variant={isRecording ? 'destructive' : 'default'}
            size="sm"
            className={`h-8 px-3 text-xs ${
              isRecording
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-[#FF9F43] hover:bg-[#FF8F33]'
            }`}
            onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
          >
            {isRecording ? (
              <>
                <Pause size={14} className="mr-1" />
                Stop
              </>
            ) : (
              <>
                <Mic size={14} className="mr-1" />
                Record
              </>
            )}
          </Button>
        </div>

        {/* Voice Input Interface */}
        {showVoiceInput && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-700">
                Voice Input Active
              </span>
              <div className="flex items-center space-x-2">
                {isRecording && (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-xs text-blue-600">
              {isRecording
                ? 'Speak now... Recording your note'
                : 'Processing your voice input...'}
            </div>
          </div>
        )}

        {/* Voice Notes List */}
        <div className="space-y-2">
          {voiceNotes.map(note => (
            <div
              key={note.id}
              className={`p-3 rounded-lg border transition-colors ${
                note.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-[#FFE8D6] hover:border-[#FF9F43]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p
                    className={`text-sm ${note.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                  >
                    {note.text}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getCategoryColor(note.category)}`}
                    >
                      {note.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {note.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  {!note.completed && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-green-600 hover:bg-green-50"
                      onClick={() => completeVoiceNote(note.id)}
                    >
                      <CheckCircle size={14} />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                    onClick={() => deleteVoiceNote(note.id)}
                  >
                    <X size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-First Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">
              Offline Mode
            </span>
            <Badge
              variant="outline"
              className="bg-green-100 text-green-700 border-green-200 text-xs"
            >
              Active
            </Badge>
          </div>
          <div className="text-xs text-green-600">
            Work without internet • Data syncs when online • Local storage
            enabled
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-700">
              Gesture Controls
            </span>
            <Badge
              variant="outline"
              className="bg-purple-100 text-purple-700 border-purple-200 text-xs"
            >
              Enabled
            </Badge>
          </div>
          <div className="text-xs text-purple-600">
            Swipe to complete • Long press for options • Pull to refresh
          </div>
        </div>
      </div>

      {/* Action Status */}
      {currentAction && (
        <div className="p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg border border-[#FF9F43]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#666]">Executing Action</span>
            <span className="font-bold text-[#FF9F43]">{currentAction}</span>
          </div>
          <div className="mt-2 text-xs text-[#666]">
            Action completed successfully! Check your dashboard for updates.
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="mt-4 p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666]">Pro Tips</span>
          <span className="font-bold text-[#FF9F43]">
            Speed • Efficiency • Growth
          </span>
        </div>
        <div className="mt-2 text-xs text-[#666]">
          Use voice notes during workouts • Keyboard shortcuts for power users •
          Offline mode for focus sessions
        </div>
      </div>
    </div>
  );
}
