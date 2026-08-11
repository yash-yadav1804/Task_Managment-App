import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../services/tasks.service';
import { PriorityBadge } from '../ui/PriorityBadge';
import { Avatar } from '../ui/Avatar';
import { MessageSquare, Calendar } from 'lucide-react';

export function TaskBoardCard({ task, onTaskClick }: { task: Task, onTaskClick?: (taskId: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        className="h-24 bg-[var(--bg-outer)] border-2 border-dashed border-[var(--border)] rounded-md opacity-50" 
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onTaskClick?.(task.id)}
      className="bg-[var(--bg)] border border-[var(--border)] rounded-md p-3 shadow-sm hover:shadow transition-shadow cursor-grab active:cursor-grabbing group"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="text-[10px] font-mono text-[var(--muted)]">#{task.id.substring(0, 4)}</div>
        <PriorityBadge priority={task.priority} className="scale-90 origin-top-right" />
      </div>
      
      <h4 className="text-sm font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors mb-3 line-clamp-2 leading-snug">
        {task.title}
      </h4>
      
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--border)]">
        <div className="flex items-center gap-3">
          {task.comments && task.comments.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-[var(--muted)]" title="Comments">
              <MessageSquare className="w-3 h-3" />
              <span>{task.comments.length}</span>
            </div>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-[var(--muted)]" title="Due Date">
              <Calendar className="w-3 h-3" />
              <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
          )}
        </div>
        
        <div className="flex -space-x-1.5">
          {task.TaskMember?.length ? (
            task.TaskMember.slice(0, 2).map((member: any) => (
              <Avatar 
                key={member.user?.id}
                size="sm"
                initials={member.user?.name}
                className="w-5 h-5 text-[9px] border border-[var(--bg)]"
              />
            ))
          ) : null}
          {task.TaskMember && task.TaskMember.length > 2 && (
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--border)] text-[8px] font-medium border border-[var(--bg)] z-10">
              +{task.TaskMember.length - 2}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
