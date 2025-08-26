"use client"

import { useState } from "react"
import { Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { PasswordFormData, passwordSchema } from "../schema"
// import { changeMyPassword } from "@/modules/usuarios/action/usuario.actions"

interface PasswordFormProps {
  userId: number
}

export function PasswordForm({ userId }: PasswordFormProps) {
  const [loading, setLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Validación en tiempo real para las contraseñas
  const passwordsMatch = formData.newPassword === formData.confirmPassword && formData.confirmPassword !== ""
  const showPasswordError = formData.confirmPassword !== "" && !passwordsMatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validar datos
      const validatedData = passwordSchema.parse(formData)
      
      // const result = await changeMyPassword(
      //   validatedData.currentPassword,
      //   validatedData.newPassword,
      //   validatedData.confirmPassword
      // )
      
      // if (result.success) {
      //   toast.success(result.message || "Contraseña actualizada exitosamente")
      //   // Limpiar formulario
      //   setFormData({
      //     currentPassword: "",
      //     newPassword: "",
      //     confirmPassword: "",
      //   })
      // } else {
      //   toast.error(result.message || result.error || "Error al actualizar la contraseña")
      // }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error al actualizar la contraseña")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Actualizar contraseña
        </CardTitle>
        <CardDescription>Cambia tu contraseña para mantener tu cuenta segura</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Contraseña Actual</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  placeholder="Ingresa tu contraseña actual"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  placeholder="Ingresa tu nueva contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500">La contraseña debe tener entre 6 y 100 caracteres</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Repetir Nueva Contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirma tu nueva contraseña"
                  required
                  className={showPasswordError ? "border-red-500 focus:border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {showPasswordError && (
                <p className="text-xs text-red-500">Las contraseñas no coinciden</p>
              )}
              {passwordsMatch && formData.confirmPassword !== "" && (
                <p className="text-xs text-green-500">✓ Las contraseñas coinciden</p>
              )}
            </div>
          </div>

          {/* Consejos de seguridad */}
          <div className=" border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Consejos para una contraseña segura:</h4>
            <ul className="text-sm  space-y-1">
              <li>• Usa al menos 6 caracteres</li>
              <li>• Incluye mayúsculas y minúsculas</li>
              <li>• Agrega números y símbolos</li>
              <li>• Evita información personal</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={loading || !passwordsMatch || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
            >
              {loading ? "Actualizando..." : "Actualizar contraseña"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 