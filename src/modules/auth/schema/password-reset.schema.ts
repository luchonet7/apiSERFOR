import { z } from "zod";

export const passwordResetSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El formato del email no es válido")
    .max(100, "El email no puede tener más de 100 caracteres"),
});

export const resetPasswordSchema = z.object({
  token: z
    .string()
    .min(1, "El token es requerido"),
  newPassword: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100, "La contraseña no puede tener más de 100 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "La contraseña debe contener al menos una letra minúscula, una mayúscula y un número"
    ),
  confirmPassword: z
    .string()
    .min(1, "Confirma tu contraseña"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>; 