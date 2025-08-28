import { NextRequest, NextResponse } from 'next/server'
import { MD5 } from 'crypto-js'

// Función para convertir texto a MD5
function toMD5 (text: string): string {
    return MD5(text).toString()
}

export async function POST (request: NextRequest) {
    try {
        const credentials = await request.json()

        // Convertir password a MD5
        const credentialsWithMD5 = {
            ...credentials,
            password: toMD5(credentials.password)
        }

        // URL del autenticador desde variables de entorno del servidor
        const authUrl = process.env.SEC_URL_AUTHENTICATOR + '/login'

        const response = await fetch(authUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentialsWithMD5),
        })

        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: data.message || 'Error de autenticación' },
                { status: response.status }
            )
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error en login API route:', error)
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
