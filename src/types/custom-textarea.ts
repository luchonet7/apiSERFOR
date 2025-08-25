import type React from "react"

export interface CustomTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: () => void
  maxLength?: number
  label?: string
  description?: string
  error?: string
  required?: boolean
  showCounter?: boolean
  minRows?: number
  maxRows?: number
  resize?: "none" | "vertical" | "horizontal" | "both"
}
