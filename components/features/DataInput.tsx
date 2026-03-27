/**
 * components/features/DataInput.tsx
 * Renders the data entry form and recent entries list.
 * All state lives in useDataInput().
 */
'use client';

import { useState } from 'react';
import { Database, Plus, Save, Edit, Trash2, Target, Calendar, BarChart3, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useDataInput } from '@/hooks/useDataInput';
import type { DataSection, DataField } from '@/types';

const dataSections: DataSection[] = [
  {
    id: 'coding-sessions', name: 'Coding Sessions', icon: Target, color: 'text-blue-600 bg-blue-50 border-blue-200',
    fields: [
      { id: 'project', label: 'Project', type: 'text', placeholder: 'e.g., WiFi Billing System', required: true },
      { id: 'duration', label: 'Duration (hours)', type: 'number', placeholder: '2.5', required: true },
      { id: 'focus_score', label: 'Focus Score', type: 'select', placeholder: 'Select score', options: ['90%+', '80-89%', '70-79%', '60-69%', '<60%'], required: true },
      { id: 'tasks_completed', label: 'Tasks Completed', type: 'number', placeholder: '3', required: true },
      { id: 'notes', label: 'Notes', type: 'textarea', placeholder: 'What did you accomplish?', required: false },
    ],
  },
  {
    id: 'business-outreach', name: 'Business Outreach', icon: Users, color: 'text-green-600 bg-green-50 border-green-200',
    fields: [
      { id: 'client', label: 'Client/Prospect', type: 'text', placeholder: 'e.g., Cybercafé Owner', required: true },
      { id: 'method', label: 'Contact Method', type: 'select', placeholder: 'Select method', options: ['Phone', 'Email', 'In-person', 'LinkedIn', 'Discord'], required: true },
      { id: 'status', label: 'Status', type: 'select', placeholder: 'Select status', options: ['Initial Contact', 'Follow-up', 'Meeting Scheduled', 'Proposal Sent', 'Closed'], required: true },
      { id: 'next_action', label: 'Next Action', type: 'text', placeholder: "What's the next step?", required: true },
      { id: 'follow_up_date', label: 'Follow-up Date', type: 'date', placeholder: '', required: false },
    ],
  },
  {
    id: 'fitness-wellness', name: 'Fitness & Wellness', icon: Target, color: 'text-orange-600 bg-orange-50 border-orange-200',
    fields: [
      { id: 'activity', label: 'Activity', type: 'text', placeholder: 'e.g., Morning Workout', required: true },
      { id: 'duration', label: 'Duration (minutes)', type: 'number', placeholder: '45', required: true },
      { id: 'intensity', label: 'Intensity', type: 'select', placeholder: 'Select intensity', options: ['Low', 'Medium', 'High', 'Maximum'], required: true },
      { id: 'mood_before', label: 'Mood Before', type: 'select', placeholder: 'Select mood', options: ['Tired', 'Neutral', 'Energetic', 'Motivated'], required: false },
      { id: 'mood_after', label: 'Mood After', type: 'select', placeholder: 'Select mood', options: ['Tired', 'Neutral', 'Energetic', 'Motivated'], required: false },
      { id: 'notes', label: 'Notes', type: 'textarea', placeholder: 'How did it feel?', required: false },
    ],
  },
  {
    id: 'learning-progress', name: 'Learning Progress', icon: BarChart3, color: 'text-purple-600 bg-purple-50 border-purple-200',
    fields: [
      { id: 'topic', label: 'Topic/Skill', type: 'text', placeholder: 'e.g., Python Data Structures', required: true },
      { id: 'time_spent', label: 'Time Spent (hours)', type: 'number', placeholder: '1.5', required: true },
      { id: 'resource', label: 'Learning Resource', type: 'text', placeholder: 'e.g., Udemy Course', required: false },
      { id: 'confidence_level', label: 'Confidence Level', type: 'select', placeholder: 'Select level', options: ['Beginner', 'Getting There', 'Comfortable', 'Confident', 'Expert'], required: true },
      { id: 'next_goal', label: 'Next Learning Goal', type: 'text', placeholder: "What's next?", required: false },
    ],
  },
];

function FieldInput({ field, value, onChange }: { field: DataField; value: unknown; onChange: (v: unknown) => void }) {
  const base = 'w-full px-3 py-2 text-sm border border-[#FFE8D6] rounded-md bg-white text-[#333]';
  if (field.type === 'select') return (
    <select value={String(value ?? '')} onChange={e => onChange(e.target.value)} className={base} required={field.required}>
      <option value="">{field.placeholder}</option>
      {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
  if (field.type === 'textarea') return (
    <textarea value={String(value ?? '')} onChange={e => onChange(e.target.value)} placeholder={field.placeholder}
      className={`${base} resize-none`} rows={3} required={field.required} />
  );
  return (
    <Input type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
      value={String(value ?? '')} onChange={e => onChange(field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
      placeholder={field.placeholder} className="text-sm" required={field.required} step={field.type === 'number' ? '0.1' : undefined} />
  );
}

export function DataInput() {
  const [selectedSectionId, setSelectedSectionId] = useState('coding-sessions');
  const currentSection = dataSections.find(s => s.id === selectedSectionId);
  const { entries, formData, isEditing, handleInputChange, handleSubmit, handleEdit, handleDelete, cancelEdit } = useDataInput(currentSection);
  const sectionEntries = entries.filter(e => e.sectionId === selectedSectionId);

  const onSubmit = () => {
    if (!handleSubmit(selectedSectionId)) alert('Please fill in all required fields');
  };

  return (
    <div className="bg-gradient-to-br from-[#FFF8F3] to-[#FFE8D6] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#FFE8D6]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Database size={20} className="text-[#FF9F43]" />
          <h2 className="font-semibold text-lg text-[#333]">DATA INPUT</h2>
        </div>
        <Badge variant="outline" className="bg-[#FFE8D6] text-[#666] border-[#FF9F43] text-xs">{sectionEntries.length} entries</Badge>
      </div>

      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {dataSections.map(section => {
          const Icon = section.icon;
          return (
            <button key={section.id} onClick={() => setSelectedSectionId(section.id)}
              className={`p-3 rounded-lg border transition-all duration-200 text-left ${selectedSectionId === section.id ? `${section.color} border-current` : 'bg-white border-[#FFE8D6] hover:border-[#FF9F43]'}`}>
              <div className="flex items-center space-x-2"><Icon size={16} /><span className="text-sm font-medium">{section.name}</span></div>
            </button>
          );
        })}
      </div>

      {currentSection && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-[#FFE8D6]">
          <div className="flex items-center space-x-2 mb-3">
            <currentSection.icon size={18} className={currentSection.color.split(' ')[0]} />
            <h3 className="font-medium text-[#333]">{currentSection.name}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentSection.fields.map(field => (
              <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                <label className="block text-xs font-medium text-[#666] mb-1">
                  {field.label}{field.required && <span className="text-red-500"> *</span>}
                </label>
                <FieldInput field={field} value={formData[field.id]} onChange={v => handleInputChange(field.id, v)} />
              </div>
            ))}
          </div>
          <div className="flex space-x-2 mt-4">
            <Button onClick={onSubmit} size="sm" className="bg-[#FF9F43] hover:bg-[#FF8A3C] text-white text-xs">
              {isEditing !== null ? <Edit size={14} className="mr-1" /> : <Plus size={14} className="mr-1" />}
              {isEditing !== null ? 'Update Entry' : 'Add Entry'}
            </Button>
            {isEditing !== null && (
              <Button onClick={cancelEdit} variant="outline" size="sm" className="border-[#FFE8D6] text-[#666] hover:bg-[#FFE8D6] text-xs">Cancel</Button>
            )}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h4 className="font-medium text-[#333] mb-2">Recent Entries</h4>
        {sectionEntries.slice(0, 5).map(entry => (
          <div key={entry.id} className="p-3 bg-white rounded-lg border border-[#FFE8D6] hover:border-[#FF9F43] transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  {Object.entries(entry.data).map(([key, val]) => {
                    const field = currentSection?.fields.find(f => f.id === key);
                    if (!field || !val) return null;
                    return (
                      <div key={key}><span className="text-[#666]">{field.label}:</span><span className="ml-1 font-medium text-[#333]">{String(val)}</span></div>
                    );
                  })}
                </div>
                <div className="text-xs text-[#666] mt-2">{entry.updatedAt.toLocaleDateString()} at {entry.updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <div className="flex space-x-1 ml-2">
                <button onClick={() => handleEdit(entry)} className="p-1 text-gray-400 hover:text-blue-500 transition-colors"><Edit size={14} /></button>
                <button onClick={() => handleDelete(entry.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
        {sectionEntries.length === 0 && (
          <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] text-center text-[#666] text-sm">
            No entries yet. Add your first {currentSection?.name.toLowerCase()} entry above!
          </div>
        )}
      </div>
    </div>
  );
}
