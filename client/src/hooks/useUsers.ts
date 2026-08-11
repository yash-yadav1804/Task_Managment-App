import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/users.service';

export function useUsers() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getUsers,
  });

  return {
    users: users || [],
    isLoading,
    error,
  };
}
