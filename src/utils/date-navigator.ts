export const formatDate = (date: Date, format: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY/MM/DD" = "DD/MM/YYYY"): string => {
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear().toString()
  
    switch (format) {
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`
      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`
      case "YYYY/MM/DD":
        return `${year}/${month}/${day}`
      default:
        return `${day}/${month}/${year}`
    }
  }
  
  export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }
  
  export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }
  
  export const isDateInRange = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
    if (minDate && date < minDate) return false
    if (maxDate && date > maxDate) return false
    return true
  }
  
  export const getDateButtonSize = (size: "sm" | "default" | "lg"): string => {
    const sizeStyles = {
      sm: "h-8 w-8 text-xs",
      default: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
    }
    return sizeStyles[size]
  }
  
  export const getDateDisplaySize = (size: "sm" | "default" | "lg"): string => {
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm min-w-[100px]",
      default: "px-4 py-2 text-base min-w-[120px]",
      lg: "px-5 py-3 text-lg min-w-[140px]",
    }
    return sizeStyles[size]
  }
  