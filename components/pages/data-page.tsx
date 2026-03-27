'use client';

import { DataInput } from '@/components/features/DataInput';

export function DataPage() {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-800 mb-2">
            Data Input & Tracking
          </h2>
          <p className="text-sm text-amber-600">
            Log your activities, track progress, and maintain detailed records
          </p>
        </div>
      </div>

      {/* Data Input Component */}
      <DataInput />

      {/* Data Entry Tips */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3">💡 Data Entry Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
          <div>• Log activities immediately for accuracy</div>
          <div>• Use consistent categories and labels</div>
          <div>• Review your data weekly for insights</div>
          <div>• Export data for external analysis</div>
        </div>
      </div>

      {/* Quick Data Actions */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">Quick Data Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-blue-700 text-sm font-medium transition-colors">
            💻 Log Coding
          </button>
          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-green-700 text-sm font-medium transition-colors">
            📞 Log Call
          </button>
          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-purple-700 text-sm font-medium transition-colors">
            🏃‍♂️ Log Exercise
          </button>
          <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 text-orange-700 text-sm font-medium transition-colors">
            📚 Log Learning
          </button>
        </div>
      </div>

      {/* Data Statistics */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">Data Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">156</div>
            <div className="text-xs text-blue-600">Total Entries</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">24</div>
            <div className="text-xs text-green-600">This Week</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-xl font-bold text-purple-600">4</div>
            <div className="text-xs text-purple-600">Categories</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-xl font-bold text-orange-600">85%</div>
            <div className="text-xs text-orange-600">Completion</div>
          </div>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
        <h3 className="font-semibold text-emerald-800 mb-3">
          📊 Recent Activity Summary
        </h3>
        <div className="space-y-2 text-sm text-emerald-700">
          <div className="flex justify-between">
            <span>• Coding Sessions</span>
            <span className="font-medium">12 entries this week</span>
          </div>
          <div className="flex justify-between">
            <span>• Business Outreach</span>
            <span className="font-medium">8 contacts made</span>
          </div>
          <div className="flex justify-between">
            <span>• Fitness & Wellness</span>
            <span className="font-medium">15 activities logged</span>
          </div>
          <div className="flex justify-between">
            <span>• Learning Progress</span>
            <span className="font-medium">18 hours tracked</span>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">Export & Backup</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-blue-700 text-sm font-medium transition-colors">
            📊 Export CSV
          </button>
          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-green-700 text-sm font-medium transition-colors">
            📈 Export Charts
          </button>
          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-purple-700 text-sm font-medium transition-colors">
            💾 Backup Data
          </button>
        </div>
      </div>
    </div>
  );
}
