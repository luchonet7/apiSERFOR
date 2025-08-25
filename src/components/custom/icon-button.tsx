"use client"

import { forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { getIconButtonStyles } from "@/utils/icon-button-styles"
import type { IconButtonProps } from "@/types/icon-button"

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      color = "purple",
      variant = "ghost",
      tooltip,
      tooltipIcon,
      children,
      size = "icon",
      disabled = false,
      loading = false,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const colorStyles = getIconButtonStyles(color, variant)
    const isDisabled = disabled || loading

    const buttonContent = loading ? <Loader2 className="h-4 w-4 animate-spin" /> : children

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              size={size}
              disabled={isDisabled}
              onClick={onClick}
              className={cn(
                "rounded-full transition-all duration-200",
                colorStyles,
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className,
              )}
              {...props}
            >
              {buttonContent}
            </Button>
          </TooltipTrigger>
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

IconButton.displayName = "IconButton"
