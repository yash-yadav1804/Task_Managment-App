import { api } from '../lib/api';

export interface User {
  id: string;
  name: string;
  email: string | null;
  avatarUrl: string | null;
}

export const usersService = {
  async getUsers(): Promise<User[]> {
    const { data } = await api.get('/users');
    return data;
  }
};
