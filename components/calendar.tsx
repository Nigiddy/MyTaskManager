import {
  MoreHorizontal,
  Calendar as CalendarIcon,
  Clock,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Event = {
  id: number;
  title: string;
  time: string;
  endTime: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
};

export function Calendar() {
  const events: Event[] = [
    {
      id: 1,
      title: 'Morning Workout & Meditation',
      time: '4:00',
      endTime: '5:30',
      category: 'Fitness',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Full-Stack Development',
      time: '6:00',
      endTime: '9:00',
      category: 'Coding',
      priority: 'High',
    },
    {
      id: 3,
      title: 'Python Learning Session',
      time: '9:30',
      endTime: '11:00',
      category: 'Learning',
      priority: 'Medium',
    },
    {
      id: 4,
      title: 'WiFi Billing System Dev',
      time: '11:30',
      endTime: '14:00',
      category: 'Projects',
      priority: 'High',
    },
    {
      id: 5,
      title: 'Cybercafé Sales Outreach',
      time: '14:30',
      endTime: '16:00',
      category: 'Business',
      priority: 'Medium',
    },
    {
      id: 6,
      title: 'Discord Community Outreach',
      time: '16:30',
      endTime: '18:00',
      category: 'Business',
      priority: 'Medium',
    },
    {
      id: 7,
      title: 'UI/UX Design Work',
      time: '18:30',
      endTime: '20:00',
      category: 'Design',
      priority: 'Low',
    },
    {
      id: 8,
      title: 'Trading Review & Analysis',
      time: '20:30',
      endTime: '21:30',
      category: 'Trading',
      priority: 'Medium',
    },
    {
      id: 9,
      title: 'Business Strategy Session',
      time: '22:00',
      endTime: '23:00',
      category: 'Business',
      priority: 'High',
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fitness':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Coding':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Learning':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Projects':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Business':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Design':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'Trading':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return '🔥';
      case 'Medium':
        return '⚡';
      case 'Low':
        return '💡';
      default:
        return '📌';
    }
  };

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">TODAY'S SCHEDULE</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-[#FF9F43] hover:bg-[#FFE8D6]"
        >
          <CalendarIcon size={16} />
        </Button>
      </div>

      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="flex">
            <div className="text-xs text-[#666] w-20 pt-1">
              <div className="font-medium">{event.time}</div>
              <div className="text-[#999]">{event.endTime}</div>
            </div>
            <div className="flex-1 bg-white border border-[#FFE8D6] rounded-lg p-3 hover:border-[#FF9F43] transition-colors">
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-medium text-[#333]">
                  {event.title}
                </span>
                <span className="text-lg">
                  {getPriorityIcon(event.priority)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={`text-xs ${getCategoryColor(event.category)}`}
                >
                  {event.category}
                </Badge>
                <span className="text-xs text-[#666]">
                  {event.time} - {event.endTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-[#666]">
            <Clock size={14} className="mr-1" />
            <span>Daily Goal</span>
          </div>
          <span className="font-bold text-[#FF9F43]">
            Stay Focused • Execute • Win
          </span>
        </div>
      </div>
    </div>
  );
}
