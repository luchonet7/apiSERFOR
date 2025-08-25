import { BadgeColor, BadgeSize, BadgeVariant } from "@/types/custom-badge"

export const getBadgeStyles = (color: BadgeColor, variant: BadgeVariant): string => {
  const styles = {
    ghost: {
      red: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900/70",
      orange:
        "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:hover:bg-orange-900/70",
      amber:
        "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-900/70",
      green:
        "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900/70",
      blue: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900/70",
      purple:
        "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:hover:bg-purple-900/70",
      dark: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/50 dark:text-gray-300 dark:hover:bg-gray-900/70",
      white:
        "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-600",
      lime: "bg-lime-100 text-lime-800 hover:bg-lime-200 dark:bg-lime-900/50 dark:text-lime-300 dark:hover:bg-lime-900/70",
      sky: "bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-900/50 dark:text-sky-300 dark:hover:bg-sky-900/70",
    },
    solid: {
      red: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
      orange: "bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-800",
      amber: "bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800",
      green: "bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800",
      blue: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
      purple: "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800",
      dark: "bg-gray-800 text-white hover:bg-gray-900 dark:bg-gray-900 dark:hover:bg-black",
      white:
        "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-200",
      lime: "bg-lime-600 text-white hover:bg-lime-700 dark:bg-lime-700 dark:hover:bg-lime-800",
      sky: "bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-800",
    },
  }

  return styles[variant][color]
}

export const getBadgeSizeStyles = (size: BadgeSize): string => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    default: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  }

  return sizeStyles[size]
}

export const getBadgeIconSize = (size: BadgeSize): string => {
  const iconSizes = {
    sm: "h-3 w-3",
    default: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return iconSizes[size]
}
