import { z } from "zod"

export const passwordSchema = z.object({
  currentPassword: z.string().min(1, "La contraseña actual es requerida"),
  newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres").max(100, "La nueva contraseña no puede exceder 100 caracteres"),
  confirmPassword: z.string().min(1, "Confirma la nueva contraseña"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

export type PasswordFormData = z.infer<typeof passwordSchema> 