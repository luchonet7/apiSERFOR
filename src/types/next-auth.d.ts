import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    numeroDocumento: string
    apellidoPaterno: string
    apellidoMaterno: string
    nombres: string
    celular: string
    estado: boolean
    rol: string
    fechaCreacion: Date
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
      numeroDocumento: string
      apellidoPaterno: string
      apellidoMaterno: string
      nombres: string
      celular: string
      estado: boolean
      rol: string
      fechaCreacion: Date
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    numeroDocumento: string
    apellidoPaterno: string
    apellidoMaterno: string
    nombres: string
    celular: string
    estado: boolean
    rol: string
    fechaCreacion: Date
  }
} 