// Base API Service class for all HTTP requests

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG, RequestConfig, getAuthHeaders, handleApiError } from './config';

export class BaseApiService {
    private axiosInstance: AxiosInstance;

    constructor(baseUrl: string = API_CONFIG.BASE_URL) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            timeout: API_CONFIG.TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor to add auth headers
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const authHeaders = getAuthHeaders();
                Object.assign(config.headers, authHeaders);
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor to handle errors
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error) => {
                throw handleApiError(error);
            }
        );
    }

    private async request<T>(
        endpoint: string,
        options: AxiosRequestConfig & RequestConfig = {}
    ): Promise<T> {
        try {
            const response = await this.axiosInstance.request<T>({
                url: endpoint,
                ...options,
            });
            return response.data;
        } catch (error: any) {
            throw handleApiError(error);
        }
    }

    protected async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET', ...config });
    }

    protected async post<T>(
        endpoint: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            data,
            ...config,
        });
    }

    protected async put<T>(
        endpoint: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            data,
            ...config,
        });
    }

    protected async patch<T>(
        endpoint: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            data,
            ...config,
        });
    }

    protected async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE', ...config });
    }

    // Helper method for form data uploads
    protected async uploadFormData<T>(
        endpoint: string,
        formData: FormData,
        config?: Omit<RequestConfig, 'headers'>
    ): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            ...config,
        });
    }
}