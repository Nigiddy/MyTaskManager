import { MoreHorizontal, Plus, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Task = {
  id: number;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  progress: number;
};

export function MyTasks() {
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Complete WiFi Billing System MVP',
      category: 'Projects',
      priority: 'High',
      progress: 75,
    },
    {
      id: 2,
      title: 'Python Data Structures Mastery',
      category: 'Learning',
      priority: 'Medium',
      progress: 60,
    },
    {
      id: 3,
      title: 'Dem Man Brand Strategy Session',
      category: 'Business',
      priority: 'High',
      progress: 40,
    },
    {
      id: 4,
      title: 'Portfolio Website Redesign',
      category: 'Design',
      priority: 'Medium',
      progress: 30,
    },
    {
      id: 5,
      title: 'Trading Strategy Optimization',
      category: 'Trading',
      priority: 'Low',
      progress: 85,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Projects':
        return '💻';
      case 'Learning':
        return '📚';
      case 'Business':
        return '🎯';
      case 'Design':
        return '🎨';
      case 'Trading':
        return '📈';
      default:
        return '📋';
    }
  };

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">MY FOCUS AREAS</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-[#FF9F43] hover:bg-[#FFE8D6]"
        >
          <Plus size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            className="p-3 bg-white rounded-lg border border-[#FFE8D6] hover:border-[#FF9F43] transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <span className="text-lg mr-2">
                  {getCategoryIcon(task.category)}
                </span>
                <span className="text-sm font-medium text-[#333]">
                  {task.title}
                </span>
              </div>
              <Badge
                variant="outline"
                className={`text-xs ${getPriorityColor(task.priority)}`}
              >
                {task.priority}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#666]">{task.category}</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-[#FFE8D6] rounded-full h-2">
                  <div
                    className="bg-[#FF9F43] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-[#FF9F43]">
                  {task.progress}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFF1E6] rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#666]">Weekly Goal</span>
          <span className="font-bold text-[#FF9F43]">
            Build • Learn • Scale
          </span>
        </div>
      </div>
    </div>
  );
}
