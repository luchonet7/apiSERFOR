"use client"

import type React from "react"

import { useState, forwardRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { filterInput, validateEmail, formatNumericInput } from "@/utils/input-validators"
import { transformText } from "@/utils/text-tranformation"
import type { CustomInputProps } from "@/types/custom-input"

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      type = "text",
      icon,
      allowedCharacters = [],
      maxLength,
      label,
      error,
      helperText,
      className,
      value,
      onChange,
      textTransform = "original",
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(value || "")
    const [showPassword, setShowPassword] = useState(false)
    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value

      // Aplicar longitud máxima
      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.substring(0, maxLength)
      }

      // Filtrar caracteres permitidos
      if (allowedCharacters.length > 0) {
        newValue = filterInput(newValue, allowedCharacters)
      }

      // Formateo específico por tipo
      switch (type) {
        case "numeric":
          newValue = formatNumericInput(newValue)
          break
        case "email":
          setIsValid(newValue === "" || validateEmail(newValue))
          break
      }

      // Aplicar transformación de texto si no es un tipo especial
      if (["text", "email"].includes(type)) {
        newValue = transformText(newValue, textTransform)
      }

      setInternalValue(newValue)

      // Llamar al onChange externo si existe
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: newValue },
        }
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
      }
    }

    const getInputType = () => {
      switch (type) {
        case "password":
          return showPassword ? "text" : "password"
        case "email":
          return "email"
        case "numeric":
          return "text"
        case "color":
          return "color"
        default:
          return "text"
      }
    }

    const hasError = error || (type === "email" && !isValid && internalValue !== "")

    return (
      <div className="space-y-2">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}

          <Input
            ref={ref}
            type={getInputType()}
            value={internalValue}
            onChange={handleInputChange}
            className={cn(
              icon && "pl-10",
              type === "password" && "pr-10",
              hasError && "border-red-500 focus-visible:ring-red-500",
              className,
            )}
            {...props}
          />

          {type === "password" && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Contador de caracteres */}
        {maxLength && (
          <div className="text-xs text-muted-foreground text-right">
            {typeof internalValue === "string" ? internalValue.length : 0}/{maxLength}
          </div>
        )}

        {/* Mensajes de ayuda y error */}
        {hasError && <p className="text-xs text-red-500">{error || "Email inválido"}</p>}
        {helperText && !hasError && <p className="text-xs text-muted-foreground">{helperText}</p>}
      </div>
    )
  },
)

CustomInput.displayName = "CustomInput"
