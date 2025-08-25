"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Search, Edit, Trash2 } from "lucide-react";
import { IconButton } from "@/components/custom/icon-button";
import { DataTable } from "@/components/custom/data-table";
import { DataTableColumnHeader } from "@/components/custom/data-table-header-column";

// Tipo para los datos de la tabla
interface SuperposicionData {
  id: string;
  nroExp: string;
  asunto: string;
  tipoSolicitud: string;
  profesional: string;
}

// Datos mock basados en la imagen
const mockDataBase: SuperposicionData = {
  id: "1",
  nroExp: "2025-0016083",
  asunto: "Atención a consulta formulada sobre 748 petitorios mineros, en el marco de lo regulado en el artículo N° 62 de la Ley N° 29763, Ley Forestal y de Fauna Silvestre.",
  tipoSolicitud: "Análisis de superposición de petitorios mineros",
  profesional: "Lenin Ventura"
};

// Simular datos para la paginación
const allData: SuperposicionData[] = Array.from({ length: 13 }, (_, index) => ({
  ...mockDataBase,
  id: `${index + 1}`,
  nroExp: `2025-00160${83 + index}`,
}));

export function TablaBusquedaResultados() {
  const columns = useMemo<ColumnDef<SuperposicionData>[]>(
    () => [
      {
        accessorKey: "nroExp",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nro Exp." />
        ),
        cell: ({ row }) => (
          <div className="font-medium text-center">
            {row.getValue("nroExp")}
          </div>
        ),
        size: 150,
      },
      {
        accessorKey: "asunto",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Asunto" />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-left max-w-[400px] min-w-[300px] whitespace-normal leading-relaxed py-2">
            {row.getValue("asunto")}
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "tipoSolicitud",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tipo Solicitud" />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-center max-w-[200px] min-w-[150px] whitespace-normal leading-relaxed py-2">
            {row.getValue("tipoSolicitud")}
          </div>
        ),
        enableSorting: false,
        size: 200,
      },
      {
        accessorKey: "profesional",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Profesional" />
        ),
        cell: ({ row }) => (
          <div className="text-center font-medium">
            {row.getValue("profesional")}
          </div>
        ),
        size: 150,
      },
      {
        id: "acciones",
        header: () => <div className="text-center font-semibold">Acciones</div>,
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-1">
            <IconButton
              variant="ghost"
              color="green"
              size="sm"
              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
              tooltip="Ver superposición"
              onClick={() => console.log("Ver:", row.original.nroExp)}
            >
              <Search className="h-4 w-4" />
            </IconButton>
            <IconButton
              variant="ghost"
              size="sm"
              color="blue"
              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
              tooltip="Editar"
              onClick={() => console.log("Editar:", row.original.nroExp)}
            > 
              <Edit className="h-4 w-4" />
            </IconButton>
            <IconButton
              variant="ghost"
              size="sm"
              color="red"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              tooltip="Eliminar"
              onClick={() => console.log("Eliminar:", row.original.nroExp)}
            >
              <Trash2 className="h-4 w-4" />
            </IconButton>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 120,
      },
    ],
    []
  );

  return (
    <DataTable
      columns={columns}
      data={allData}
      pagination={true}
      pageSize={5}
      pageSizeOptions={[5, 10, 20]}
    />
  );
}
