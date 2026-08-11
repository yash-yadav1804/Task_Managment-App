import * as React from "react"
import { X, Calendar, User as UserIcon, Tag, AlignLeft } from "lucide-react"
import { Task, tasksService } from "../../services/tasks.service"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { PriorityBadge } from "../ui/PriorityBadge"
import { StatusBadge } from "../ui/StatusBadge"
import { Avatar } from "../ui/Avatar"

export interface TaskDetailPanelProps {
  taskId: string | null;
  onClose: () => void;
}

export function TaskDetailPanel({ taskId, onClose }: TaskDetailPanelProps) {
  const { data: task, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => taskId ? tasksService.getTask(taskId) : null,
    enabled: !!taskId,
  });

  if (!taskId) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-[var(--bg)] border-l border-[var(--border)] shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {isLoading || !task ? (
          <div className="p-8 text-[var(--muted)]">Loading task details...</div>
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <span className="font-mono">#{task.id.substring(0, 8)}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={onClose}
                  className="rounded-full p-1.5 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--muted)]" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-8">
                <h1 className="text-2xl font-bold text-[var(--fg)] mb-6">{task.title}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="space-y-4 col-span-2">
                    <div className="flex items-start gap-3">
                      <AlignLeft className="w-5 h-5 text-[var(--muted)] mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium mb-2">Description</h3>
                        <p className="text-sm text-[var(--fg)] whitespace-pre-wrap">
                          {task.description || "No description provided."}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[var(--bg-muted)]/30 rounded-lg p-4 border border-[var(--border)] space-y-4">
                    <div>
                      <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2">Status</h4>
                      <StatusBadge status={task.status} />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2">Priority</h4>
                      <PriorityBadge priority={task.priority} />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2">Assignee</h4>
                      <div className="flex items-center gap-2">
                        {task.TaskMember && task.TaskMember.length > 0 ? (
                          task.TaskMember.map(member => (
                            <Avatar key={member.user.id} size="sm" initials={member.user.name} title={member.user.name} />
                          ))
                        ) : (
                          <span className="text-sm text-[var(--muted)]">Unassigned</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2">Due Date</h4>
                      <div className="flex items-center gap-2 text-sm text-[var(--fg)]">
                        <Calendar className="w-4 h-4 text-[var(--muted)]" />
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-[var(--border)] pt-8">
                  <h3 className="text-lg font-semibold mb-4">Activity</h3>
                  {task.comments && task.comments.length > 0 ? (
                    <div className="space-y-4">
                      {task.comments.map(comment => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar size="sm" initials={comment.author?.name} />
                          <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="font-medium text-sm">{comment.author?.name}</span>
                              <span className="text-xs text-[var(--muted)]">{new Date(comment.createdAt).toLocaleString()}</span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--muted)]">No activity yet.</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
