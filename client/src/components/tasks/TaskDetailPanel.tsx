import * as React from "react"
import { X, Calendar, User as UserIcon, Tag, AlignLeft } from "lucide-react"
import { Task, tasksService } from "../../services/tasks.service"
import { useQuery } from "@tanstack/react-query"
import { useTasks } from "../../hooks/useTasks"
import { useComments } from "../../hooks/useComments"
import { useLabels } from "../../hooks/useLabels"
import { useUsers } from "../../hooks/useUsers"
import { STATUS_CONFIG, PRIORITY_CONFIG } from "../../constants"
import { Avatar } from "../ui/Avatar"
import { Button } from "../ui/Button"
import { LabelBadge } from "../ui/LabelBadge"

export interface TaskDetailPanelProps {
  taskId: string | null;
  onClose: () => void;
}

export function TaskDetailPanel({ taskId, onClose }: TaskDetailPanelProps) {
  const { updateTask, addMember, removeMember, createTask } = useTasks();
  const { createComment, isCreating: isCreatingComment, deleteComment, isDeleting: isDeletingComment } = useComments();
  const { labels, assignToTask, removeFromTask, createLabel } = useLabels();
  const { users } = useUsers();
  const [newComment, setNewComment] = React.useState("");

  const handleAddComment = async () => {
    if (!taskId || !newComment.trim()) return;
    try {
      await createComment({ taskId, content: newComment.trim() });
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

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
                  <div className="space-y-6 col-span-2">
                    <div className="flex items-start gap-3">
                      <Tag className="w-5 h-5 text-[var(--muted)] mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium mb-2">Labels</h3>
                        <div className="flex flex-wrap gap-2 items-center">
                          {task.TaskLabel?.map(tl => (
                            <LabelBadge 
                              key={tl.Label.id} 
                              label={tl.Label} 
                              onRemove={() => removeFromTask({ taskId: task.id, labelId: tl.Label.id })}
                            />
                          ))}
                          <select 
                            className="text-xs bg-[var(--bg-muted)] border border-[var(--border)] rounded px-2 py-1 outline-none text-[var(--muted)] hover:text-[var(--fg)] cursor-pointer"
                            onChange={async (e) => {
                              if (e.target.value === "CREATE_NEW") {
                                const name = window.prompt("Enter new label name:");
                                if (name) {
                                  // Random color selection for simplicity
                                  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"];
                                  const color = colors[Math.floor(Math.random() * colors.length)];
                                  const newLabel = await createLabel({ name, color });
                                  if (newLabel) {
                                    assignToTask({ taskId: task.id, labelId: newLabel.id });
                                  }
                                }
                              } else if (e.target.value) {
                                assignToTask({ taskId: task.id, labelId: e.target.value });
                              }
                              e.target.value = ""; // reset
                            }}
                            defaultValue=""
                          >
                            <option value="" disabled>+ Add Label</option>
                            {labels.map(l => (
                              <option key={l.id} value={l.id}>{l.name}</option>
                            ))}
                            <option value="CREATE_NEW" className="font-bold border-t border-[var(--border)] text-[var(--accent)]">+ Create new label</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <AlignLeft className="w-5 h-5 text-[var(--muted)] mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium mb-2">Description</h3>
                        <p className="text-sm text-[var(--fg)] whitespace-pre-wrap">
                          {task.description || "No description provided."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center mt-0.5 text-[var(--muted)] border border-current rounded-sm">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium mb-2">Subtasks</h3>
                        {task.subtasks && task.subtasks.length > 0 ? (
                          <div className="space-y-2 mb-3">
                            {task.subtasks.map(sub => (
                              <div key={sub.id} className="flex items-center gap-3 p-2 border border-[var(--border)] rounded-md hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                                <input type="checkbox" checked={sub.status === 'COMPLETED'} readOnly className="w-4 h-4 rounded border-[var(--border)]" />
                                <span className={sub.status === 'COMPLETED' ? "line-through text-[var(--muted)]" : ""}>{sub.title}</span>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => {
                            const title = window.prompt("Subtask title:");
                            if (title) {
                              createTask({ title, parentTaskId: task.id, projectId: task.projectId });
                            }
                          }}
                        >
                          + Add Subtask
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[var(--bg-muted)]/30 rounded-lg p-4 border border-[var(--border)] space-y-4">
                    <div>
                      <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2">Status</h4>
                      <select
                        value={task.status}
                        onChange={(e) => updateTask({ id: task.id, data: { status: e.target.value as any } })}
                        className="flex h-8 w-full items-center justify-between rounded-md border border-[var(--border)] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                      >
                        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                          <option key={key} value={key} className="bg-[var(--bg)] text-[var(--fg)]">
                            {config.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2">Priority</h4>
                      <select
                        value={task.priority}
                        onChange={(e) => updateTask({ id: task.id, data: { priority: e.target.value as any } })}
                        className="flex h-8 w-full items-center justify-between rounded-md border border-[var(--border)] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                      >
                        {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
                          <option key={key} value={key} className="bg-[var(--bg)] text-[var(--fg)]">
                            {config.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-2">Assignees</h4>
                      <div className="flex flex-wrap items-center gap-2">
                        {task.TaskMember && task.TaskMember.length > 0 ? (
                          task.TaskMember.map(member => (
                            <div key={member.user?.id || member.User?.id} className="relative group flex items-center">
                              <Avatar size="sm" initials={member.user?.name || member.User?.name} title={member.user?.name || member.User?.name} />
                              <button 
                                onClick={() => removeMember({ taskId: task.id, userId: member.user?.id || member.User?.id })}
                                className="absolute -top-1 -right-1 bg-[var(--bg)] rounded-full text-[var(--muted)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity border border-[var(--border)]"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-[var(--muted)]">Unassigned</span>
                        )}
                        <select
                          className="text-xs bg-[var(--bg-muted)] border border-[var(--border)] rounded px-1.5 py-1 outline-none text-[var(--muted)] hover:text-[var(--fg)] cursor-pointer h-7"
                          onChange={(e) => {
                            if (e.target.value) addMember({ taskId: task.id, userId: e.target.value });
                            e.target.value = ""; // reset
                          }}
                          defaultValue=""
                        >
                          <option value="" disabled>+</option>
                          {users.map(u => (
                            <option key={u.id} value={u.id}>{u.name}</option>
                          ))}
                        </select>
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
                  
                  <div className="mb-6 flex gap-3">
                    <Avatar size="sm" initials="Me" />
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full min-h-[80px] rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                      />
                      <div className="mt-2 flex justify-end">
                        <Button 
                          size="sm" 
                          onClick={handleAddComment} 
                          disabled={!newComment.trim() || isCreatingComment}
                        >
                          {isCreatingComment ? "Posting..." : "Post Comment"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {(task.comments?.length || 0) > 0 || (task.Activity?.length || 0) > 0 ? (
                    <div className="space-y-4">
                      {[
                        ...(task.comments || []).map((c: any) => ({ ...c, isActivity: false })),
                        ...(task.Activity || []).map((a: any) => ({ ...a, isActivity: true }))
                      ]
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map(item => (
                          <div key={item.id + (item.isActivity ? '-a' : '-c')} className="flex gap-3 group">
                            <Avatar size="sm" initials={item.isActivity ? item.User?.name : item.author?.name} />
                            <div className="flex-1">
                              <div className="flex items-baseline justify-between mb-1">
                                <div className="flex items-baseline gap-2">
                                  <span className="font-medium text-sm">{item.isActivity ? item.User?.name : item.author?.name}</span>
                                  <span className="text-xs text-[var(--muted)]">{new Date(item.createdAt).toLocaleString()}</span>
                                </div>
                                {!item.isActivity && (
                                  <button 
                                    onClick={() => deleteComment({ id: item.id, taskId: task.id })}
                                    disabled={isDeletingComment}
                                    className="opacity-0 group-hover:opacity-100 text-[var(--muted)] hover:text-red-500 transition-opacity"
                                    title="Delete comment"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              {item.isActivity ? (
                                <p className="text-sm text-[var(--muted)]">
                                  {item.type === 'STATUS_CHANGED' && `changed status from ${item.payload?.from} to ${item.payload?.to}`}
                                  {item.type === 'PRIORITY_CHANGED' && `changed priority from ${item.payload?.from} to ${item.payload?.to}`}
                                  {item.type === 'TASK_CREATED' && `created this task`}
                                </p>
                              ) : (
                                <p className="text-sm whitespace-pre-wrap">{item.content}</p>
                              )}
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
