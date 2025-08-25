"use client"

import { cn } from "@/lib/utils"
import { type ReactNode } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

interface TitlePageProps {
  title: string
  breadcrumb?: BreadcrumbItem[]
  className?: string
}

export function TitlePage({
  title,
  breadcrumb = [],
  className
}: TitlePageProps) {
  return (
    <div className={cn(
      className
    )}>
      {/* Breadcrumb */}
      {breadcrumb.length > 0 && (
        <nav className="flex items-center space-x-1 text-sm text-green-700 dark:text-green-300">
          {breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-1 text-green-500" />
              )}
              
              {item.href ? (
                <Link 
                  href={item.href}
                  className="flex items-center gap-1 hover:text-green-800 dark:hover:text-green-200 transition-colors cursor-pointer"
                >
                  {item.icon && (
                    <span className="w-4 h-4">{item.icon}</span>
                  )}
                  {item.label}
                </Link>
              ) : (
                <span className="flex items-center gap-1 text-muted-foreground">
                  {item.icon && (
                    <span className="w-4 h-4">{item.icon}</span>
                  )}
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Title */}
      <h1 className="text-xl md:text-xl font-bold text-green-900 dark:text-green-100">
        {title}
      </h1>
    </div>
  )
}