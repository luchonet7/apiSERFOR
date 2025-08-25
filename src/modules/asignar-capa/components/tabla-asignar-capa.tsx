"use client";

import { useState, useCallback } from "react";
import { TableTree } from "@/components/table/table-tree";
import { Button } from "@/components/ui/button";

// Datos de capas forestales basados en la imagen
const capasForestalesData = [
  {
    id: "tema-06",
    tema: "TEMA 06 ZONIFICACIÓN FORESTAL",
    codigo: "06",
    level: 0,
    children: [
      {
        id: "zona-produccion",
        tema: "Zonas de Producción Permanente",
        codigo: "0601",
        level: 1,
        parentId: "tema-06",
        children: [
          {
            id: "bosque-cat-1",
            tema: "Bosque de Categoría I",
            codigo: "060101",
            level: 2,
            parentId: "zona-produccion",
            isLeaf: true,
            isEnabled: false
          },
          {
            id: "bosque-cat-2",
            tema: "Bosque de Categoría II",
            codigo: "060102",
            level: 2,
            parentId: "zona-produccion",
            isLeaf: true,
            isEnabled: false
          },
          {
            id: "bosque-cat-3",
            tema: "Bosque de Categoría III",
            codigo: "060103",
            level: 2,
            parentId: "zona-produccion",
            isLeaf: true,
            isEnabled: false
          },
          {
            id: "bosque-plantado",
            tema: "Bosque Plantado",
            codigo: "060103",
            level: 2,
            parentId: "zona-produccion",
            isLeaf: true,
            isEnabled: false
          }
        ]
      },
      {
        id: "zona-proteccion",
        tema: "Zonas de Protección y Conservación Ecológica",
        codigo: "0602",
        level: 1,
        parentId: "tema-06",
        isLeaf: true,
        isEnabled: false
      },
      {
        id: "zona-recuperacion",
        tema: "Zonas de Recuperación",
        codigo: "0603",
        level: 1,
        parentId: "tema-06",
        isLeaf: true,
        isEnabled: false
      },
      {
        id: "zona-tratamiento",
        tema: "Zonas de Tratamiento Especial",
        codigo: "0604",
        level: 1,
        parentId: "tema-06",
        isLeaf: true,
        isEnabled: false
      }
    ]
  },
  {
    id: "tema-07",
    tema: "TEMA 07 ORDENAMIENTO FORESTAL",
    codigo: "07",
    level: 0,
    isLeaf: true,
    isEnabled: false
  },
  {
    id: "tema-08",
    tema: "TEMA 08 MODALIDAD DE ACCESO",
    codigo: "08",
    level: 0,
    isLeaf: true,
    isEnabled: false
  },
  {
    id: "tema-09",
    tema: "TEMA 09 MONITOREO, CONTROL Y VIGILANCIA",
    codigo: "09",
    level: 0,
    children: [
      {
        id: "control-forestal",
        tema: "Control Forestal",
        codigo: "0901",
        level: 1,
        parentId: "tema-09",
        isLeaf: true,
        isEnabled: false
      },
      {
        id: "vigilancia-satelital",
        tema: "Vigilancia Satelital",
        codigo: "0902",
        level: 1,
        parentId: "tema-09",
        isLeaf: true,
        isEnabled: false
      },
      {
        id: "monitoreo-campo",
        tema: "Monitoreo de Campo",
        codigo: "0903",
        level: 1,
        parentId: "tema-09",
        isLeaf: true,
        isEnabled: false
      }
    ]
  }
];

export function TablaAsignarCapa() {
  const [selectedCapas, setSelectedCapas] = useState<any[]>([]);

  const handleSelectionChange = useCallback((nodes: any[]) => {
    setSelectedCapas(nodes);
    console.log("Capas seleccionadas:", nodes);
  }, []);

  const handleGuardar = () => {
    console.log("Guardar capas asignadas:", selectedCapas);
    // Aquí iría la lógica para guardar las capas asignadas
  };

  const handleCancelar = () => {
    console.log("Cancelar asignación");
    setSelectedCapas([]);
    // Aquí iría la lógica para cancelar o navegar atrás
  };

  return (
    <div className="space-y-6">
      {/* Tabla jerárquica de capas */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <TableTree
          data={capasForestalesData}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      {/* Información de estado */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 px-4">
        <div className="flex items-center space-x-4">
          <span>Filas por página: 5</span>
          <span>1-5 de 13</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Capas habilitadas: {selectedCapas.length}</span>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex items-center justify-end space-x-4 pt-4">
        <Button
          variant="outline"
          onClick={handleCancelar}
          className="px-8"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleGuardar}
          className="px-8 bg-green-600 hover:bg-green-700 text-white"
          disabled={selectedCapas.length === 0}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}

