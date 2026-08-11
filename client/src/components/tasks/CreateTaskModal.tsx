import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Modal } from "../ui/Modal"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"
import { Button } from "../ui/Button"
import { useTasks } from "../../hooks/useTasks"
import { useProjects } from "../../hooks/useProjects"
import { PRIORITY_CONFIG } from "../../constants"

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(['NO_PRIORITY', 'LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  projectId: z.string().min(1, "Project is required"),
})

type TaskFormValues = z.infer<typeof taskSchema>

export interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectId?: string; 
}

export function CreateTaskModal({ isOpen, onClose, defaultProjectId = '' }: CreateTaskModalProps) {
  const { createTask, isCreating } = useTasks();
  const { projects } = useProjects();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: 'NO_PRIORITY',
      projectId: defaultProjectId,
    }
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      await createTask({
        title: data.title,
        description: data.description,
        priority: data.priority,
        projectId: data.projectId,
      });
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Task Title</label>
          <Input 
            {...register("title")} 
            placeholder="What needs to be done?" 
            autoFocus 
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea 
            {...register("description")} 
            placeholder="Add details about this task..." 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project</label>
            <select 
              {...register("projectId")}
              className="flex h-9 w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
            >
              <option value="" disabled>Select a project</option>
              {projects?.map((p) => (
                <option key={p.id} value={p.id} className="bg-[var(--bg)] text-[var(--fg)]">
                  {p.name}
                </option>
              ))}
            </select>
            {errors.projectId && <p className="text-red-500 text-xs">{errors.projectId.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <select 
              {...register("priority")}
              className="flex h-9 w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
            >
              {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
                <option key={key} value={key} className="bg-[var(--bg)] text-[var(--fg)]">
                  {config.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Task"}
          </Button>
        </div>
        
      </form>
    </Modal>
  );
}
