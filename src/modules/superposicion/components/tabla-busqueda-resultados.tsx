"use client";

import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { IconButton } from "@/components/custom/icon-button";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom/data-table";
import { DataTableColumnHeader } from "@/components/custom/data-table-header-column";
import { FormularioSuperposicion } from "./formulario-superposicion";
import { ConfirmacionEliminar } from "./confirmacion-eliminar";
import { DetalleSuperposicion } from "./detalle-superposicion";
import { SuperposicionData, SuperposicionFormData } from "../types/superposicion.types";

interface TablaBusquedaResultadosProps {
  data: SuperposicionData[];
  onDataChange: (data: SuperposicionData[]) => void;
  onNavegarASuperposicion?: () => void;
}

export function TablaBusquedaResultados ({ data, onDataChange, onNavegarASuperposicion }: TablaBusquedaResultadosProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState<SuperposicionData | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<SuperposicionData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<SuperposicionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función para generar nuevo ID
  const generateNewId = () => {
    const maxId = Math.max(...data.map(item => parseInt(item.id)), 0);
    return (maxId + 1).toString();
  };

  // Función para agregar nuevo registro
  const handleAdd = (formData: SuperposicionFormData) => {
    const newItem: SuperposicionData = {
      ...formData,
      id: generateNewId()
    };
    const newData = [newItem, ...data];
    onDataChange(newData);
  };

  // Función para editar registro
  const handleEdit = (formData: SuperposicionFormData) => {
    if (editData) {
      const newData = data.map(item =>
        item.id === editData.id
          ? { ...formData, id: editData.id }
          : item
      );
      onDataChange(newData);
    }
  };

  // Función para eliminar registro
  const handleDelete = async () => {
    if (deleteItem) {
      setIsLoading(true);
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newData = data.filter(item => item.id !== deleteItem.id);
      onDataChange(newData);
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setDeleteItem(null);
    }
  };

  // Función para abrir formulario de edición
  const openEditForm = (item: SuperposicionData) => {
    setEditData(item);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  // Función para abrir formulario de agregar (ahora navega a superposición)
  const openAddForm = () => {
    if (onNavegarASuperposicion) {
      onNavegarASuperposicion();
    } else {
      // Fallback: abrir modal si no hay función de navegación
      setEditData(null);
      setIsEditMode(false);
      setIsFormOpen(true);
    }
  };

  // Función para abrir diálogo de eliminación
  const openDeleteDialog = (item: SuperposicionData) => {
    setDeleteItem(item);
    setIsDeleteDialogOpen(true);
  };

  // Función para abrir detalle
  const openDetail = (item: SuperposicionData) => {
    setDetailData(item);
    setIsDetailOpen(true);
  };

  const columns = useMemo<ColumnDef<SuperposicionData>[]>(
    () => [
      {
        accessorKey: "nroExp",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nro. Expediente" />
        ),
        cell: ({ row }) => (
          <div className="font-medium text-center text-xs">
            {row.getValue("nroExp")}
          </div>
        ),
        size: 140,
      },
      {
        accessorKey: "asunto",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Asunto" />
        ),
        cell: ({ row }) => (
          <div className="text-xs text-left max-w-[350px] min-w-[250px] whitespace-normal leading-tight py-1">
            {row.getValue("asunto")}
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "tipoSolicitud",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tipo de Solicitud" />
        ),
        cell: ({ row }) => (
          <div className="text-xs text-center max-w-[180px] min-w-[140px] whitespace-normal leading-tight py-1">
            {row.getValue("tipoSolicitud")}
          </div>
        ),
        enableSorting: false,
        size: 180,
      },
      {
        accessorKey: "profesional",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Profesional" />
        ),
        cell: ({ row }) => (
          <div className="text-center font-medium text-xs">
            {row.getValue("profesional")}
          </div>
        ),
        size: 140,
      },
      {
        id: "acciones",
        header: () => <div className="text-center font-semibold text-xs">Acciones</div>,
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-1">
            <IconButton
              variant="ghost"
              color="green"
              size="sm"
              className="h-7 w-7 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
              tooltip="Ver superposición"
              onClick={() => openDetail(row.original)}
            >
              <Search className="h-3 w-3" />
            </IconButton>
            <IconButton
              variant="ghost"
              size="sm"
              color="blue"
              className="h-7 w-7 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
              tooltip="Editar"
              onClick={() => openEditForm(row.original)}
            >
              <Edit className="h-3 w-3" />
            </IconButton>
            <IconButton
              variant="ghost"
              size="sm"
              color="red"
              className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              tooltip="Eliminar"
              onClick={() => openDeleteDialog(row.original)}
            >
              <Trash2 className="h-3 w-3" />
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
    <div className="space-y-3">
      {/* Botón Agregar */}
      <div className="flex justify-end">
        <Button
          onClick={openAddForm}
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white shadow-sm text-xs h-8 px-3"
          title="Crear nueva superposición"
        >
          <Plus className="h-3 w-3 mr-1" />
          Agregar Superposición
        </Button>
      </div>

      {/* Tabla */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <DataTable
          columns={columns}
          data={data}
          pagination={true}
          pageSize={8}
          pageSizeOptions={[8, 15, 25]}
        />
      </div>

      {/* Formulario Modal */}
      <FormularioSuperposicion
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditData(null);
          setIsEditMode(false);
        }}
        onSubmit={isEditMode ? handleEdit : handleAdd}
        editData={editData}
        isEditing={isEditMode}
      />

      {/* Diálogo de confirmación de eliminación */}
      <ConfirmacionEliminar
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeleteItem(null);
        }}
        onConfirm={handleDelete}
        itemName={deleteItem?.nroExp || ""}
        isLoading={isLoading}
      />

      {/* Modal de detalle */}
      <DetalleSuperposicion
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setDetailData(null);
        }}
        data={detailData}
      />
    </div>
  );
}
