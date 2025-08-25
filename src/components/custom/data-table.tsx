"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataTablePagination } from "@/components/custom/data-table-pagination"
import { DataTableSkeleton } from "@/components/custom/data-table-skeleton"
import { useIsMobile } from "@/hooks/use-mobile"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  toolbar?: (table: ReturnType<typeof useReactTable>) => React.ReactNode
  pagination?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  toolbar,
  pagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // Detectar si es móvil
  const isMobile = useIsMobile()

  // Ajustar la visibilidad de columnas según el tamaño de pantalla
  useEffect(() => {
    if (isMobile) {
      // En móvil, ocultar algunas columnas menos importantes
      setColumnVisibility({
        fechaRegistro: false,
        ...columnVisibility,
      })
    }
  }, [isMobile])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  useEffect(() => {
    // Ocultar automáticamente la columna id si existe
    if (table.getAllColumns().find((col) => col.id === "id")) {
      table.getColumn("id")?.toggleVisibility(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Ejecutar solo una vez al montar el componente

  return (
    <div className="space-y-4">
      {toolbar && toolbar(table as any)}
      <div className="rounded-md border border-gray-200 overflow-hidden dark:border-stone-900">
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <Table className="w-full overflow-x-auto">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-none">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="py-2 px-6 bg-gray-200 dark:bg-stone-900 text-primary font-bold">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-t border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-primary/10"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-2 px-6">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No hay resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {pagination && <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />}
    </div>
  )
}
