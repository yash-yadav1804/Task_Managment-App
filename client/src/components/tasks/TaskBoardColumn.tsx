import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '../../services/tasks.service';
import { STATUS_CONFIG } from '../../constants';
import { TaskBoardCard } from './TaskBoardCard';
import { cn } from '../../lib/utils';

export function TaskBoardColumn({ status, tasks, onTaskClick }: { status: string, tasks: Task[], onTaskClick?: (taskId: string) => void }) {
  const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
  
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
      type: 'Column',
      status
    }
  });

  return (
    <div className="flex flex-col flex-shrink-0 w-80 bg-[var(--bg-muted)]/50 rounded-lg border border-[var(--border)] max-h-full">
      <div className="p-3 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg)] rounded-t-lg">
        <div className="flex items-center gap-2">
          <span className={cn("w-2 h-2 rounded-full", config?.color.split(' ')[0])} />
          <h3 className="font-semibold text-sm">{config?.label || status}</h3>
        </div>
        <span className="text-xs text-[var(--muted)] font-medium bg-[var(--bg-outer)] px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>
      
      <div 
        ref={setNodeRef}
        className={cn(
          "flex-1 p-2 overflow-y-auto space-y-2 transition-colors",
          isOver ? "bg-black/5 dark:bg-white/5" : ""
        )}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <TaskBoardCard key={task.id} task={task} onTaskClick={onTaskClick} />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className="h-20 border-2 border-dashed border-[var(--border)] rounded-lg flex items-center justify-center text-[var(--muted)] text-sm opacity-50">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}
