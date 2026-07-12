import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4016/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('assetflow_jwt');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Custom error structure that components will receive
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  isValidationError?: boolean;
  details?: Array<{ loc: (string | number)[]; msg: string; type: string }>;
}

// Response interceptor to handle branching logic
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Forward the successful response body
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as Record<string, unknown>;

      if (status === 422) {
        // FastAPI native validation error
        const apiError: ApiError = {
          success: false,
          message: 'Validation Error',
          isValidationError: true,
          details: (data.detail as Array<{ loc: (string | number)[]; msg: string; type: string }>) || [],
        };
        return Promise.reject(apiError);
      }

      // App-level error shape (400, 403, 404, 409, etc.)
      const apiError: ApiError = {
        success: false,
        message: (data?.message as string) || 'An error occurred',
        errors: (data?.errors as Record<string, string[]>) || {},
      };
      return Promise.reject(apiError);
    }
    
    // Network or other generic errors
    return Promise.reject({
      success: false,
      message: error.message || 'Network Error',
    });
  }
);
