"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CapaFormDialog } from "./form/capa-form-dialog";

export function FiltrosCapas() {
  const [filtro, setFiltro] = useState("");
  const [nombre, setNombre] = useState("");
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const handleBuscar = () => {
    // Lógica de búsqueda aquí (por ahora solo presentacional)
    console.log("Buscando capas...", { filtro, nombre });
  };

  const handleNuevo = () => {
    setOpenFormDialog(true);
  };

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Filtro Dropdown */}
        <div className="space-y-2">
          <Label htmlFor="filtro">Filtro :</Label>
          <Select value={filtro} onValueChange={setFiltro}>
            <SelectTrigger id="filtro" className="w-full border-lime-700">
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="zonificacion-forestal">Zonificación Forestal</SelectItem>
              <SelectItem value="areas-protegidas">Áreas Protegidas</SelectItem>
              <SelectItem value="concesiones-mineras">Concesiones Mineras</SelectItem>
              <SelectItem value="territorios-indigenas">Territorios Indígenas</SelectItem>
              <SelectItem value="cuencas-hidrograficas">Cuencas Hidrográficas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Nombre */}
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            placeholder="Ingrese nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border-lime-700"
          />
        </div>

        {/* Botones */}
        <div className="flex gap-2 justify-end md:justify-start">
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
      <CapaFormDialog
        open={openFormDialog}
        onOpenChange={setOpenFormDialog}
      />
    </div>
  );
}
