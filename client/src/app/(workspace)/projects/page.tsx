'use client';

import TopBar from '../../../components/layout/TopBar';
import { useProjects } from '../../../hooks/useProjects';
import { Button } from '../../../components/ui/Button';
import { Plus } from 'lucide-react';
import { PriorityBadge } from '../../../components/ui/PriorityBadge';
import { Avatar } from '../../../components/ui/Avatar';

export default function ProjectsPage() {
  const { projects, isLoading } = useProjects();

  const toolbar = (
    <Button size="sm" className="gap-2 ml-2">
      <Plus className="w-4 h-4" />
      New Project
    </Button>
  );

  return (
    <div className="flex flex-col h-full bg-[var(--bg-outer)]">
      <TopBar title="Projects" toolbar={toolbar} />
      
      <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="p-4 text-[var(--muted)]">Loading projects...</div>
          ) : !projects?.length ? (
            <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-12 text-center text-[var(--muted)] shadow-sm">
              <p>No projects found. Create one to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors line-clamp-1" title={project.name}>
                      {project.name}
                    </h3>
                    <PriorityBadge priority={project.priority} />
                  </div>
                  
                  <p className="text-sm text-[var(--muted)] line-clamp-2 mb-4 min-h-[40px]">
                    {project.description || "No description provided."}
                  </p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                    <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                      <span className="font-medium bg-black/5 dark:bg-white/10 px-2 py-1 rounded">
                        {project._count?.tasks || 0} tasks
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[var(--muted)]">Lead:</span>
                      <Avatar 
                        size="sm" 
                        initials={project.lead?.name || 'U'} 
                        title={project.lead?.name}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
