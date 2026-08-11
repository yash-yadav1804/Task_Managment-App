import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksService, Task } from '../services/tasks.service';

export function useTasks(params?: { search?: string, status?: string, projectId?: string }) {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ['tasks', params],
    queryFn: () => tasksService.getTasks(params),
  });

  const createTask = useMutation({
    mutationFn: tasksService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) => tasksService.updateTask(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', data.id] });
    },
  });

  const deleteTask = useMutation({
    mutationFn: tasksService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const addMember = useMutation({
    mutationFn: ({ taskId, userId }: { taskId: string, userId: string }) => tasksService.addMember(taskId, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['task', variables.taskId] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const removeMember = useMutation({
    mutationFn: ({ taskId, userId }: { taskId: string, userId: string }) => tasksService.removeMember(taskId, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['task', variables.taskId] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  return {
    tasks: tasksQuery.data || [],
    isLoading: tasksQuery.isLoading,
    error: tasksQuery.error,
    createTask: createTask.mutateAsync,
    isCreating: createTask.isPending,
    updateTask: updateTask.mutateAsync,
    isUpdating: updateTask.isPending,
    deleteTask: deleteTask.mutateAsync,
    isDeleting: deleteTask.isPending,
    addMember: addMember.mutateAsync,
    isAddingMember: addMember.isPending,
    removeMember: removeMember.mutateAsync,
    isRemovingMember: removeMember.isPending,
  };
}

export function useTask(id: string) {
  const queryClient = useQueryClient();

  const taskQuery = useQuery({
    queryKey: ['task', id],
    queryFn: () => tasksService.getTask(id),
    enabled: !!id,
  });

  return {
    task: taskQuery.data,
    isLoading: taskQuery.isLoading,
    error: taskQuery.error,
  };
}
