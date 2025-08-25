"use client";

import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Label } from "@radix-ui/react-label";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 50],
}: DataTablePaginationProps<TData>) {
  // Obtener el número total de páginas
  const totalPages = table.getPageCount();

  // Obtener la página actual (0-indexed)
  const currentPage = table.getState().pagination.pageIndex;

  // Detectar si es móvil
  const isMobile = useIsMobile();

  // Calcular qué números de página mostrar
  const getPageNumbers = () => {
    const pages = [];

    // Siempre mostrar la primera página
    if (totalPages > 0) {
      pages.push(0);
    }

    // En móvil, mostrar menos páginas
    if (isMobile) {
      // Si estamos en una página que no es la primera ni la última, mostrarla
      if (currentPage > 0 && currentPage < totalPages - 1) {
        pages.push(currentPage);
      }
    } else {
      // En desktop, mostrar páginas alrededor de la actual
      for (
        let i = Math.max(1, currentPage - 1);
        i <= Math.min(totalPages - 2, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    }

    // Siempre mostrar la última página si hay más de una
    if (totalPages > 1 && !pages.includes(totalPages - 1)) {
      pages.push(totalPages - 1);
    }

    // Ordenar las páginas
    return pages.sort((a, b) => a - b);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30">
      <div className="flex items-center gap-2">
        <Label className="text-sm text-gray-600 dark:text-gray-400">
          Filas por página:
        </Label>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-16 border-gray-300 dark:border-gray-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <Label className="text-sm text-gray-600 dark:text-gray-400">
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          de {table.getFilteredRowModel().rows.length}
        </Label>
        
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-gray-300 dark:border-gray-600"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-gray-300 dark:border-gray-600"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
