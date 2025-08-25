"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    icon?: React.ReactNode
    text: string
    path: string
  }[]
}

export function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("flex", className)}
      {...props}
    >
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-0 h-3 w-3 text-muted-foreground" />
              )}
              <Link
                href={item.path}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-foreground",
                  isLast ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                <p className="text-xs">{item.text}</p>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
} 