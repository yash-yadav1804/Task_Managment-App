'use client';

import { useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import { useTasks } from '@/hooks/useTasks';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskBoard } from '@/components/tasks/TaskBoard';
import { CreateTaskModal } from '@/components/tasks/CreateTaskModal';
import { TaskDetailPanel } from '@/components/tasks/TaskDetailPanel';
import { Button } from '@/components/ui/Button';
import { Plus, Filter, ArrowUpDown, LayoutList, LayoutGrid } from 'lucide-react';

export default function TasksPage() {
  const { tasks, isLoading } = useTasks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');

  const toolbar = (
    <>
      <div className="hidden sm:flex items-center border border-[var(--border)] rounded-md p-0.5 bg-[var(--bg-muted)] mr-2">
        <button 
          onClick={() => setViewMode('list')}
          className={`p-1 rounded ${viewMode === 'list' ? 'bg-[var(--bg)] shadow-sm text-[var(--fg)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'}`}
        >
          <LayoutList className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setViewMode('board')}
          className={`p-1 rounded ${viewMode === 'board' ? 'bg-[var(--bg)] shadow-sm text-[var(--fg)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'}`}
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
      </div>
      <Button variant="ghost" size="sm" className="hidden sm:flex gap-2 text-[var(--muted)] hover:text-[var(--fg)]">
        <Filter className="w-4 h-4" />
        Filter
      </Button>
      <Button variant="ghost" size="sm" className="hidden sm:flex gap-2 text-[var(--muted)] hover:text-[var(--fg)]">
        <ArrowUpDown className="w-4 h-4" />
        Sort
      </Button>
      <Button size="sm" className="gap-2 ml-2" onClick={() => setIsCreateModalOpen(true)}>
        <Plus className="w-4 h-4" />
        New Task
      </Button>
    </>
  );

  return (
    <div className="flex flex-col h-full bg-[var(--bg-outer)]">
      <TopBar title="Tasks" toolbar={toolbar} />
      
      <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        {viewMode === 'list' ? (
          <div className="max-w-7xl mx-auto bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-muted)]/50">
              <h2 className="font-semibold text-lg">All Tasks</h2>
              <div className="text-sm text-[var(--muted)]">
                {tasks?.length || 0} tasks
              </div>
            </div>
            <TaskList tasks={tasks} isLoading={isLoading} onTaskClick={setSelectedTaskId} />
          </div>
        ) : (
          <div className="h-full">
            {isLoading ? (
              <div className="p-4 text-[var(--muted)]">Loading tasks...</div>
            ) : (
              <TaskBoard tasks={tasks} onTaskClick={setSelectedTaskId} />
            )}
          </div>
        )}
      </div>

      <CreateTaskModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
      
      <TaskDetailPanel
        taskId={selectedTaskId}
        onClose={() => setSelectedTaskId(null)}
      />
    </div>
  );
}
