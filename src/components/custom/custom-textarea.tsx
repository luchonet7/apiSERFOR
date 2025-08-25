"use client"

import type React from "react"

import { useState, forwardRef, useEffect, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { CustomTextareaProps } from "@/types/custom-textarea"
import { transformText } from "@/utils/text-tranformation"

export const CustomTextarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  (
    {
      value,
      onChange,
      maxLength,
      label,
      description,
      error,
      required = false,
      showCounter = true,
      minRows = 3,
      maxRows = 8,
      resize = "vertical",
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(value || "")
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    // Auto-resize del textarea
    useEffect(() => {
      const textarea = textareaRef.current
      if (textarea) {
        textarea.style.height = "auto"
        const scrollHeight = textarea.scrollHeight
        const minHeight = minRows * 24
        const maxHeight = maxRows * 24
        const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight)
        textarea.style.height = `${newHeight}px`
      }
    }, [internalValue, minRows, maxRows])

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let newValue = e.target.value

      // Aplicar límite de caracteres
      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.substring(0, maxLength)
      }

      // Aplicar transformación "sentence" (primera letra mayúscula)
      newValue = transformText(newValue, "original")

      setInternalValue(newValue)

      // Llamar al onChange externo si existe
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: newValue },
        }
        onChange(syntheticEvent as React.ChangeEvent<HTMLTextAreaElement>)
      }
    }

    const currentLength = internalValue.length
    const hasError = !!error
    const isNearLimit = maxLength && currentLength >= maxLength * 0.9

    return (
      <div className="space-y-2">
        {label && (
          <Label className={cn(required && "after:content-['*'] after:text-red-500 after:ml-1")}>{label}</Label>
        )}

        <div className="relative">
          <Textarea
            ref={(node: HTMLTextAreaElement | null) => {
              textareaRef.current = node
              if (typeof ref === "function") {
                ref(node)
              } else if (ref) {
                ref.current = node
              }
            }}
            value={internalValue}
            onChange={handleTextareaChange}
            className={cn(
              "min-h-[80px] transition-all duration-200",
              resize === "none" && "resize-none",
              resize === "vertical" && "resize-y",
              resize === "horizontal" && "resize-x",
              resize === "both" && "resize",
              hasError && "border-red-500 focus-visible:ring-red-500",
              className,
            )}
            style={{
              overflow: maxRows && currentLength > 0 ? "auto" : "hidden",
            }}
            {...props}
          />
        </div>

        {/* Contador de caracteres y mensajes */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {hasError && <p className="text-xs text-red-500">{error}</p>}
            {description && !hasError && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>

          {showCounter && maxLength && (
            <div
              className={cn(
                "text-xs transition-colors",
                isNearLimit ? "text-orange-500" : "text-muted-foreground",
                currentLength >= maxLength && "text-red-500",
              )}
            >
              {currentLength}/{maxLength}
            </div>
          )}
        </div>
      </div>
    )
  },
)

CustomTextarea.displayName = "CustomTextarea"
