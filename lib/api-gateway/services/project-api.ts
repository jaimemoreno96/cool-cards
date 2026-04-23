import { ApiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

export interface CreateProjectRequest {
  name: string;
  description?: string;
  userId: string;
  favorite?: boolean;
}

export interface UpdateProjectRequest {
  projectId: string;
  name?: string;
  description?: string;
  favorite?: boolean;
}

export interface ProjectResponse {
  id: string;
  name: string;
  description?: string;
  userId: string;
  favorite: boolean;
  members?: string[];
}

export interface ProjectsResponse {
  projects: ProjectResponse[];
}

export interface FavoriteProjectRequest {
  projectId: string;
  userId: string;
  favorite: boolean;
}

class ProjectApi {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getProjectsByUser(userId: string): Promise<ProjectResponse[]> {
    const response = await this.client.get<ProjectResponse[]>(ENDPOINTS.PROJECTS.BY_USER(userId));
    return response.data;
  }

  async getProject(projectId: string): Promise<ProjectResponse> {
    const response = await this.client.get<ProjectResponse>(ENDPOINTS.PROJECTS.DETAIL(projectId));
    return response.data;
  }

  async createProject(data: CreateProjectRequest): Promise<ProjectResponse> {
    const response = await this.client.post<ProjectResponse>(ENDPOINTS.PROJECTS.CREATE, data);
    return response.data;
  }

  async updateProject(data: UpdateProjectRequest): Promise<ProjectResponse> {
    const response = await this.client.put<ProjectResponse>(ENDPOINTS.PROJECTS.DETAIL(data.projectId), data);
    return response.data;
  }

  async setFavorite(data: FavoriteProjectRequest): Promise<void> {
    await this.client.put(ENDPOINTS.PROJECTS.FAVORITE, data);
  }

  async deleteProject(projectId: string): Promise<void> {
    await this.client.delete(ENDPOINTS.PROJECTS.DETAIL(projectId));
  }
}

export { ProjectApi };