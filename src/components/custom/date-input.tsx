"use client"

import type React from "react"

import { useState, forwardRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { formatDateInput, isValidDate } from "@/utils/date-formatter"
import type { DateInputProps } from "@/types/custom-input"

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    { format = "DD/MM/YYYY", minDate, maxDate, icon, label, error, helperText, className, value, onChange, ...props },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(value || "")
    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value
      const formattedValue = formatDateInput(rawValue, format)

      // Validar fecha si está completa
      if (formattedValue.length === 10) {
        setIsValid(isValidDate(formattedValue, format))
      } else {
        setIsValid(true)
      }

      setInternalValue(formattedValue)

      // Llamar al onChange externo si existe
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: formattedValue },
        }
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
      }
    }

    const hasError = error || (!isValid && typeof internalValue === "string" && internalValue.length === 10)

    return (
      <div className="space-y-2">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}

          <Input
            ref={ref}
            type="text"
            value={internalValue}
            onChange={handleInputChange}
            placeholder={format}
            maxLength={10}
            className={cn(icon && "pl-10", hasError && "border-red-500 focus-visible:ring-red-500", className)}
            {...props}
          />
        </div>

        {/* Mensajes de ayuda y error */}
        {hasError && <p className="text-xs text-red-500">{error || "Fecha inválida"}</p>}
        {helperText && !hasError && <p className="text-xs text-muted-foreground">{helperText}</p>}
      </div>
    )
  },
)

DateInput.displayName = "DateInput"
