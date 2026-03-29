/**
 * components/features/LearningProgress.tsx
 * Renders skills, projects, and learning resources sections.
 * Contains static display data — no mutable state needed.
 */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Code, Palette, Target, Trophy, ExternalLink, Play, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Skill, Project, LearningResource } from '@/types';
import { getProjects } from '@/lib/api/projects';

const categoryIcon: Record<string, React.ElementType> = { Python: Code, 'Full-Stack': Code, Design: Palette, Business: Target };
const categoryColor: Record<string, string> = { Python: 'bg-blue-50 text-blue-700 border-blue-200', 'Full-Stack': 'bg-green-50 text-green-700 border-green-200', Design: 'bg-pink-50 text-pink-700 border-pink-200', Business: 'bg-orange-50 text-orange-700 border-orange-200' };
const statusColor: Record<string, string> = { Completed: 'bg-green-50 text-green-700 border-green-200', 'In Progress': 'bg-blue-50 text-blue-700 border-blue-200', Planned: 'bg-gray-50 text-gray-700 border-gray-200' };
const difficultyColor: Record<string, string> = { Beginner: 'bg-green-50 text-green-700 border-green-200', Intermediate: 'bg-yellow-50 text-yellow-700 border-yellow-200', Advanced: 'bg-red-50 text-red-700 border-red-200' };
const typeIcon: Record<string, React.ElementType> = { Course: Play, Tutorial: BookOpen, Documentation: Target, Challenge: Trophy };

export function LearningProgress() {
  const [activeTab, setActiveTab] = useState<'skills' | 'projects' | 'resources'>('skills');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skills] = useState<Skill[]>([]);
  const [resources] = useState<LearningResource[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProjects();
        if (cancelled) return;
        setProjects(data);
      } catch {
        if (cancelled) return;
        setError('Failed to load projects.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const avgSkillLevel = useMemo(() => {
    if (skills.length === 0) return 0;
    return Math.round(
      skills.reduce((s, sk) => s + (sk.level / sk.maxLevel) * 100, 0) /
        skills.length
    );
  }, [skills]);

  return (
    <div className="bg-[#FFF8F3] rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen size={20} className="text-[#FF9F43]" />
          <h2 className="font-semibold text-lg text-[#333]">LEARNING PROGRESS</h2>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
          {avgSkillLevel}% avg level
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Skills Tracked', value: skills.length },
          { label: 'Active Projects', value: projects.filter(p => p.status === 'In Progress').length },
          { label: 'Resources', value: resources.length },
        ].map(s => (
          <div key={s.label} className="p-2 bg-white rounded-lg border border-[#FFE8D6] text-center">
            <div className="text-lg font-bold text-[#333]">{s.value}</div>
            <div className="text-xs text-[#666]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex space-x-2 mb-4">
        {(['skills', 'projects', 'resources'] as const).map(tab => (
          <Button key={tab} variant={activeTab === tab ? 'default' : 'outline'} size="sm"
            className={`text-xs h-8 px-3 ${activeTab === tab ? 'bg-[#FF9F43]' : 'border-[#FFE8D6] text-[#666]'}`}
            onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {activeTab === 'skills' && (
        <div className="space-y-3">
          {skills.length === 0 && (
            <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-sm text-[#666]">
              No skills tracked yet.
            </div>
          )}
          {skills.map(skill => {
            const Icon = categoryIcon[skill.category] ?? Code;
            return (
              <div key={skill.id} className="p-3 bg-white rounded-lg border border-[#FFE8D6] hover:border-[#FF9F43] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon size={16} className="text-[#FF9F43]" />
                    <span className="text-sm font-medium text-[#333]">{skill.name}</span>
                  </div>
                  <Badge variant="outline" className={`text-xs ${categoryColor[skill.category]}`}>{skill.category}</Badge>
                </div>
                <Progress value={(skill.level / skill.maxLevel) * 100} className="h-2 bg-[#FFE8D6] mb-2" />
                <div className="flex items-center justify-between text-xs text-[#666]">
                  <span>Level {skill.level}/{skill.maxLevel} • {skill.projects} projects</span>
                  <span>Last: {skill.lastPracticed}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-3">
          {isLoading && (
            <div className="p-3 bg-white rounded-lg border border-[#FFE8D6]">
              <div className="h-4 w-48 bg-[#FFE8D6] rounded mb-2" />
              <div className="h-3 w-32 bg-[#FFE8D6] rounded" />
            </div>
          )}
          {!isLoading && error && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}
          {!isLoading && !error && projects.length === 0 && (
            <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-sm text-[#666]">
              No projects yet.
            </div>
          )}
          {!isLoading && !error && projects.map(project => (
            <div key={project.id} className="p-3 bg-white rounded-lg border border-[#FFE8D6] hover:border-[#FF9F43] transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[#333]">{project.name}</span>
                <Badge variant="outline" className={`text-xs ${statusColor[project.status]}`}>{project.status}</Badge>
              </div>
              <p className="text-xs text-[#666] mb-2">{project.description}</p>
              <Progress value={project.progress} className="h-2 bg-[#FFE8D6] mb-2" />
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">{tech}</span>
                  ))}
                </div>
                <span className="text-xs font-medium text-[#FF9F43]">{project.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="space-y-3">
          {resources.length === 0 && (
            <div className="p-3 bg-white rounded-lg border border-[#FFE8D6] text-sm text-[#666]">
              No learning resources yet.
            </div>
          )}
          {resources.map(resource => {
            const Icon = typeIcon[resource.type] ?? BookOpen;
            return (
              <div key={resource.id} className={`p-3 rounded-lg border transition-all ${resource.completed ? 'bg-green-50 border-green-200' : 'bg-white border-[#FFE8D6] hover:border-[#FF9F43]'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {resource.completed ? <CheckCircle size={16} className="text-green-600" /> : <Icon size={16} className="text-[#FF9F43]" />}
                    <span className="text-sm font-medium text-[#333]">{resource.title}</span>
                  </div>
                  <Badge variant="outline" className={`text-xs ${difficultyColor[resource.difficulty]}`}>{resource.difficulty}</Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-[#666]">
                  <div className="flex items-center space-x-2">
                    <span>{resource.type}</span>
                    <Clock size={10} />
                    <span>{resource.estimatedTime}</span>
                  </div>
                  <a href={resource.url} className="text-[#FF9F43] hover:underline flex items-center">
                    <ExternalLink size={12} className="mr-1" />Open
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
