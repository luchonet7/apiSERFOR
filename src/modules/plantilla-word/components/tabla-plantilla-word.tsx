"use client";

import { useMemo, useState, useCallback } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { IconButton } from "@/components/custom/icon-button";
import { TableSelect } from "@/components/table/table-select";
import { DataTableColumnHeader } from "@/components/custom/data-table-header-column";

// Tipo para las plantillas Word
interface PlantillaWordData {
  id: string;
  plantilla: string;
  tipoSolicitud: string;
}

// Datos mock basados en la imagen
const mockPlantillas: PlantillaWordData[] = [
  {
    id: "1",
    plantilla: "Template.docx",
    tipoSolicitud: "Solicitud de Permisos para el aprovechamiento de productos forestales"
  },
  {
    id: "2", 
    plantilla: "Template2.docx",
    tipoSolicitud: "Superposición para la declaración de Manejo de vicuñas de camélidos sudamericanos silvestres a nivel nacional"
  },
  {
    id: "3",
    plantilla: "Template3.docx", 
    tipoSolicitud: "Solicitudes sobre No superposición a BPP para áreas de interés"
  },
  {
    id: "4",
    plantilla: "PlantillaAnalisis.docx",
    tipoSolicitud: "Análisis de superposición de petitorios mineros"
  },
  {
    id: "5",
    plantilla: "PlantillaInforme.docx",
    tipoSolicitud: "Solicitud de Permisos para el aprovechamiento de productos forestales"
  },
  {
    id: "6",
    plantilla: "TemplateEspecial.docx",
    tipoSolicitud: "Superposición para la declaración de Manejo de vicuñas de camélidos sudamericanos silvestres a nivel nacional"
  },
  {
    id: "7",
    plantilla: "InformeTecnico.docx", 
    tipoSolicitud: "Solicitudes sobre No superposición a BPP para áreas de interés"
  },
  {
    id: "8",
    plantilla: "PlantillaMineria.docx",
    tipoSolicitud: "Análisis de superposición de petitorios mineros"
  },
  {
    id: "9",
    plantilla: "TemplateForestal.docx",
    tipoSolicitud: "Solicitud de Permisos para el aprovechamiento de productos forestales"
  },
  {
    id: "10",
    plantilla: "PlantillaVicunas.docx",
    tipoSolicitud: "Superposición para la declaración de Manejo de vicuñas de camélidos sudamericanos silvestres a nivel nacional"
  },
  {
    id: "11",
    plantilla: "TemplateBPP.docx",
    tipoSolicitud: "Solicitudes sobre No superposición a BPP para áreas de interés"
  },
  {
    id: "12",
    plantilla: "InformeFinal.docx",
    tipoSolicitud: "Análisis de superposición de petitorios mineros"
  },
  {
    id: "13",
    plantilla: "PlantillaEstandar.docx",
    tipoSolicitud: "Solicitud de Permisos para el aprovechamiento de productos forestales"
  }
];

export function TablaPlantillaWord() {
  const [selectedPlantillas, setSelectedPlantillas] = useState<PlantillaWordData[]>([]);

  const columns = useMemo<ColumnDef<PlantillaWordData>[]>(
    () => [
      {
        accessorKey: "plantilla",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Plantilla" />
        ),
        cell: ({ row }) => (
          <div className="font-medium text-left">
            {row.getValue("plantilla")}
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
              tooltip="Editar plantilla"
              onClick={() => console.log("Editar:", row.original.plantilla)}
            > 
              <Edit className="h-4 w-4" />
            </IconButton>
            <IconButton
              variant="ghost"
              size="sm"
              color="red"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              tooltip="Eliminar plantilla"
              onClick={() => console.log("Eliminar:", row.original.plantilla)}
            >
              <Trash2 className="h-4 w-4" />
            </IconButton>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 100,
      },
    ],
    []
  );

  const handleSelectionChange = useCallback((rows: PlantillaWordData[]) => {
    setSelectedPlantillas(rows);
    console.log("Plantillas seleccionadas:", rows);
  }, []);

  return (
    <div className="space-y-4">
      <TableSelect
        columns={columns}
        data={mockPlantillas}
        onSelectionChange={handleSelectionChange}
        multiSelect={true}
        pagination={true}
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
      />

      {/* Información adicional de selección si es necesaria */}
      {selectedPlantillas.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {selectedPlantillas.length} plantilla(s) seleccionada(s) para operaciones en lote
        </div>
      )}
    </div>
  );
}
