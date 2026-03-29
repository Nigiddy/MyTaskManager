/**
 * types/index.ts
 * Centralised TypeScript types for the entire app.
 * Import from here rather than defining types inline in components.
 */

// ─── Task List ────────────────────────────────────────────────────────────────

export type Priority = 'Low' | 'Medium' | 'High';

export type Task = {
  id: number;
  name: string;
  time?: string;
  priority: Priority;
  category: string;
  icon: React.ElementType;
  completed: boolean;
};

// ─── Habit Streaks ────────────────────────────────────────────────────────────

export type HabitCategory = 'Fitness' | 'Productivity' | 'Learning' | 'Business';

export type Habit = {
  id: number;
  name: string;
  icon: string;
  currentStreak: number;
  longestStreak: number;
  completedToday: boolean;
  category: HabitCategory;
};

// ─── Micro-Wins ───────────────────────────────────────────────────────────────

export type WinImpact = 'low' | 'medium' | 'high';

export type MicroWin = {
  id: number;
  title: string;
  description: string;
  category: string;
  impact: WinImpact;
  completedAt: Date;
  tags: string[];
};

// ─── Today's Wins ─────────────────────────────────────────────────────────────

export type TodayWinImpact = 'High' | 'Medium' | 'Low';

export type Win = {
  id: number;
  title: string;
  description: string;
  category: string;
  impact: TodayWinImpact;
  timeSpent: string;
  celebration: string;
};

// ─── Data Input ───────────────────────────────────────────────────────────────

export type DataFieldType = 'text' | 'number' | 'select' | 'textarea' | 'date';

export type DataField = {
  id: string;
  label: string;
  type: DataFieldType;
  placeholder: string;
  options?: string[];
  required: boolean;
};

export type DataSection = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  fields: DataField[];
};

export type DataEntry = {
  id: number;
  sectionId: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

// ─── Pomodoro Timer ───────────────────────────────────────────────────────────

export type TimerMode = 'work' | 'shortBreak' | 'longBreak';
export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
}

// ─── Performance Analytics ────────────────────────────────────────────────────

export type ProductivityData = {
  hour: number;
  focusScore: number;
  tasksCompleted: number;
  deepWorkMinutes: number;
};

export type WeeklyMetric = {
  week: string;
  productivity: number;
  focusTime: number;
  tasksCompleted: number;
  habitsMaintained: number;
};

export type FocusSession = {
  id: number;
  startTime: string;
  duration: number;
  task: string;
  focusScore: number;
  interruptions: number;
};

// ─── Learning Progress ────────────────────────────────────────────────────────

export type SkillCategory = 'Python' | 'Full-Stack' | 'Design' | 'Business';

export type Skill = {
  id: number;
  name: string;
  level: number;
  maxLevel: number;
  category: SkillCategory;
  description: string;
  projects: number;
  lastPracticed: string;
};

export type ProjectStatus = 'Completed' | 'In Progress' | 'Planned';

export type Project = {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  status: ProjectStatus;
  progress: number;
  githubUrl?: string;
  liveUrl?: string;
  category: string;
};

export type ResourceType = 'Course' | 'Tutorial' | 'Documentation' | 'Challenge';
export type ResourceDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type LearningResource = {
  id: number;
  title: string;
  type: ResourceType;
  url: string;
  difficulty: ResourceDifficulty;
  estimatedTime: string;
  completed: boolean;
};

// ─── Life Reminders ───────────────────────────────────────────────────────────

export interface LifeReminder {
  id: string;
  text: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

// ─── Work Schedule ────────────────────────────────────────────────────────────

export interface TimeSlot {
  start: string;
  end: string;
  label: string;
}

export interface WorkSchedule {
  workHours: TimeSlot[];
  breaks: TimeSlot[];
  isEnabled: boolean;
}

// ─── Quick Actions / Voice Notes ─────────────────────────────────────────────

export type VoiceNote = {
  id: number;
  text: string;
  timestamp: Date;
  category: string;
  completed: boolean;
};

export type QuickActionCategory = 'Task' | 'Timer' | 'Habit' | 'Business';

export type QuickAction = {
  id: number;
  name: string;
  icon: string;
  action: string;
  category: QuickActionCategory;
  shortcut?: string;
};
