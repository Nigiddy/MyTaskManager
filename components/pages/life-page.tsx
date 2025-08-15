'use client';

import { LifeReminders } from '@/components/life-reminders';
import { MicroWins } from '@/components/micro-wins';
import { TodaysWin } from '@/components/todays-win';
import { NotificationService } from '@/components/notification-service';
import { WorkScheduleConfig } from '@/components/work-schedule-config';

export function LifePage() {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-pink-800 mb-2">
            Life & Wellness
          </h2>
          <p className="text-sm text-pink-600">
            Balance work with life, track wellness, and maintain relationships
          </p>
        </div>
      </div>

      {/* Main Life Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LifeReminders />
        <MicroWins />
      </div>

      {/* Today's Win */}
      <TodaysWin />

      {/* Smart Notification System */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#333] flex items-center">
          🔔 Smart Notifications
        </h3>

        {/* Notification Service */}
        <NotificationService />

        {/* Work Schedule Configuration */}
        <WorkScheduleConfig />
      </div>

      {/* Wellness Tracking */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">Wellness Tracker</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">8</div>
            <div className="text-xs text-green-600">Water Glasses</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">45m</div>
            <div className="text-xs text-blue-600">Exercise</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-xl font-bold text-purple-600">7h</div>
            <div className="text-xs text-purple-600">Sleep</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-xl font-bold text-orange-600">3</div>
            <div className="text-xs text-orange-600">Social Calls</div>
          </div>
        </div>
      </div>

      {/* Life Balance Tips */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3">
          💡 Life Balance Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
          <div>• Take regular breaks from screens</div>
          <div>• Stay connected with family & friends</div>
          <div>• Prioritize sleep and exercise</div>
          <div>• Practice gratitude daily</div>
        </div>
      </div>

      {/* Quick Wellness Actions */}
      <div className="p-4 bg-white rounded-lg border border-[#FFE8D6] shadow-sm">
        <h3 className="font-semibold text-[#333] mb-3">
          Quick Wellness Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-green-700 text-sm font-medium transition-colors">
            💧 Log Water
          </button>
          <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-blue-700 text-sm font-medium transition-colors">
            🏃‍♂️ Log Exercise
          </button>
          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-purple-700 text-sm font-medium transition-colors">
            📞 Call Family
          </button>
          <button className="p-3 bg-pink-50 hover:bg-pink-100 rounded-lg border border-pink-200 text-pink-700 text-sm font-medium transition-colors">
            🧘‍♂️ Meditate
          </button>
        </div>
      </div>

      {/* Personal Goals */}
      <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
        <h3 className="font-semibold text-emerald-800 mb-3">
          🎯 Personal Goals
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-200">
            <span className="text-sm text-emerald-700">
              Read 30 minutes daily
            </span>
            <div className="w-20 bg-emerald-100 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full"
                style={{ width: '70%' }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-200">
            <span className="text-sm text-emerald-700">
              Exercise 5 days/week
            </span>
            <div className="w-20 bg-emerald-100 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full"
                style={{ width: '80%' }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-200">
            <span className="text-sm text-emerald-700">Call family weekly</span>
            <div className="w-20 bg-emerald-100 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full"
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Notification Info */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <h3 className="font-semibold text-purple-800 mb-3">
          🤖 Smart Notification System
        </h3>
        <div className="space-y-2 text-sm text-purple-700">
          <div>
            • <strong>Schedule Aware:</strong> Only sends notifications during
            breaks and non-work hours
          </div>
          <div>
            • <strong>Smart Timing:</strong> Prevents notification spam with
            minimum 30-minute intervals
          </div>
          <div>
            • <strong>Weekend Friendly:</strong> Always allows notifications on
            weekends
          </div>
          <div>
            • <strong>Customizable:</strong> Set your own work hours and break
            times
          </div>
          <div>
            • <strong>Permission Based:</strong> Respects browser notification
            settings
          </div>
        </div>
      </div>
    </div>
  );
}
