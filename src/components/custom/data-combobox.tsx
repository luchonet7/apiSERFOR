"use client"

import { forwardRef } from "react"
import { ComboboxControlled } from "./combobox-controlled"
import { DataComboboxProps } from "@/types/combobox"

export const DataCombobox = forwardRef<HTMLButtonElement, DataComboboxProps>(
  ({ options, loading, onSearch, ...props }, ref) => {
    return <ComboboxControlled ref={ref} options={options} loading={loading} onSearch={onSearch} {...props} />
  },
)

DataCombobox.displayName = "DataCombobox"
