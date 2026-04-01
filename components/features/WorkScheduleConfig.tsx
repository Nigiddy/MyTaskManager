/**
 * components/features/WorkScheduleConfig.tsx
 * Renders the work schedule configuration form.
 * All state lives in useWorkSchedule().
 */
'use client';

import { Clock, Calendar, Coffee, Save, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWorkSchedule } from '@/hooks/useWorkSchedule';
import type { WorkSchedule } from '@/types';

interface Props {
  onScheduleChange?: (s: WorkSchedule) => void;
}

export function WorkScheduleConfig({ onScheduleChange }: Props) {
  const { tempSchedule, isEditing, setIsEditing, saveSchedule, cancelEdit, addWorkHour, removeWorkHour, addBreak, removeBreak, updateWorkHour, updateBreak, toggleSchedule, schedule } = useWorkSchedule(onScheduleChange);

  return (
    <div className="p-4 bg-white border border-[#FFE8D6] rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#333] flex items-center">
          <Calendar className="h-4 w-4 mr-2" />Work Schedule Configuration
        </h3>
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input type="checkbox" checked={tempSchedule.isEnabled} onChange={toggleSchedule} className="rounded border-gray-300" />
            <span>Enable Schedule</span>
          </label>
          {!isEditing ? (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-700">
              <Edit className="h-4 w-4 mr-1" />Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={saveSchedule} className="text-green-600 hover:text-green-700">
                <Save className="h-4 w-4 mr-1" />Save
              </Button>
              <Button variant="ghost" size="sm" onClick={cancelEdit} className="text-gray-600 hover:text-gray-700">Cancel</Button>
            </div>
          )}
        </div>
      </div>

      {!tempSchedule.isEnabled && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700 mb-4">
          ⚠️ Schedule is disabled. Notifications will be sent at any time.
        </div>
      )}

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-[#333] flex items-center"><Clock className="h-4 w-4 mr-2" />Work Hours</h4>
            {isEditing && <Button variant="ghost" size="sm" onClick={addWorkHour} className="text-blue-600 hover:text-blue-700 text-xs">+ Add</Button>}
          </div>
          <div className="space-y-2">
            {tempSchedule.workHours.map((hour, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2 p-2 bg-gray-50 rounded">
                <input type="time" value={hour.start} onChange={e => updateWorkHour(i, 'start', e.target.value)} disabled={!isEditing} className="border border-gray-300 rounded px-2 py-1.5 text-sm min-h-[36px]" />
                <span className="text-gray-500 text-sm">to</span>
                <input type="time" value={hour.end} onChange={e => updateWorkHour(i, 'end', e.target.value)} disabled={!isEditing} className="border border-gray-300 rounded px-2 py-1.5 text-sm min-h-[36px]" />
                <input type="text" value={hour.label} onChange={e => updateWorkHour(i, 'label', e.target.value)} disabled={!isEditing} placeholder="Label" className="flex-1 min-w-[100px] border border-gray-300 rounded px-2 py-1.5 text-sm min-h-[36px]" />
                {isEditing && tempSchedule.workHours.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeWorkHour(i)} className="text-red-600 hover:text-red-700 text-xs h-9 w-9 p-0">×</Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-[#333] flex items-center"><Coffee className="h-4 w-4 mr-2" />Break Times</h4>
            {isEditing && <Button variant="ghost" size="sm" onClick={addBreak} className="text-blue-600 hover:text-blue-700 text-xs">+ Add</Button>}
          </div>
          <div className="space-y-2">
            {tempSchedule.breaks.map((b, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2 p-2 bg-green-50 rounded">
                <input type="time" value={b.start} onChange={e => updateBreak(i, 'start', e.target.value)} disabled={!isEditing} className="border border-gray-300 rounded px-2 py-1.5 text-sm min-h-[36px]" />
                <span className="text-gray-500 text-sm">to</span>
                <input type="time" value={b.end} onChange={e => updateBreak(i, 'end', e.target.value)} disabled={!isEditing} className="border border-gray-300 rounded px-2 py-1.5 text-sm min-h-[36px]" />
                <input type="text" value={b.label} onChange={e => updateBreak(i, 'label', e.target.value)} disabled={!isEditing} placeholder="Label" className="flex-1 min-w-[100px] border border-gray-300 rounded px-2 py-1.5 text-sm min-h-[36px]" />
                {isEditing && <Button variant="ghost" size="sm" onClick={() => removeBreak(i)} className="text-red-600 hover:text-red-700 text-xs h-9 w-9 p-0">×</Button>}
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
          <div className="text-sm text-blue-700">
            <strong>Current Status:</strong> {schedule.isEnabled ? 'Schedule Active' : 'Schedule Disabled'}
          </div>
          <div className="text-xs text-blue-600 mt-1">Notifications will be sent during breaks and outside work hours.</div>
        </div>
      </div>
    </div>
  );
}
