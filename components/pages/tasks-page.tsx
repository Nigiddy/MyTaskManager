'use client';

import { TaskList } from '@/components/task-list';
import { Calendar } from '@/components/calendar';
import { MyTasks } from '@/components/my-tasks';
import { AssignedTasks } from '@/components/assigned-tasks';
import { CaseTypeBreakdown } from '@/components/case-type-breakdown';

export function TasksPage() {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Tasks & Projects
          </h2>
          <p className="text-sm text-green-600">
            Manage your daily tasks, track project progress, and stay organized
          </p>
        </div>
      </div>

      {/* Main Task Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskList />
        <div className="space-y-4">
          <Calendar />
          <MyTasks />
        </div>
      </div>

      {/* Business Tasks and Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AssignedTasks />
        <CaseTypeBreakdown />
      </div>

      {/* Quick Task Actions */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">Quick Task Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-green-700 text-sm font-medium transition-colors">
            + Add Task
          </button>
          <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-blue-700 text-sm font-medium transition-colors">
            📅 Schedule
          </button>
          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-purple-700 text-sm font-medium transition-colors">
            📊 Progress
          </button>
          <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 text-orange-700 text-sm font-medium transition-colors">
            🔄 Repeat
          </button>
        </div>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="text-2xl font-bold text-[#FF9F43]">12</div>
          <div className="text-sm text-[#666]">Active Tasks</div>
        </div>
        <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="text-2xl font-bold text-green-600">8</div>
          <div className="text-sm text-[#666]">Completed Today</div>
        </div>
        <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] text-center">
          <div className="text-2xl font-bold text-blue-600">3</div>
          <div className="text-sm text-[#666]">Projects Active</div>
        </div>
      </div>
    </div>
  );
}
