"use client"

import { type ReactNode } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface CustomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  children: ReactNode
  size?: "sm" | "default" | "large" | "xl" | "full"
  showCloseButton?: boolean
}

export function CustomDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "default",
  showCloseButton = true,
}: CustomDialogProps) {

  const sizeClasses = {
    sm: "max-w-sm",
    default: "max-w-lg",
    large: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[95vw] max-h-[95vh]"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          "flex flex-col overflow-hidden",
          sizeClasses[size],
          size === "full" && "h-[95vh]"
        )}
        showCloseButton={showCloseButton}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">{description}</DialogDescription>
        </DialogHeader>

        <div className={cn(
          "flex-1",
          size === "full" ? "overflow-y-auto" : "overflow-visible"
        )}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
