import apiClient from '@/lib/axios';
import { config } from '@/lib/config';
import { 
  LoginRequest, 
  LoginResponse, 
  ForgotPasswordRequest, 
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UsuarioDto
} from '@/models/usuario';

// Función auxiliar para verificar si localStorage está disponible
const isLocalStorageAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && window.localStorage !== undefined;
  } catch {
    return false;
  }
};

// Función auxiliar para obtener un item de localStorage de forma segura
const getLocalStorageItem = (key: string): string | null => {
  if (!isLocalStorageAvailable()) {
    return null;
  }
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

// Función auxiliar para establecer un item en localStorage de forma segura
const setLocalStorageItem = (key: string, value: string): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignorar errores de localStorage
  }
};

// Función auxiliar para remover un item de localStorage de forma segura
const removeLocalStorageItem = (key: string): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignorar errores de localStorage
  }
};

// Configuración de vistas permitidas para usuarios con acceso limitado
const LIMITED_ACCESS_VIEWS = [
  'dashboard',
  'gestion-padron',
  'gestion-fichas',
  'modulos',
  'tipos-datos',
  'inspectores'
];

export class AuthService {
  // Login
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { data } = response.data;
      
      // Guardar token y usuario en localStorage
      setLocalStorageItem(config.auth.tokenKey, data.accessToken);
      setLocalStorageItem(config.auth.userKey, JSON.stringify(data.user));
      
      // Guardar refresh token si es necesario
      if (data.refreshToken) {
        setLocalStorageItem('refresh_token', data.refreshToken);
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en el inicio de sesión');
    }
  }

  // Logout
  static logout(): void {
    removeLocalStorageItem(config.auth.tokenKey);
    removeLocalStorageItem(config.auth.userKey);
    removeLocalStorageItem('refresh_token');
    
    if (typeof window !== 'undefined') {
      window.location.href = config.auth.loginUrl;
    }
  }

  // Forgot Password
  static async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    try {
      const response = await apiClient.post('/auth/forgot-password', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al enviar el correo de recuperación');
    }
  }

  // Reset Password
  static async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    try {
      const response = await apiClient.post('/auth/reset-password', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al restablecer la contraseña');
    }
  }

  // Validate Reset Token
  static async validateResetToken(token: string): Promise<{ valid: boolean; message: string }> {
    try {
      const response = await apiClient.get(`/auth/validate-reset-token?token=${encodeURIComponent(token)}`);
      return response.data.data;
    } catch (error: any) {
      return {
        valid: false,
        message: error.response?.data?.message || 'Token inválido'
      };
    }
  }

  // Verificar si el usuario está autenticado
  static isAuthenticated(): boolean {
    const token = getLocalStorageItem(config.auth.tokenKey);
    return !!token;
  }

  // Obtener usuario actual
  static getCurrentUser(): UsuarioDto | null {
    const userStr = getLocalStorageItem(config.auth.userKey);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  // Obtener token actual
  static getToken(): string | null {
    return getLocalStorageItem(config.auth.tokenKey);
  }

  // Obtener refresh token
  static getRefreshToken(): string | null {
    return getLocalStorageItem('refresh_token');
  }

  // Verificar si el usuario tiene acceso total
  static hasTotalAccess(): boolean {
    const user = this.getCurrentUser();
    return user?.accesototal === 1;
  }

  // Verificar si el usuario tiene acceso limitado
  static hasLimitedAccess(): boolean {
    const user = this.getCurrentUser();
    return user?.accesototal === 0;
  }

  // Verificar si el usuario puede acceder a una vista específica
  static canAccessView(viewName: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // Si tiene acceso total, puede acceder a todo
    if (user.accesototal === 1) return true;
    
    // Si tiene acceso limitado, solo puede acceder a vistas permitidas
    if (user.accesototal === 0) {
      return LIMITED_ACCESS_VIEWS.includes(viewName);
    }
    
    return false;
  }

  // Verificar si el usuario puede acceder a cualquiera de las vistas especificadas
  static canAccessAnyView(viewNames: string[]): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // Si tiene acceso total, puede acceder a todo
    if (user.accesototal === 1) return true;
    
    // Si tiene acceso limitado, verificar si puede acceder a alguna de las vistas
    if (user.accesototal === 0) {
      return viewNames.some(viewName => LIMITED_ACCESS_VIEWS.includes(viewName));
    }
    
    return false;
  }

  // Verificar si el usuario puede acceder a todas las vistas especificadas
  static canAccessAllViews(viewNames: string[]): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // Si tiene acceso total, puede acceder a todo
    if (user.accesototal === 1) return true;
    
    // Si tiene acceso limitado, verificar si puede acceder a todas las vistas
    if (user.accesototal === 0) {
      return viewNames.every(viewName => LIMITED_ACCESS_VIEWS.includes(viewName));
    }
    
    return false;
  }

  // Verificar si la cuenta está habilitada
  static isAccountEnabled(): boolean {
    const user = this.getCurrentUser();
    return user ? user.activo : false;
  }

  // Verificar si la cuenta no está bloqueada (siempre true para este sistema)
  static isAccountNonLocked(): boolean {
    return true;
  }

  // Verificar si las credenciales no han expirado (siempre true para este sistema)
  static isCredentialsNonExpired(): boolean {
    return true;
  }

  // Verificar si la cuenta no ha expirado (siempre true para este sistema)
  static isAccountNonExpired(): boolean {
    return true;
  }

  // Actualizar perfil de usuario
  static async updateUserProfile(userId: string, profileData: Partial<UsuarioDto>): Promise<{ success: boolean; message: string; user?: UsuarioDto }> {
    try {
      const response = await apiClient.put(`/usuarios/${userId}`, profileData);
      const { data } = response.data;
      
      // Actualizar usuario en localStorage
      if (data) {
        setLocalStorageItem(config.auth.userKey, JSON.stringify(data));
      }
      
      return {
        success: true,
        message: response.data.message || 'Perfil actualizado exitosamente',
        user: data
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al actualizar el perfil');
    }
  }

  // Obtener vistas permitidas para el usuario actual
  static getPermittedViews(): string[] {
    const user = this.getCurrentUser();
    if (!user) return [];
    
    if (user.accesototal === 1) {
      // Retornar todas las vistas disponibles
      return [
        'dashboard',
        'cuenta',
        'configuracion',
        'supervisores',
        'inspectores',
        'importar',
        'gestion-padron',
        'gestion-fichas',
        'mapas',
        'grupos-trabajo',
        'asignacion-carga',
        'modulos',
        'tipos-datos',
        'usuarios'
      ];
    }
    
    if (user.accesototal === 0) {
      return LIMITED_ACCESS_VIEWS;
    }
    
    return [];
  }
} 