import { create } from "zustand";

import { ProjectDtoType, SelectedProjectType } from "../projects/types/projects";

interface ProjectsState {
  projects: ProjectDtoType[];
  favoritedProjects: ProjectDtoType[];
  selectedProject: SelectedProjectType | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setProjects: (projects: ProjectDtoType[]) => void;
  setFavoriteProjects: (projects: ProjectDtoType[]) => void;
  setSelectedProject: (project: SelectedProjectType | null) => void;
  addProject: (project: ProjectDtoType) => void;
  addFavoriteProject: (project: ProjectDtoType) => void;
  removeProject: (projectId: string) => void;
  removeFavoriteProject: (projectId: string) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  clearProjects: () => void;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  favoritedProjects: [],
  selectedProject: null,
  isLoading: false,
  error: null,
  setProjects: (projects: ProjectDtoType[]) => {
    set({ projects });
  },
  setFavoriteProjects: (favoriteProjects: ProjectDtoType[]) => {
    console.log("Projects:", favoriteProjects);

    if (!Array.isArray(favoriteProjects)) {
      console.log("Error: projects is not an array");
    }
    const filteredProjects = [...favoriteProjects].filter(
      (project) => project.favorite
    );
    set({ favoritedProjects: filteredProjects });
  },
  setSelectedProject: (project: SelectedProjectType | null) => {
    set({ selectedProject: project });
  },
  addProject: (project: ProjectDtoType) =>
    set((state) => ({ projects: [...state.projects, project] })),
  addFavoriteProject: (project: ProjectDtoType) =>
    set((state) => {
      const favoritedProjects = [...state.favoritedProjects, project];
      return { favoritedProjects };
    }),
  removeProject: (projectId: string) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
    })),
  removeFavoriteProject: (projectId: string) =>
    set((state) => ({
      favoritedProjects: state.favoritedProjects.filter(
        (project) => project.id !== projectId
      ),
    })),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
  clearProjects: () => set({ projects: [], favoritedProjects: [] }),
}));
