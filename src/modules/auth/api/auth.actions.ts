// src/modules/auth/api/auth.actions.ts
import { useMutation } from '@tanstack/react-query'
import { apiFetch } from '@/lib/apiClient'
import { MD5 } from 'crypto-js'

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Convierte un texto a hash MD5 usando crypto-js
 * @param text - Texto a convertir
 * @returns Hash MD5 del texto
 */
function toMD5 (text: string): string {
  return MD5(text).toString()
}

// ============================================================================
// TIPOS Y INTERFACES
// ============================================================================

/** Credenciales para el login */
export interface LoginCredentials {
  nombre: string
  password: string
  sistema: { id: number }
  compagnia: { id: number }
}

/** Respuesta del servidor al hacer login */
export interface LoginResponse {
  success: boolean
  token?: string
  user?: {
    id: string
    nombre: string
    email?: string
    sistema: { id: number }
    compagnia: { id: number }
  }
  message?: string
}

/** Modelo de usuario */
export interface Usuario {
  id: string
  nombre: string
  email?: string
  password: string
  sistema: { id: number }
  compagnia: { id: number }
}

// ============================================================================
// FUNCIONES DE API
// ============================================================================

/**
 * Autentica un usuario con el servidor
 * @param credentials - Credenciales del usuario
 * @returns Respuesta del servidor con token y datos del usuario
 */
export async function loginUser (credentials: LoginCredentials): Promise<any> {
  // Convertir password a MD5 antes de enviar
  const credentialsWithMD5 = {
    ...credentials,
    "sistema": {
      "id": process.env.NEXT_PUBLIC_SEC_SYSTEM_ID
    },
    "compagnia": {
      "id": process.env.NEXT_PUBLIC_SEC_COMPANY_ID
    },
    password: toMD5(credentials.password)
  }

  // Obtener la URL de autenticación desde las variables de entorno
  const authUrl = process.env.NEXT_PUBLIC_SEC_URL_AUTHENTICATOR + '/login'

  return apiFetch<LoginResponse>(authUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
}

/**
 * Cierra la sesión del usuario actual
 * @returns Respuesta de confirmación del logout
 */
export async function logoutUser (): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>('/api/auth/logout', {
    method: 'POST',
  })
}

/**
 * Obtiene la información del usuario actualmente autenticado
 * @returns Datos del usuario o null si no hay sesión
 */
export async function getCurrentUser (): Promise<Usuario | null> {
  try {
    return await apiFetch<Usuario>('/api/auth/me', { cache: 'no-store' })
  } catch (error) {
    return null
  }
}

/**
 * Obtiene un token de seguridad del servidor de autenticación
 * @param credentials - Credenciales del usuario
 * @returns Token de seguridad
 */
async function obtenerTokenSeguridad (credentials: LoginCredentials) {
  const response = await fetch(process.env.NEXT_PUBLIC_SEC_URL_AUTHENTICATOR + '/apptoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

  if (!response.ok) {
    throw new Error('Error al obtener el token de seguridad')
  }

  const data = await response.json()
  if (!data.token) {
    throw new Error('No se recibió token de seguridad')
  }
  return data.token
}

// ============================================================================
// HOOKS DE AUTENTICACIÓN
// ============================================================================

/**
 * Hook principal para manejar autenticación
 * Proporciona mutaciones para login y logout
 */
export function useAuth () {
  /** Mutación para login */
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Aquí puedes manejar el éxito del login
      // Por ejemplo, guardar el token en localStorage
    },
    onError: (error) => {
      // Aquí puedes manejar errores de login
      console.error('Error en login:', error)
    },
  })

  /** Mutación para logout */
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Limpiar token y datos de usuario
      localStorage.removeItem('authToken')
    },
  })

  return {
    loginMutation,    // .mutate({ nombre, password, sistema, compagnia })
    logoutMutation,   // .mutate()
  }
}

/**
 * Hook específico para login con validación y estructura similar a useLazyQuery
 * Incluye validación de credenciales antes de ejecutar el login
 */
export function useLogin () {
  /**
   * Valida las credenciales antes de intentar el login
   * @param credentials - Credenciales a validar
   * @throws Error si las credenciales no son válidas
   */
  const validarCredenciales = (credentials: LoginCredentials) => {
    if (!credentials || typeof credentials !== 'object') {
      throw new Error('Las credenciales no son válidas')
    }
    if (!credentials.nombre || typeof credentials.nombre !== 'string' || credentials.nombre.trim() === '') {
      throw new Error('El nombre de usuario es obligatorio')
    }
    if (!credentials.password || typeof credentials.password !== 'string' || credentials.password.trim() === '') {
      throw new Error('La contraseña es obligatoria')
    }
    // Puedes agregar más validaciones según tus necesidades (por ejemplo, sistema, compagnia, etc.)
  }

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Guardar el token de login en localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token)
      }
      // Opcional: guardar el token de seguridad si se requiere
      if (data.tokenSeguridad) {
        localStorage.setItem('securityToken', data.tokenSeguridad)
      }
    },
    onError: (error) => {
      console.error('Error en login:', error)
    },
  })

  /**
   * Ejecuta el login con validación previa de credenciales
   * @param credentials - Credenciales del usuario
   * @returns Promesa con el resultado del login
   */
  const executeLogin = async (credentials: LoginCredentials) => {
    try {
      validarCredenciales(credentials)
      return await mutation.mutateAsync(credentials)
    } catch (error) {
      // Puedes manejar el error de validación aquí si lo deseas
      console.error('Error de validación en login:', error)
      throw error
    }
  }

  return [
    executeLogin,
    {
      data: mutation.data,
      error: mutation.error,
      isLoading: mutation.isPending,
      isSuccess: mutation.isSuccess,
      isError: mutation.isError,
      reset: mutation.reset
    }
  ] as const
}

/**
 * Hook específico para logout
 * @returns Mutación para cerrar sesión
 */
export function useLogout () {
  return useAuth().logoutMutation
}