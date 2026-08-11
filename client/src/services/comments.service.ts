import { api } from '../lib/api';

export interface Comment {
  id: string;
  content: string;
  taskId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: any;
}

export const commentsService = {
  async createComment(taskId: string, content: string): Promise<Comment> {
    const { data } = await api.post('/comments', { taskId, content });
    return data;
  },

  async deleteComment(id: string): Promise<{ success: boolean }> {
    const { data } = await api.delete(`/comments/${id}`);
    return data;
  }
};
