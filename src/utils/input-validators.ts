import { type CharacterType } from "@/types/custom-input"

export const characterPatterns = {
  numeric: /[0-9]/,
  letters: /[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/,
  symbols: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/,
  spaces: /\s/
}

export const isCharacterAllowed = (char: string, allowedTypes: CharacterType[]): boolean => {
  if (allowedTypes.length === 0) return true

  return allowedTypes.some((type) => characterPatterns[type].test(char))
}

export const filterInput = (value: string, allowedTypes: CharacterType[]): string => {
  if (allowedTypes.length === 0) return value

  return value
    .split("")
    .filter((char) => isCharacterAllowed(char, allowedTypes))
    .join("")
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const formatNumericInput = (value: string): string => {
  return value.replace(/[^0-9.-]/g, "")
}
