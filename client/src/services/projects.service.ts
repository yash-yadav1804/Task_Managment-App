import { api } from '../lib/api';
import { Task } from './tasks.service';

export interface Project {
  id: string;
  name: string;
  description?: string;
  priority: 'NO_PRIORITY' | 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  leadId: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  lead?: any;
  ProjectMember?: any[];
  tasks?: Task[];
  _count?: { tasks: number };
}

export const projectsService = {
  async getProjects(): Promise<Project[]> {
    const { data } = await api.get('/projects');
    return data;
  },

  async getProject(id: string): Promise<Project> {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },

  async createProject(projectData: Partial<Project>): Promise<Project> {
    const { data } = await api.post('/projects', projectData);
    return data;
  },

  async updateProject(id: string, projectData: Partial<Project>): Promise<Project> {
    const { data } = await api.patch(`/projects/${id}`, projectData);
    return data;
  },

  async deleteProject(id: string): Promise<{ success: boolean }> {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
  }
};
