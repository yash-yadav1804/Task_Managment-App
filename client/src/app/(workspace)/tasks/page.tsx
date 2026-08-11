'use client';

import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import { useTasks } from '../../hooks/useTasks';
import { TaskList } from '../../components/tasks/TaskList';
import { CreateTaskModal } from '../../components/tasks/CreateTaskModal';
import { Button } from '../../components/ui/Button';
import { Plus, Filter, ArrowUpDown } from 'lucide-react';

export default function TasksPage() {
  const { tasks, isLoading } = useTasks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const toolbar = (
    <>
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
        <div className="max-w-7xl mx-auto bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-muted)]/50">
            <h2 className="font-semibold text-lg">All Tasks</h2>
            <div className="text-sm text-[var(--muted)]">
              {tasks?.length || 0} tasks
            </div>
          </div>
          <TaskList tasks={tasks} isLoading={isLoading} />
        </div>
      </div>

      <CreateTaskModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        // using a placeholder project id until we have a real one from the server seeding
        defaultProjectId="some-project-id"
      />
    </div>
  );
}
