import type { Priority, Task } from '@/types';

const NullTaskIcon: Task['icon'] = () => null;

export type CreateTaskInput = {
  name: string;
  time?: string;
  priority: Priority;
  category: string;
};

export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'icon'>> & {
  // Allow updating the icon later, but default to a null icon for now.
  icon?: Task['icon'];
};

export async function getTasks(): Promise<Task[]> {
  // TODO: replace with real API call e.g. fetch('/api/tasks')
  return [];
}

export async function getTaskById(id: number): Promise<Task | null> {
  // TODO: replace with real API call e.g. fetch(`/api/tasks/${id}`)
  return null;
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  // TODO: replace with real API call e.g. fetch('/api/tasks', { method: 'POST' })
  // Minimal realistic behavior until backend exists.
  const id = Date.now();
  return {
    id,
    name: input.name,
    time: input.time,
    priority: input.priority,
    category: input.category,
    icon: NullTaskIcon,
    completed: false,
  };
}

export async function updateTask(
  id: number,
  updates: UpdateTaskInput
): Promise<Task | null> {
  // TODO: replace with real API call e.g. fetch(`/api/tasks/${id}`, { method: 'PATCH' })
  if (!id) return null;

  return {
    id,
    name: updates.name ?? '',
    time: updates.time,
    priority: updates.priority ?? 'Low',
    category: updates.category ?? '',
    // If caller doesn't provide an icon yet, keep rendering safe.
    icon: updates.icon ?? NullTaskIcon,
    completed: updates.completed ?? false,
  };
}

export async function deleteTask(id: number): Promise<boolean> {
  // TODO: replace with real API call e.g. fetch(`/api/tasks/${id}`, { method: 'DELETE' })
  return Boolean(id);
}

