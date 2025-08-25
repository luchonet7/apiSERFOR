"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { IconButton } from "@/components/custom/icon-button";
import { DataTable } from "@/components/custom/data-table";
import { DataTableColumnHeader } from "@/components/custom/data-table-header-column";

// Tipo para las capas geográficas
interface CapaData {
  id: string;
  codigo: string;
  tema: string;
  grupo: string;
  objetoGeografico: string;
}

// Datos mock basados en la imagen
const mockCapas: CapaData[] = [
  {
    id: "1",
    codigo: "060101",
    tema: "ZONIFICACIÓN FORESTAL",
    grupo: "Zonas de Producción Permanente",
    objetoGeografico: "Bosque de Categoría I"
  },
  {
    id: "2",
    codigo: "060101",
    tema: "ZONIFICACIÓN FORESTAL",
    grupo: "Zonas de Producción Permanente",
    objetoGeografico: "Bosque de Categoría II"
  },
  {
    id: "3",
    codigo: "060101",
    tema: "ZONIFICACIÓN FORESTAL",
    grupo: "Zonas de Producción Permanente",
    objetoGeografico: "Bosque de Categoría III"
  },
  {
    id: "4",
    codigo: "060101",
    tema: "ZONIFICACIÓN FORESTAL",
    grupo: "Zonas de Protección y Conservación Ecológica",
    objetoGeografico: "Ecosistema Priorizado para la Conservación de la Biodiversidad"
  },
  {
    id: "5",
    codigo: "060101",
    tema: "ZONIFICACIÓN FORESTAL",
    grupo: "Zonas de Recuperación",
    objetoGeografico: "Zona de Recuperación de la Cobertura Forestal con fines de Producción Maderera"
  },
  {
    id: "6",
    codigo: "060101",
    tema: "ZONIFICACIÓN FORESTAL",
    grupo: "Zonas de Recuperación",
    objetoGeografico: "Zona de Recuperación de la Cobertura Forestal con Fines de Restauración y Conservación"
  },
  {
    id: "7",
    codigo: "060101",
    tema: "ZONIFICACIÓN FORESTAL",
    grupo: "Zonas de Tratamiento Especial",
    objetoGeografico: "Reserva de Tierras para Pueblos Indígenas en Situación de Aislamiento o Contacto Inicial"
  },
  {
    id: "8",
    codigo: "060102",
    tema: "ÁREAS NATURALES PROTEGIDAS",
    grupo: "Parques Nacionales",
    objetoGeografico: "Parque Nacional"
  },
  {
    id: "9",
    codigo: "060103",
    tema: "CONCESIONES MINERAS",
    grupo: "Petitorios Mineros",
    objetoGeografico: "Concesión Minera Metálica"
  },
  {
    id: "10",
    codigo: "060104",
    tema: "TERRITORIOS INDÍGENAS",
    grupo: "Comunidades Nativas",
    objetoGeografico: "Territorio de Comunidad Nativa"
  },
  {
    id: "11",
    codigo: "060105",
    tema: "CUENCAS HIDROGRÁFICAS",
    grupo: "Cuencas Principales",
    objetoGeografico: "Cuenca del Río Amazonas"
  },
  {
    id: "12",
    codigo: "060106",
    tema: "INFRAESTRUCTURA VIAL",
    grupo: "Red Vial Nacional",
    objetoGeografico: "Carretera Nacional"
  },
  {
    id: "13",
    codigo: "060107",
    tema: "LÍMITES POLÍTICO ADMINISTRATIVOS",
    grupo: "Límites Departamentales",
    objetoGeografico: "Límite Departamental"
  }
];

export function TablaCapas() {
  const columns = useMemo<ColumnDef<CapaData>[]>(
    () => [
      {
        accessorKey: "codigo",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Código" />
        ),
        cell: ({ row }) => (
          <div className="font-medium text-center">
            {row.getValue("codigo")}
          </div>
        ),
        size: 100,
      },
      {
        accessorKey: "tema",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tema" />
        ),
        cell: ({ row }) => (
          <div className="font-medium text-left">
            {row.getValue("tema")}
          </div>
        ),
        size: 200,
      },
      {
        accessorKey: "grupo",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Grupo" />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-left max-w-[300px] whitespace-normal leading-relaxed py-2">
            {row.getValue("grupo")}
          </div>
        ),
        enableSorting: false,
        size: 300,
      },
      {
        accessorKey: "objetoGeografico",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Objeto Geográfico" />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-left max-w-[400px] whitespace-normal leading-relaxed py-2">
            {row.getValue("objetoGeografico")}
          </div>
        ),
        size: 400,
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
              tooltip="Editar capa"
              onClick={() => console.log("Editar capa:", row.original.codigo)}
            > 
              <Edit className="h-4 w-4" />
            </IconButton>
            <IconButton
              variant="ghost"
              size="sm"
              color="red"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              tooltip="Eliminar capa"
              onClick={() => console.log("Eliminar capa:", row.original.codigo)}
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

  return (
    <DataTable
      columns={columns}
      data={mockCapas}
      pagination={true}
      pageSize={5}
      pageSizeOptions={[5, 10, 20]}
    />
  );
}
