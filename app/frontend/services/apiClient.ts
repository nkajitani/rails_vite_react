import axios, { AxiosError } from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = '/api/v1';
const TOKEN_KEY = 'auth_token';

export class ApiError extends Error {
  constructor(
    public status: number,
    public errors?: Record<string, string[]>,
    message?: string
  ) {
    super(message || 'API Error')
    this.name = 'ApiError'
  }
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    this.client.interceptors.response.use(
      (response) => {
        const authHeader = response.headers['authorization'];
        if (authHeader) {
          const token = authHeader.replace('Bearer ', '');
          this.saveToken(token);
        }
        return response;
      },
      (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
        if (error.response) {
          const { status, data }  = error.response;

          if (status === 401) {
            this.removeToken();
          }

          throw new ApiError(
            status,
            data.errors,
            data.message || 'failed to fetch'
          );
        }

        throw new ApiError(0, undefined, 'Network Error');
      }
    )
  }

  private getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  private removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public clearAuth(): void {
    this.removeToken();
  }

  async get<T>(url: string, config = {}) {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config = {}) {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config = {}) {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
