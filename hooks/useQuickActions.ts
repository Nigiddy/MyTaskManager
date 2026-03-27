/**
 * hooks/useQuickActions.ts
 * Owns voice notes state and simulated recording logic.
 */
import { useState } from 'react';
import type { VoiceNote } from '@/types';

export function useQuickActions() {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [currentActionName, setCurrentActionName] = useState<string | null>(null);

  const triggerAction = (actionName: string) => {
    setCurrentActionName(actionName);
    setTimeout(() => setCurrentActionName(null), 2000);
  };

  const startRecording = () => {
    setIsRecording(true);
    setShowVoiceInput(true);
    setTimeout(() => {
      setIsRecording(false);
      const newNote: VoiceNote = {
        id: Date.now(),
        text: 'Complete WiFi billing system MVP by end of week',
        timestamp: new Date(),
        category: 'Task',
        completed: false,
      };
      setVoiceNotes(prev => [newNote, ...prev]);
      setShowVoiceInput(false);
    }, 3000);
  };

  const stopRecording = () => { setIsRecording(false); setShowVoiceInput(false); };

  const completeVoiceNote = (id: number) =>
    setVoiceNotes(prev => prev.map(n => n.id === id ? { ...n, completed: true } : n));

  const deleteVoiceNote = (id: number) =>
    setVoiceNotes(prev => prev.filter(n => n.id !== id));

  return { isRecording, voiceNotes, showVoiceInput, currentActionName, triggerAction, startRecording, stopRecording, completeVoiceNote, deleteVoiceNote };
}
