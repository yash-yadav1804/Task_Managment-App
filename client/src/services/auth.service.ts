import { api } from '../lib/api';

export interface User {
  id: string;
  email?: string;
  name: string;
  username?: string;
  title?: string;
  avatarUrl?: string;
  isGuest: boolean;
}

export const authService = {
  async guestLogin(): Promise<{ user: User }> {
    const { data } = await api.post('/auth/guest');
    return data;
  },

  async getMe(): Promise<{ user: User }> {
    const { data } = await api.get('/auth/me');
    return data;
  },

  async logout(): Promise<{ success: boolean }> {
    const { data } = await api.post('/auth/logout');
    return data;
  },
};
