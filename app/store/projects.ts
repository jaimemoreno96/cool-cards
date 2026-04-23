import { create } from "zustand";

import {
  ProjectDtoType,
  SelectedProjectType,
} from "../projects/types/projects";

interface ProjectsState {
  selectedProject: SelectedProjectType | null;
  optimisticProjects: Partial<ProjectDtoType>[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setSelectedProject: (project: SelectedProjectType | null) => void;
  setOptimisticProjects: (
    projects: Partial<ProjectDtoType> | Partial<ProjectDtoType>[]
  ) => void;
  clearOptimisticProjects: () => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  selectedProject: null,
  optimisticProjects: [],
  isLoading: false,
  error: null,
  setSelectedProject: (project: SelectedProjectType | null) => {
    set({ selectedProject: project });
  },
  setOptimisticProjects: (projects) =>
    set((state) => ({
      optimisticProjects: Array.isArray(projects)
        ? [...state.optimisticProjects, ...projects]
        : [...state.optimisticProjects, projects],
    })),

  clearOptimisticProjects: () => set({ optimisticProjects: [] }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
}));
