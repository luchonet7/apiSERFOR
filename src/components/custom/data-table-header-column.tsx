"use client"

import type { Column } from "@tanstack/react-table"
import { ChevronsUpDown,ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
  className?: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn("font-semibold text-gray-700 dark:text-gray-300", className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center justify-start gap-1", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1 font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-700"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownWideNarrow className="ml-1 h-4 w-4 text-blue-600 dark:text-blue-400" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpNarrowWide className="ml-1 h-4 w-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <ChevronsUpDown className="ml-1 h-4 w-4 opacity-50 text-gray-500" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="min-w-32">
          <DropdownMenuItem 
            onClick={() => column.toggleSorting(false)}
            className="cursor-pointer"
          >
            <ArrowUpNarrowWide className="mr-2 h-3.5 w-3.5 text-green-600" />
            Ascendente
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => column.toggleSorting(true)}
            className="cursor-pointer"
          >
            <ArrowDownWideNarrow className="mr-2 h-3.5 w-3.5 text-red-600" />
            Descendente
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
