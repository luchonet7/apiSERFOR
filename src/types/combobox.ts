import type { ReactNode } from "react"

export interface ComboboxOption {
  label: string
  value: string | number
  disabled?: boolean
  icon?: ReactNode
}

export interface ComboboxProps {
  value?: string | number
  onChange?: (value: string | number) => void
  onBlur?: () => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
  width?: string
  label?: string
  description?: string
  error?: string
  required?: boolean
}

export interface EnumComboboxProps extends ComboboxProps {
  enumObject: Record<string, string | number>
  enumLabels?: Record<string, string>
}

export interface DataComboboxProps extends ComboboxProps {
  options: ComboboxOption[]
  loading?: boolean
  onSearch?: (searchTerm: string) => void
}
