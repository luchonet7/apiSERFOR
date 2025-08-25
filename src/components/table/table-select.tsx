"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTablePagination } from "@/components/custom/data-table-pagination"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface TableSelectProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onSelectionChange?: (selectedRows: TData[]) => void
  multiSelect?: boolean
  className?: string
  maxHeight?: string
  pagination?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
}

export function TableSelect<TData, TValue>({
  columns,
  data,
  onSelectionChange,
  multiSelect = true,
  className,
  maxHeight = "400px",
  pagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
}: TableSelectProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  // Crear columnas con checkbox de selección
  const selectColumns: ColumnDef<TData, TValue>[] = [
    {
      id: "select",
      header: ({ table }) => 
        multiSelect ? (
          <Checkbox
            checked={
              pagination 
                ? table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
                : table.getIsAllRowsSelected() || (table.getIsSomeRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              if (pagination) {
                table.toggleAllPageRowsSelected(!!value)
              } else {
                table.toggleAllRowsSelected(!!value)
              }
            }}
            aria-label={pagination ? "Seleccionar página" : "Seleccionar todo"}
            className="translate-y-[2px] border border-primary dark:border-stone-100"
          />
        ) : null,
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (!multiSelect) {
              // En modo single select, deseleccionar todas las demás filas
              setRowSelection({ [row.id]: !!value })
            } else {
              row.toggleSelected(!!value)
            }
          }}
          aria-label="Seleccionar fila"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
    },
    ...columns,
  ]

  const table = useReactTable({
    data,
    columns: selectColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: multiSelect ? setRowSelection : undefined,
    onSortingChange: setSorting,
    state: {
      rowSelection,
      sorting,
    },
    enableRowSelection: true,
    enableMultiRowSelection: multiSelect,
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  // Notificar cambios de selección
  useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = table.getSelectedRowModel().rows.map(row => row.original)
      onSelectionChange(selectedRows)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection])

  return (
    <div className={cn("space-y-4", className)}>
      {/* Información de selección en la parte superior */}
      {table.getSelectedRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between bg-lime-50 dark:bg-lime-950/20 border border-lime-200 dark:border-lime-800 rounded-md px-4 py-3">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-lime-700 dark:text-lime-300" />
            <span className="text-sm font-medium text-lime-700 dark:text-lime-300">
              {table.getSelectedRowModel().rows.length} {table.getSelectedRowModel().rows.length === 1 ? 'fila seleccionada' : 'filas seleccionadas'}
            </span>
            <span className="text-sm text-lime-600 dark:text-lime-400">
              {table.getSelectedRowModel().rows.length}
            </span>
          </div>
          <button
            onClick={() => setRowSelection({})}
            className="text-lime-600 hover:text-lime-800 dark:text-lime-400 dark:hover:text-lime-300 underline text-sm"
          >
            Limpiar selección
          </button>
        </div>
      )}
      
      <div className="rounded-md border border-gray-200 overflow-hidden dark:border-stone-900">
        <div 
          className="max-h-[400px] overflow-y-auto"
          style={!pagination ? { maxHeight } : undefined}
        >
          <Table className="w-full">
            <TableHeader className="sticky top-0 bg-white dark:bg-stone-950 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-none">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead 
                        key={header.id} 
                        className={cn(
                          "py-2 px-6 bg-gray-200 dark:bg-stone-900 text-primary font-bold",
                        )}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "border-t border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-primary/10",
                      row.getIsSelected() 
                        ? "bg-lime-50 dark:bg-lime-950/20 border-lime-200 dark:border-lime-800" 
                        : index % 2 === 0 
                          ? "bg-white dark:bg-stone-950/50" 
                          : "bg-gray-50/30 dark:bg-stone-950/30"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id} 
                        className={cn(
                          "py-2 px-6",
                          cell.column.id === "select" && "w-12"
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={selectColumns.length} 
                    className="h-32 text-center text-gray-500 dark:text-gray-400 py-8"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="text-sm font-medium">No hay datos disponibles</div>
                      <div className="text-xs text-gray-400">No se encontraron elementos para mostrar</div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Paginación */}
      {pagination && <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />}
    </div>
  )
}
