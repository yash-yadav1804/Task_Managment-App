import { Task } from '../../services/tasks.service';
import { PriorityBadge } from '../ui/PriorityBadge';
import { StatusBadge } from '../ui/StatusBadge';
import { Avatar } from '../ui/Avatar';

export function TaskList({ tasks, isLoading, onTaskClick }: { tasks: Task[], isLoading: boolean, onTaskClick?: (taskId: string) => void }) {
  if (isLoading) {
    return <div className="p-4 text-[var(--muted)]">Loading tasks...</div>;
  }

  if (!tasks?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[var(--muted)]">
        <p>No tasks found. Create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center px-4 py-2 border-b border-[var(--border)] text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
        <div className="w-16">ID</div>
        <div className="flex-1 min-w-[200px]">Title</div>
        <div className="w-32">Status</div>
        <div className="w-32">Priority</div>
        <div className="w-32">Assignees</div>
        <div className="w-32 text-right">Due Date</div>
      </div>
      
      <div className="flex flex-col">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            onClick={() => onTaskClick?.(task.id)}
            className="flex items-center px-4 py-3 border-b border-[var(--border)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div className="w-16 text-xs text-[var(--muted)] font-mono">
              #{task.id.substring(0, 4)}
            </div>
            
            <div className="flex-1 min-w-[200px] pr-4">
              <span className="text-sm font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                {task.title}
              </span>
            </div>
            
            <div className="w-32">
              <StatusBadge status={task.status} />
            </div>
            
            <div className="w-32">
              <PriorityBadge priority={task.priority} />
            </div>
            
            <div className="w-32 flex -space-x-2">
              {task.TaskMember?.length ? (
                task.TaskMember.slice(0, 3).map((member: any) => (
                  <Avatar 
                    key={member.user?.id}
                    size="sm"
                    initials={member.user?.name}
                    className="border-2 border-[var(--bg)]"
                  />
                ))
              ) : (
                <div className="text-xs text-[var(--muted)] italic">Unassigned</div>
              )}
              {task.TaskMember && task.TaskMember.length > 3 && (
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--border)] text-[10px] font-medium border-2 border-[var(--bg)] z-10">
                  +{task.TaskMember.length - 3}
                </div>
              )}
            </div>
            
            <div className="w-32 text-right text-xs text-[var(--muted)]">
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
