// src/modules/auth/api/auth.actions.ts
import { useMutation } from '@tanstack/react-query'
import { apiFetch } from '@/lib/apiClient'
import { MD5 } from 'crypto-js'

// Función para convertir a MD5 usando crypto-js
function toMD5 (text: string): string {
  return MD5(text).toString()
}

/** Tipos para autenticación */
export interface LoginCredentials {
  nombre: string
  password: string
  sistema: { id: number }
  compagnia: { id: number }
}

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

export interface Usuario {
  id: string
  nombre: string
  email?: string
  password: string
  sistema: { id: number }
  compagnia: { id: number }
}

/** API calls para autenticación */
export async function loginUser (credentials: LoginCredentials): Promise<any> {
  // Convertir password a MD5 antes de enviar
  const credentialsWithMD5 = {
    ...credentials,
    password: toMD5(credentials.password)
  }

  // Obtener la URL de autenticación desde las variables de entorno
  const authUrl = process.env.NEXTAUTH_AUTH_URL || 'http://10.6.1.133:9301/sgiseguridad/auth/apptoken'

  return apiFetch<LoginResponse>(authUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentialsWithMD5),
  })
}

export async function logoutUser (): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>('/api/auth/logout', {
    method: 'POST',
  })
}

export async function getCurrentUser (): Promise<Usuario | null> {
  try {
    return await apiFetch<Usuario>('/api/auth/me', { cache: 'no-store' })
  } catch (error) {
    return null
  }
}

/** Hooks para autenticación */
export function useAuth () {
  /** Login mutation */
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Aquí puedes manejar el éxito del login
      // Por ejemplo, guardar el token en localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token)
      }
    },
    onError: (error) => {
      // Aquí puedes manejar errores de login
      console.error('Error en login:', error)
    },
  })

  /** Logout mutation */
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

/** Hook específico para login con estructura similar a useLazyQuery */
export function useLogin () {
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Guardar el token en localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token)
      }
    },
    onError: (error) => {
      console.error('Error en login:', error)
    },
  })

  // Función para ejecutar el login (similar a getBuscar en tu ejemplo)
  const executeLogin = (credentials: LoginCredentials) => {
    return mutation.mutateAsync(credentials)
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

/** Hook específico para logout */
export function useLogout () {
  return useAuth().logoutMutation
}