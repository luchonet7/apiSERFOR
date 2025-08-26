"use client"

import { AuthService } from '../services/auth.service';
import { LoginRequest, ForgotPasswordRequest, ResetPasswordRequest } from '@/models/usuario';

export async function loginUser(credentials: LoginRequest) {
  try {
    const response = await AuthService.login(credentials);
    return {
      success: response.success,
      data: response.data,
      message: response.message || 'Inicio de sesión exitoso'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error en el inicio de sesión'
    };
  }
}

export async function logoutUser() {
  try {
    AuthService.logout();
    return {
      success: true,
      message: 'Sesión cerrada exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al cerrar sesión'
    };
  }
}

export async function forgotPassword(data: ForgotPasswordRequest) {
  try {
    const response = await AuthService.forgotPassword(data);
    return {
      success: response.success,
      data: response,
      message: response.message || 'Correo de recuperación enviado exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al enviar correo de recuperación'
    };
  }
}

export async function resetPassword(data: ResetPasswordRequest) {
  try {
    const response = await AuthService.resetPassword(data);
    return {
      success: response.success,
      data: response,
      message: response.message || 'Contraseña restablecida exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al restablecer contraseña'
    };
  }
}

export function getCurrentUser() {
  try {
    const user = AuthService.getCurrentUser();
    if (user) {
      return {
        success: true,
        data: user
      };
    } else {
      return {
        success: false,
        error: 'Usuario no autenticado'
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al obtener usuario actual'
    };
  }
}

export function isAuthenticated() {
  return AuthService.isAuthenticated();
}

export function isAccountEnabled() {
  return AuthService.isAccountEnabled();
}

export function isAccountNonLocked() {
  return AuthService.isAccountNonLocked();
}

export function isCredentialsNonExpired() {
  return AuthService.isCredentialsNonExpired();
}

export function isAccountNonExpired() {
  return AuthService.isAccountNonExpired();
}

export async function updateUserProfile(userId: string, profileData: any) {
  try {
    const response = await AuthService.updateUserProfile(userId, profileData);
    return {
      success: true,
      message: response.message,
      user: response.user
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al actualizar el perfil'
    };
  }
} 