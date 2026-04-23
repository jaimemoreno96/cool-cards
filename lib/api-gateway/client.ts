import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse, ApiError, RequestConfig, RequestInterceptor, ResponseInterceptor } from './types';

class ApiClient {
  private client: AxiosInstance;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(baseURL: string = '/api') {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const requestConfig: RequestConfig = {
          headers: config.headers as Record<string, string>,
          timeout: config.timeout,
          params: config.params as Record<string, any>,
        };

        for (const interceptor of this.requestInterceptors) {
          if (interceptor.onRequest) {
            const modified = await interceptor.onRequest(requestConfig);
            if (modified.headers) {
              config.headers = modified.headers as any;
            }
            if (modified.timeout) {
              config.timeout = modified.timeout;
            }
            if (modified.params) {
              config.params = modified.params;
            }
          }
        }

        return config;
      },
      (error) => {
        for (const interceptor of this.requestInterceptors) {
          if (interceptor.onRequestError) {
            return interceptor.onRequestError(error);
          }
        }
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        for (const interceptor of this.responseInterceptors) {
          if (interceptor.onResponse) {
            return interceptor.onResponse(response);
          }
        }
        return response;
      },
      (error) => {
        for (const interceptor of this.responseInterceptors) {
          if (interceptor.onResponseError) {
            return interceptor.onResponseError(error);
          }
        }
        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  private normalizeError(error: any): ApiError {
    if (error.response) {
      return {
        message: error.response.data?.error || error.response.data?.message || 'An error occurred',
        status: error.response.status,
        code: error.response.data?.code,
        details: error.response.data,
      };
    } else if (error.request) {
      return {
        message: 'No response from server. Please check your connection.',
        status: 0,
        code: 'NETWORK_ERROR',
      };
    }
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
      code: 'UNKNOWN_ERROR',
    };
  }

  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  async get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  setAuthToken(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete this.client.defaults.headers.common['Authorization'];
  }

  setBaseURL(baseURL: string) {
    this.client.defaults.baseURL = baseURL;
  }
}

export const apiClient = new ApiClient();
export { ApiClient };
export default apiClient;