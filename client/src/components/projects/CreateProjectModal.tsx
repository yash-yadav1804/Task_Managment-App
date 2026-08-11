import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Modal } from "../ui/Modal"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"
import { Button } from "../ui/Button"
import { useProjects } from "../../hooks/useProjects"
import { PRIORITY_CONFIG } from "../../constants"

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  priority: z.enum(['NO_PRIORITY', 'LOW', 'MEDIUM', 'HIGH', 'URGENT']),
})

type ProjectFormValues = z.infer<typeof projectSchema>

export interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const { createProject, isCreating } = useProjects();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      priority: 'NO_PRIORITY',
    }
  });

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      await createProject(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to create project", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Name</label>
          <Input 
            {...register("name")} 
            placeholder="E.g., Q3 Marketing Campaign" 
            autoFocus 
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea 
            {...register("description")} 
            placeholder="Add details about this project..." 
          />
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

        <div className="pt-4 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Project"}
          </Button>
        </div>
        
      </form>
    </Modal>
  );
}
