"use client"

import { type ReactNode } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface CustomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  children: ReactNode
  size?: "default" | "large"
}

export function CustomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "default",
}: CustomSheetProps) {

  const sizeClasses = {
    default: "w-full sm:max-w-sm",
    large: "w-full sm:max-w-2xl"
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={cn(
        "flex flex-col overflow-y-auto pb-5",
        sizeClasses[size]
      )}>
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">{title}</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">{description}</SheetDescription>
        </SheetHeader>

        <div className="flex-1">{children}</div>
      </SheetContent>
    </Sheet>
  )
}
