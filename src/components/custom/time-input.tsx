"use client"

import type React from "react"

import { useState, forwardRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatTimeInput, isValidTime } from "@/utils/time-formatter"
import type { TimeInputProps } from "@/types/custom-input"

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (
    { format = "12", showSeconds = false, icon, label, error, helperText, className, value, onChange, ...props },
    ref,
  ) => {
    // Extraer AM/PM del valor si existe
    const extractAmPmFromValue = (val: string | undefined): { time: string; amPm: string } => {
      if (!val) return { time: "", amPm: "AM" }

      const amPmMatch = val.match(/\s?(AM|PM)$/i)
      if (amPmMatch) {
        return {
          time: val.replace(/\s?(AM|PM)$/i, "").trim(),
          amPm: amPmMatch[1].toUpperCase(),
        }
      }
      return { time: val, amPm: "AM" }
    }

    const [internalValue, setInternalValue] = useState("")
    const [amPm, setAmPm] = useState("AM")
    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
      if (value !== undefined) {
        const { time, amPm: extractedAmPm } = extractAmPmFromValue(value as string)
        setInternalValue(time)
        setAmPm(extractedAmPm)
      }
    }, [value])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Remover cualquier AM/PM del input y solo procesar la parte del tiempo
      const rawValue = e.target.value.replace(/\s?(AM|PM)$/i, "")
      const formattedValue = formatTimeInput(rawValue, format, showSeconds)

      // Validar tiempo si está completo
      const expectedLength = showSeconds ? 8 : 5
      if (formattedValue.length === expectedLength) {
        const fullTime = format === "12" ? `${formattedValue} ${amPm}` : formattedValue
        setIsValid(isValidTime(fullTime, format))
      } else {
        setIsValid(true)
      }

      setInternalValue(formattedValue)

      // Llamar al onChange externo si existe
      if (onChange) {
        const finalValue = format === "12" ? `${formattedValue} ${amPm}` : formattedValue
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: finalValue },
        }
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
      }
    }

    const handleAmPmToggle = () => {
      const newAmPm = amPm === "AM" ? "PM" : "AM"
      setAmPm(newAmPm)

      if (onChange && internalValue) {
        const finalValue = `${internalValue} ${newAmPm}`
        const syntheticEvent = {
          target: { value: finalValue },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
    }

    // Solo mostrar la parte del tiempo en el input, no el AM/PM
    const displayValue = internalValue
    const hasError = error || (!isValid && internalValue.length >= 5)

    return (
      <div className="space-y-2">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}

          <Input
            ref={ref}
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            placeholder={format === "12" ? "HH:MM" : "HH:MM"}
            maxLength={showSeconds ? 8 : 5}
            className={cn(
              icon && "pl-10",
              format === "12" && "pr-16",
              hasError && "border-red-500 focus-visible:ring-red-500",
              className,
            )}
            {...props}
          />

          {format === "12" && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-xs font-medium"
              onClick={handleAmPmToggle}
            >
              {amPm}
            </Button>
          )}
        </div>

        {/* Mensajes de ayuda y error */}
        {hasError && <p className="text-xs text-red-500">{error || "Hora inválida"}</p>}
        {helperText && !hasError && <p className="text-xs text-muted-foreground">{helperText}</p>}
      </div>
    )
  },
)

TimeInput.displayName = "TimeInput"
