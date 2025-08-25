"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlantillaMapaFormDialog } from "./form/plantilla-mapa-form-dialog";

export function FiltrosPlantillaMapa() {
  const [tipoSolicitud, setTipoSolicitud] = useState("");
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const handleBuscar = () => {
    // Lógica de búsqueda aquí (por ahora solo presentacional)
    console.log("Buscando plantillas de mapa...", { tipoSolicitud });
  };

  const handleNuevo = () => {
    setOpenFormDialog(true);
  };

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        {/* Tipo de Solicitud */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="tipo-solicitud">Tipo de Solicitud :</Label>
          <Select value={tipoSolicitud} onValueChange={setTipoSolicitud}>
            <SelectTrigger id="tipo-solicitud" className="w-full border-lime-700">
              <SelectValue placeholder="Seleccione tipo solicitud" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="permisos-forestales">
                Solicitud de Permisos para el aprovechamiento de productos forestales
              </SelectItem>
              <SelectItem value="superposicion-vicunas">
                Superposición para la declaración de Manejo de vicuñas de camélidos sudamericanos silvestres a nivel nacional
              </SelectItem>
              <SelectItem value="no-superposicion-bpp">
                Solicitudes sobre No superposición a BPP para áreas de interés
              </SelectItem>
              <SelectItem value="analisis-superposicion">
                Análisis de superposición de petitorios mineros
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <Button 
            onClick={handleBuscar}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            Buscar
          </Button>
          <Button 
            variant="outline"
            onClick={handleNuevo}
            className="px-6 border-lime-700 text-lime-700 hover:bg-lime-700 dark:border-lime-700 dark:text-lime-700 dark:hover:bg-lime-700 dark:hover:text-white"
          >
            Nuevo
          </Button>
        </div>
      </div>

      {/* Dialog del formulario */}
      <PlantillaMapaFormDialog
        open={openFormDialog}
        onOpenChange={setOpenFormDialog}
      />
    </div>
  );
}
