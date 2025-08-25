"use client"

import { forwardRef } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { getBadgeStyles, getBadgeSizeStyles, getBadgeIconSize } from "@/utils/badge-styles"
import type { CustomBadgeProps } from "@/types/custom-badge"

export const CustomBadge = forwardRef<HTMLSpanElement, CustomBadgeProps>(
  (
    {
      color = "purple",
      variant = "ghost",
      size = "default",
      tooltip,
      tooltipIcon,
      icon,
      iconPosition = "left",
      children,
      removable = false,
      onRemove,
      disabled = false,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const colorStyles = getBadgeStyles(color, variant)
    const sizeStyles = getBadgeSizeStyles(size)
    const iconSizeClass = getBadgeIconSize(size)

    const isClickable = onClick || removable
    const isDisabled = disabled

    const badgeContent = (
      <span
        ref={ref}
        onClick={isDisabled ? undefined : onClick}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200",
          colorStyles,
          sizeStyles,
          isClickable && !isDisabled && "cursor-pointer",
          isDisabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {/* Icono izquierdo */}
        {icon && iconPosition === "left" && <span className={cn("flex-shrink-0", iconSizeClass)}>{icon}</span>}

        {/* Contenido del badge */}
        <span className="truncate">{children}</span>

        {/* Icono derecho */}
        {icon && iconPosition === "right" && <span className={cn("flex-shrink-0", iconSizeClass)}>{icon}</span>}

        {/* Botón de remover */}
        {removable && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (!isDisabled) {
                onRemove()
              }
            }}
            disabled={isDisabled}
            className={cn(
              "flex-shrink-0 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors",
              iconSizeClass,
              "p-0.5 -mr-1",
              isDisabled && "cursor-not-allowed opacity-50",
            )}
            aria-label="Remover"
          >
            <X className="h-full w-full" />
          </button>
        )}
      </span>
    )

    // Si no hay tooltip, devolver el badge directamente
    if (!tooltip) {
      return badgeContent
    }

    // Si hay tooltip, envolver en TooltipProvider
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{badgeContent}</TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-2">
              {tooltipIcon && <span className="text-sm">{tooltipIcon}</span>}
              <span>{tooltip}</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
)

CustomBadge.displayName = "CustomBadge"
