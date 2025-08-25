import type React from "react"

export type BadgeColor = "red" | "orange" | "amber" | "green" | "blue" | "purple" | "dark" | "white" | "lime" | "sky"

export type BadgeVariant = "ghost" | "solid"

export type BadgeSize = "sm" | "default" | "lg"

export interface CustomBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor
  variant?: BadgeVariant
  size?: BadgeSize
  tooltip?: string
  tooltipIcon?: React.ReactNode
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  children: React.ReactNode
  removable?: boolean
  onRemove?: () => void
  disabled?: boolean
}
