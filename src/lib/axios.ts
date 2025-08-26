import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { config as appConfig } from './config';

// Función auxiliar para obtener token de forma segura
const getTokenSafely = (): string | null => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem(appConfig.auth.tokenKey);
        }
        return null;
    } catch {
        return null;
    }
};

// Función auxiliar para limpiar localStorage de forma segura
const clearAuthDataSafely = (): void => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem(appConfig.auth.tokenKey);
            localStorage.removeItem(appConfig.auth.userKey);
        }
    } catch {
        // Ignorar errores
    }
};

// Crear instancia de axios
const apiClient: AxiosInstance = axios.create({
    baseURL: appConfig.api.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: appConfig.api.timeout,
});

// Interceptor para agregar el token JWT a las peticiones
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getTokenSafely();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        // Si el token expiró o es inválido, redirigir al login
        if (error.response?.status === 401) {
            clearAuthDataSafely();
            if (typeof window !== 'undefined') {
                window.location.href = appConfig.auth.loginUrl;
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient; 