import type React from "react"
import type { ReactNode } from "react"

export type InputType = "text" | "password" | "email" | "numeric" | "date" | "time" | "color"

export type CharacterType = "numeric" | "letters" | "symbols" | "spaces"

export type TextTransformStyle = "original" | "uppercase" | "lowercase" | "capitalize" | "sentence"

export interface CustomInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: InputType
  icon?: ReactNode
  allowedCharacters?: CharacterType[]
  maxLength?: number
  label?: string
  error?: string
  helperText?: string
  textTransform?: TextTransformStyle
}

export interface DateInputProps extends Omit<CustomInputProps, "type"> {
  format?: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY/MM/DD"
  minDate?: string
  maxDate?: string
}

export interface TimeInputProps extends Omit<CustomInputProps, "type"> {
  format?: "12" | "24"
  showSeconds?: boolean
}
