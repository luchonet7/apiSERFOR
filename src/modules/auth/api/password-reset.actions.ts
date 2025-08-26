"use client"

import { AuthService } from '../services/auth.service';
import { ForgotPasswordRequest, ResetPasswordRequest } from '@/models/usuario';

export interface PasswordResetResponse {
  success: boolean;
  message: string;
}

/**
 * Solicita la recuperación de contraseña
 */
export async function requestPasswordReset (
  data: ForgotPasswordRequest
): Promise<PasswordResetResponse> {
  try {
    const response = await AuthService.forgotPassword(data);
    return {
      success: response.success,
      message: response.message || "Se ha enviado un correo con las instrucciones para restablecer tu contraseña"
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al enviar el correo de recuperación. Por favor, inténtalo de nuevo."
    };
  }
}

/**
 * Restablece la contraseña usando un token válido
 */
export async function resetPassword (
  data: ResetPasswordRequest
): Promise<PasswordResetResponse> {
  try {
    const response = await AuthService.resetPassword(data);
    return {
      success: response.success,
      message: response.message || "Contraseña restablecida exitosamente"
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al restablecer la contraseña"
    };
  }
}

/**
 * Valida un token de reset de contraseña
 */
export async function validateResetToken (
  token: string
): Promise<{ valid: boolean; message: string }> {
  try {
    const response = await AuthService.validateResetToken(token);
    return {
      valid: response.valid,
      message: response.message || "Token válido"
    };
  } catch (error: any) {
    return {
      valid: false,
      message: error.message || "Token inválido o expirado"
    };
  }
} 