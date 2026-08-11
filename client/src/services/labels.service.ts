import { api } from '../lib/api';

export interface Label {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export const labelsService = {
  async getLabels(): Promise<Label[]> {
    const { data } = await api.get('/labels');
    return data;
  },

  async createLabel(name: string, color: string): Promise<Label> {
    const { data } = await api.post('/labels', { name, color });
    return data;
  },

  async assignToTask(taskId: string, labelId: string): Promise<void> {
    await api.post(`/labels/task/${taskId}`, { labelId });
  },

  async removeFromTask(taskId: string, labelId: string): Promise<void> {
    await api.delete(`/labels/task/${taskId}/${labelId}`);
  }
};
