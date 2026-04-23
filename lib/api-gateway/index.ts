import { ApiClient, apiClient } from './client';
import { ProjectApi } from './services/project-api';
import { BoardApi } from './services/board-api';
import { UserApi } from './services/user-api';

export interface ApiGatewayConfig {
  baseURL?: string;
  authToken?: string;
  onAuthError?: (error: any) => void;
  onRequest?: (config: any) => void;
  onResponse?: (response: any) => void;
  onError?: (error: any) => void;
}

class ApiGateway {
  public projects: ProjectApi;
  public boards: BoardApi;
  public users: UserApi;
  private client: ApiClient;

  constructor(config?: ApiGatewayConfig) {
    this.client = config?.baseURL ? new ApiClient(config.baseURL) : apiClient;
    
    if (config?.authToken) {
      this.client.setAuthToken(config.authToken);
    }

    if (config?.onAuthError) {
      this.client.addResponseInterceptor({
        onResponseError: config.onAuthError,
      });
    }

    if (config?.onRequest) {
      this.client.addRequestInterceptor({
        onRequest: (cfg) => {
          config.onRequest?.(cfg);
          return cfg;
        },
      });
    }

    if (config?.onResponse) {
      this.client.addResponseInterceptor({
        onResponse: config.onResponse,
      });
    }

    if (config?.onError) {
      this.client.addResponseInterceptor({
        onResponseError: config.onError,
      });
    }

    this.projects = new ProjectApi(this.client);
    this.boards = new BoardApi(this.client);
    this.users = new UserApi(this.client);
  }

  setAuthToken(token: string) {
    this.client.setAuthToken(token);
  }

  removeAuthToken() {
    this.client.removeAuthToken();
  }

  setBaseURL(baseURL: string) {
    this.client.setBaseURL(baseURL);
  }
}

const apiGateway = new ApiGateway();

export { ApiGateway, apiGateway };
export { apiClient };
export * from './client';
export * from './types';
export * from './endpoints';
export * from './services/project-api';
export * from './services/board-api';
export * from './services/user-api';