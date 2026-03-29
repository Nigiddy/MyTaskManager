import type { Project } from '@/types';

export async function getProjects(): Promise<Project[]> {
  // TODO: replace with real API call e.g. fetch('/api/projects')
  return [];
}

export async function getProjectById(id: number): Promise<Project | null> {
  // TODO: replace with real API call e.g. fetch(`/api/projects/${id}`)
  return null;
}

