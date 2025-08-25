export interface DateNavigatorProps {
    value?: Date
    onChange?: (date: Date) => void
    onBlur?: () => void
    disabled?: boolean
    minDate?: Date
    maxDate?: Date
    className?: string
    dateFormat?: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY/MM/DD"
    locale?: string
    placeholder?: string
    size?: "sm" | "default" | "lg"
  }
  