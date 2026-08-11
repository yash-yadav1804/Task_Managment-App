'use client';

import TopBar from '../../components/layout/TopBar';
import { useTasks } from '../../hooks/useTasks';
import { useProjects } from '../../hooks/useProjects';
import { TaskList } from '../../components/tasks/TaskList';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, Clock, Activity, LayoutGrid } from 'lucide-react';

export default function DashboardPage() {
  const { tasks, isLoading: tasksLoading } = useTasks();
  const { projects, isLoading: projectsLoading } = useProjects();

  const completedTasks = tasks?.filter(t => t.status === 'COMPLETED') || [];
  const activeTasks = tasks?.filter(t => t.status !== 'COMPLETED' && t.status !== 'BACKLOG') || [];
  const urgentTasks = tasks?.filter(t => t.priority === 'URGENT' || t.priority === 'HIGH') || [];

  return (
    <div className="flex flex-col h-full bg-[var(--bg-outer)]">
      <TopBar title="Dashboard" />
      
      <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-[var(--muted)]">Total Projects</h3>
                <LayoutGrid className="w-4 h-4 text-[var(--muted)]" />
              </div>
              <div className="text-2xl font-bold">{projectsLoading ? '-' : projects?.length || 0}</div>
            </div>
            
            <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-[var(--muted)]">Active Tasks</h3>
                <Activity className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold">{tasksLoading ? '-' : activeTasks.length}</div>
            </div>
            
            <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-[var(--muted)]">Urgent Tasks</h3>
                <Clock className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-2xl font-bold">{tasksLoading ? '-' : urgentTasks.length}</div>
            </div>
            
            <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-[var(--muted)]">Completed</h3>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-bold">{tasksLoading ? '-' : completedTasks.length}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-muted)]/50">
                <h2 className="font-semibold">Recent Tasks</h2>
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/tasks'}>View All</Button>
              </div>
              <div className="flex-1">
                <TaskList tasks={tasks?.slice(0, 5) || []} isLoading={tasksLoading} />
              </div>
            </div>
            
            <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-muted)]/50">
                <h2 className="font-semibold">Active Projects</h2>
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/projects'}>View All</Button>
              </div>
              <div className="p-4 space-y-4">
                {projectsLoading ? (
                  <p className="text-sm text-[var(--muted)]">Loading...</p>
                ) : !projects?.length ? (
                  <p className="text-sm text-[var(--muted)]">No active projects.</p>
                ) : (
                  projects.slice(0, 4).map(project => (
                    <div key={project.id} className="flex justify-between items-center border-b border-[var(--border)] pb-3 last:border-0 last:pb-0">
                      <div>
                        <h4 className="font-medium text-sm text-[var(--fg)]">{project.name}</h4>
                        <p className="text-xs text-[var(--muted)] mt-1">{project._count?.tasks || 0} tasks</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
