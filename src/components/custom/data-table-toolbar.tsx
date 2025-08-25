"use client"

import type React from "react"

import type { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey?: string
  searchPlaceholder?: string
  filters?: {
    column: string
    title: string
    options: { label: string; value: string; icon?: React.ReactNode }[]
  }[]
  actions?: React.ReactNode
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Buscar...",
  filters = [],
  actions
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-1 items-center space-x-2">
          {searchKey && (
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
              className="max-w-[50vw] xl:max-w-sm border-gray-300 focus:border-gray-400 focus:ring-gray-400"
            />
          )}
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          {actions}
        </div>
      </div>
    </div>
  )
}
