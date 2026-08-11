import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { labelsService } from '../services/labels.service';

export function useLabels() {
  const queryClient = useQueryClient();

  const { data: labels, isLoading, error } = useQuery({
    queryKey: ['labels'],
    queryFn: labelsService.getLabels,
  });

  const createLabel = useMutation({
    mutationFn: ({ name, color }: { name: string; color: string }) => labelsService.createLabel(name, color),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['labels'] });
    },
  });

  const assignToTask = useMutation({
    mutationFn: ({ taskId, labelId }: { taskId: string; labelId: string }) => labelsService.assignToTask(taskId, labelId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['task', variables.taskId] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const removeFromTask = useMutation({
    mutationFn: ({ taskId, labelId }: { taskId: string; labelId: string }) => labelsService.removeFromTask(taskId, labelId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['task', variables.taskId] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    labels: labels || [],
    isLoading,
    error,
    createLabel: createLabel.mutateAsync,
    isCreating: createLabel.isPending,
    assignToTask: assignToTask.mutateAsync,
    isAssigning: assignToTask.isPending,
    removeFromTask: removeFromTask.mutateAsync,
    isRemoving: removeFromTask.isPending,
  };
}
