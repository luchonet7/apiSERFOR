import { z } from "zod"

export const profileSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  dni: z.string().optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema> 