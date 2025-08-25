"use client"

import { forwardRef, useMemo } from "react"
import { ComboboxControlled } from "./combobox-controlled"
import type { EnumComboboxProps, ComboboxOption } from "@/types/combobox"

export const EnumCombobox = forwardRef<HTMLButtonElement, EnumComboboxProps>(
  ({ enumObject, enumLabels, ...props }, ref) => {
    const options: ComboboxOption[] = useMemo(() => {
      return Object.entries(enumObject).map(([key, value]) => ({
        // Usar el valor del enum como label por defecto, no la clave
        label: enumLabels?.[key] || String(value),
        value: value,
      }))
    }, [enumObject, enumLabels])

    return <ComboboxControlled ref={ref} options={options} {...props} />
  },
)

EnumCombobox.displayName = "EnumCombobox"
