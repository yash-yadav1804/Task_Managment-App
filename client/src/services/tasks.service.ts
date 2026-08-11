import { api } from '../lib/api';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'BACKLOG' | 'TODO' | 'DOING' | 'COMPLETED' | 'ON_HOLD';
  priority: 'NO_PRIORITY' | 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  projectId: string;
  reporterId: string;
  parentTaskId?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  reporter?: any;
  TaskMember?: any[];
  TaskLabel?: any[];
  comments?: any[];
  Activity?: any[];
  subtasks?: Task[];
}

export const tasksService = {
  async getTasks(params?: { search?: string, status?: string, projectId?: string }): Promise<Task[]> {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.status) query.append('status', params.status);
    if (params?.projectId) query.append('projectId', params.projectId);
    
    const queryString = query.toString();
    const url = queryString ? `/tasks?${queryString}` : '/tasks';
    const { data } = await api.get(url);
    return data;
  },

  async getTask(id: string): Promise<Task> {
    const { data } = await api.get(`/tasks/${id}`);
    return data;
  },

  async createTask(taskData: Partial<Task>): Promise<Task> {
    const { data } = await api.post('/tasks', taskData);
    return data;
  },

  async updateTask(id: string, taskData: Partial<Task>): Promise<Task> {
    const { data } = await api.patch(`/tasks/${id}`, taskData);
    return data;
  },

  async deleteTask(id: string): Promise<{ success: boolean }> {
    const { data } = await api.delete(`/tasks/${id}`);
    return data;
  },

  async addMember(taskId: string, userId: string): Promise<void> {
    await api.post(`/tasks/${taskId}/members`, { userId });
  },

  async removeMember(taskId: string, userId: string): Promise<void> {
    await api.delete(`/tasks/${taskId}/members/${userId}`);
  }
};
