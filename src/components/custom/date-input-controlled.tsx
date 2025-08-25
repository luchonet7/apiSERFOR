"use client"

import type React from "react"

import { forwardRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { formatDateInput, isValidDate } from "@/utils/date-formatter"
import type { DateInputProps } from "@/types/custom-input"

export const DateInputControlled = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      format = "DD/MM/YYYY",
      minDate,
      maxDate,
      icon,
      label,
      error,
      helperText,
      className,
      value,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [isValid, setIsValid] = useState(true)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value
      const formattedValue = formatDateInput(rawValue, format)

      // Validar fecha si está completa
      if (formattedValue.length === 10) {
        setIsValid(isValidDate(formattedValue, format))
      } else {
        setIsValid(true)
      }

      // Llamar al onChange externo con el valor formateado
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: formattedValue },
        }
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
      }
    }

    const hasError = error || (!isValid && value && String(value).length === 10)

    return (
      <div className="space-y-2">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}

          <Input
            ref={ref}
            type="text"
            value={value}
            onChange={handleInputChange}
            onBlur={onBlur}
            placeholder={format}
            maxLength={10}
            className={cn(icon && "pl-10", hasError && "border-red-500 focus-visible:ring-red-500", className)}
            {...props}
          />
        </div>

        {minDate && <p className="text-xs text-muted-foreground">Fecha mínima: {minDate}</p>}
        {maxDate && <p className="text-xs text-muted-foreground">Fecha máxima: {maxDate}</p>}

        {/* Mensajes de ayuda y error */}
        {hasError && !minDate && !maxDate && <p className="text-xs text-red-500">{error || "Fecha inválida"}</p>}
        {helperText && !hasError && <p className="text-xs text-muted-foreground">{helperText}</p>}
      </div>
    )
  },
)

DateInputControlled.displayName = "DateInputControlled"
