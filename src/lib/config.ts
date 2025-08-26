export const config = {
    // Configuración de la API
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api',
        timeout: 120000,
    },

    // Configuración de autenticación
    auth: {
        tokenKey: 'auth_token',
        userKey: 'user',
        refreshTokenKey: 'refresh_token',
        loginUrl: '/auth/login',
        dashboardUrl: '/dashboard',
    },

    // Configuración de paginación
    pagination: {
        defaultPageSize: 10,
        pageSizeOptions: [5, 10, 20, 50],
    },

    // Configuración de roles (ajustar según tu sistema)
    roles: {
        ADMIN: 'ADMIN',
        USER: 'USER',
        MANAGER: 'MANAGER',
    },

    // Configuración de autoridades (Spring Security)
    authorities: {
        ROLE_ADMIN: 'ROLE_ADMIN',
        ROLE_USER: 'ROLE_USER',
        ROLE_MANAGER: 'ROLE_MANAGER',
        // Agregar más autoridades según tu sistema
    },

    // Configuración de rutas protegidas
    protectedRoutes: [
        '/dashboard',
        '/usuarios',
        '/configuracion',
        '/cuenta',
    ],

    // Configuración de rutas públicas
    publicRoutes: [
        '/auth/login',
        '/auth/register',
        '/auth/forgot-password',
        '/auth/reset-password',
    ],
}; 