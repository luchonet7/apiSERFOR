import type React from "react"
export type IconButtonColor =
  | "red"
  | "orange"
  | "amber"
  | "green"
  | "blue"
  | "purple"
  | "dark"
  | "white"
  | "lime"
  | "sky"

export type IconButtonVariant = "ghost" | "solid"

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: IconButtonColor
  variant?: IconButtonVariant
  tooltip: string
  tooltipIcon?: React.ReactNode
  children: React.ReactNode
  size?: "sm" | "default" | "lg" | "icon"
  disabled?: boolean
  loading?: boolean
}
