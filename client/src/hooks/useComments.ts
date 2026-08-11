import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsService } from '../services/comments.service';

export function useComments() {
  const queryClient = useQueryClient();

  const createComment = useMutation({
    mutationFn: ({ taskId, content }: { taskId: string, content: string }) => commentsService.createComment(taskId, content),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['task', data.taskId] });
    },
  });

  const deleteComment = useMutation({
    mutationFn: ({ id, taskId }: { id: string, taskId: string }) => commentsService.deleteComment(id).then(res => ({ ...res, taskId })),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['task', data.taskId] });
    },
  });

  return {
    createComment: createComment.mutateAsync,
    isCreating: createComment.isPending,
    deleteComment: deleteComment.mutateAsync,
    isDeleting: deleteComment.isPending,
  };
}
