"use client";

import { useMemo, useState, useCallback } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { IconButton } from "@/components/custom/icon-button";
import { TableSelect } from "@/components/table/table-select";
import { DataTableColumnHeader } from "@/components/custom/data-table-header-column";

// Tipo para las asignaciones de solicitud a usuario
interface AsignacionSolicitudData {
  id: string;
  usuario: string;
  tipoSolicitud: string;
}

// Datos mock basados en la imagen
const mockAsignaciones: AsignacionSolicitudData[] = [
  {
    id: "1",
    usuario: "Rossana Paganini",
    tipoSolicitud: "Solicitud de Permisos para el aprovechamiento de productos forestales"
  },
  {
    id: "2",
    usuario: "Rossana Paganini",
    tipoSolicitud: "Superposición para la declaración de Manejo de vicuñas de camélidos sudamericanos silvestres a nivel nacional"
  },
  {
    id: "3",
    usuario: "Ana Mendoza",
    tipoSolicitud: "Solicitudes sobre No superposición a BPP para áreas de interés"
  },
  {
    id: "4",
    usuario: "Carlos Rodríguez",
    tipoSolicitud: "Análisis de superposición de petitorios mineros"
  },
  {
    id: "5",
    usuario: "María García",
    tipoSolicitud: "Solicitud de Permisos para el aprovechamiento de productos forestales"
  },
  {
    id: "6",
    usuario: "Luis Torres",
    tipoSolicitud: "Superposición para la declaración de Manejo de vicuñas de camélidos sudamericanos silvestres a nivel nacional"
  },
  {
    id: "7",
    usuario: "Sofía Vargas",
    tipoSolicitud: "Solicitudes sobre No superposición a BPP para áreas de interés"
  },
  {
    id: "8",
    usuario: "Diego Morales",
    tipoSolicitud: "Análisis de superposición de petitorios mineros"
  },
  {
    id: "9",
    usuario: "Patricia Silva",
    tipoSolicitud: "Solicitud de Permisos para el aprovechamiento de productos forestales"
  },
  {
    id: "10",
    usuario: "Ana Mendoza",
    tipoSolicitud: "Superposición para la declaración de Manejo de vicuñas de camélidos sudamericanos silvestres a nivel nacional"
  },
  {
    id: "11",
    usuario: "Rossana Paganini",
    tipoSolicitud: "Análisis de superposición de petitorios mineros"
  },
  {
    id: "12",
    usuario: "Carlos Rodríguez",
    tipoSolicitud: "Solicitudes sobre No superposición a BPP para áreas de interés"
  },
  {
    id: "13",
    usuario: "María García",
    tipoSolicitud: "Superposición para la declaración de Manejo de vicuñas de camélidos sudamericanos silvestres a nivel nacional"
  }
];

export function TablaAsignarSolicitud() {
  const [selectedAsignaciones, setSelectedAsignaciones] = useState<AsignacionSolicitudData[]>([]);

  const columns = useMemo<ColumnDef<AsignacionSolicitudData>[]>(
    () => [
      {
        accessorKey: "usuario",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Usuario" />
        ),
        cell: ({ row }) => (
          <div className="font-medium text-left">
            {row.getValue("usuario")}
          </div>
        ),
        size: 200,
      },
      {
        accessorKey: "tipoSolicitud",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tipo de Solicitud" />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-left max-w-[500px] whitespace-normal leading-relaxed py-2">
            {row.getValue("tipoSolicitud")}
          </div>
        ),
        enableSorting: false,
      },
      {
        id: "acciones",
        header: () => <div className="text-center font-semibold">Acciones</div>,
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-1">
            <IconButton
              variant="ghost"
              size="sm"
              color="blue"
              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
              tooltip="Editar asignación"
              onClick={() => console.log("Editar asignación:", row.original.usuario, "->", row.original.tipoSolicitud)}
            > 
              <Edit className="h-4 w-4" />
            </IconButton>
            <IconButton
              variant="ghost"
              size="sm"
              color="red"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              tooltip="Eliminar asignación"
              onClick={() => console.log("Eliminar asignación:", row.original.usuario, "->", row.original.tipoSolicitud)}
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

  const handleSelectionChange = useCallback((rows: AsignacionSolicitudData[]) => {
    setSelectedAsignaciones(rows);
    console.log("Asignaciones seleccionadas:", rows);
  }, []);

  return (
    <div className="space-y-4">
      <TableSelect
        columns={columns}
        data={mockAsignaciones}
        onSelectionChange={handleSelectionChange}
        multiSelect={true}
        pagination={true}
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
      />

      {/* Información adicional de selección si es necesaria */}
      {selectedAsignaciones.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {selectedAsignaciones.length} asignación(es) seleccionada(s) para operaciones en lote
        </div>
      )}
    </div>
  );
}
