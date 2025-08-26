export interface Usuario {
    nombre: string;
    password: string;
    sistema: {
        id: number;
    };
    compagnia: {
        id: number;
    };
}


export interface UsuarioDto {
    codusu: string;
    usuario: string;
    apellidopa: string;
    apellidoma: string;
    nombre: string;
    car: string;
    dni: string;
    fechaingreso: string;
    direccion: string;
    ciudad: string;
    email: string;
    telefono: string;
    nivel: string;
    notas: string;
    estacionactiva: string;
    estaciondefault: string;
    nropc: string;
    codempdefault: string;
    codsucdefault: string;
    estareg: number;
    creador: string;
    fechareg: string;
    user_fondo: string;
    user_avatar: string;
    ipdefault: string;
    intranet: number;
    foto: string;
    tipouser: string;
    accesototal: number;
    codinspector: string;
    codsededefault: string;
    activo: boolean;
}

export interface LoginRequest {
    nombre: string;
    password: string;
    sistema: {
        id: number;
    };
    compagnia: {
        id: number;
    };
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        accessToken: string;
        tokenType: string;
        expiresIn: number;
        user: UsuarioDto;
        message: string;
    };
    timestamp: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordResponse {
    success: boolean;
    message: string;
    timestamp?: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ResetPasswordResponse {
    success: boolean;
    message: string;
    timestamp?: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: any;
    timestamp?: string;
}

// Funciones de utilidad para el acceso
export const hasTotalAccess = (user: UsuarioDto | null): boolean => {
    return user?.accesototal === 1;
};

export const hasLimitedAccess = (user: UsuarioDto | null): boolean => {
    return user?.accesototal === 0;
};

export const getUserFullName = (user: UsuarioDto | null): string => {
    if (!user) return "Usuario";
    return `${user.nombre} ${user.apellidopa} ${user.apellidoma}`.trim();
};

export const getUserInitials = (user: UsuarioDto | null): string => {
    if (!user) return "U";
    const firstName = user.nombre?.charAt(0) || "";
    const lastName = user.apellidopa?.charAt(0) || "";
    return `${firstName}${lastName}`.toUpperCase();
};