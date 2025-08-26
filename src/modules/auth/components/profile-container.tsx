"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { getCurrentUser } from "../actions/auth.actions"
import { AccountInfo } from "./account-info"
import { UsuarioDto } from "@/models/usuario"

export function ProfileContainer() {
  const [userData, setUserData] = useState<UsuarioDto | null>(null)
  const [loading, setLoading] = useState(false)

  // Obtener datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        const result = await getCurrentUser()
        if (result.success && result.data) {
          setUserData(result.data)
        } else {
          toast.error(result.error || "Error al cargar los datos del usuario")
        }
      } catch (error) {
        toast.error("Error al cargar los datos del usuario")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 xs:p-4">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  return (
    <div className="min-h-screen xs:p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold ">Mi Perfil</h1>
          <p className=" mt-2">Información de tu cuenta y datos personales</p>
        </div>

        <AccountInfo userData={userData} />
      </div>
    </div>
  )
} 