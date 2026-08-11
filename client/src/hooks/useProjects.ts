import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsService, Project } from '../services/projects.service';

export function useProjects() {
  const queryClient = useQueryClient();

  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: projectsService.getProjects,
  });

  const createProject = useMutation({
    mutationFn: projectsService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const updateProject = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => projectsService.updateProject(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', data.id] });
    },
  });

  const deleteProject = useMutation({
    mutationFn: projectsService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    projects: projectsQuery.data || [],
    isLoading: projectsQuery.isLoading,
    error: projectsQuery.error,
    createProject: createProject.mutateAsync,
    isCreating: createProject.isPending,
    updateProject: updateProject.mutateAsync,
    isUpdating: updateProject.isPending,
    deleteProject: deleteProject.mutateAsync,
    isDeleting: deleteProject.isPending,
  };
}

export function useProject(id: string) {
  const queryClient = useQueryClient();

  const projectQuery = useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsService.getProject(id),
    enabled: !!id,
  });

  return {
    project: projectQuery.data,
    isLoading: projectQuery.isLoading,
    error: projectQuery.error,
  };
}
