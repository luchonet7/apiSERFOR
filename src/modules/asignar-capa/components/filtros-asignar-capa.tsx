"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FiltrosAsignarCapa() {
  const [tipoSolicitud, setTipoSolicitud] = useState<string>("");

  const tiposSolicitud = [
    "Superposición de petitorios mineros",
    "Permiso de aprovechamiento de productos forestales",
    "Permiso de aprovechamiento forestal en comunidades nativas y campesinas",
    "Permiso de aprovechamiento forestal en predios privados",
    "No superposición a BPP",
    "Autorización de desbosque"
];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Tipo de Solicitud */}
        <div className="space-y-2">
          <Label htmlFor="tipo-solicitud">Tipo de Solicitud :</Label>
          <Select value={tipoSolicitud} onValueChange={setTipoSolicitud}>
            <SelectTrigger id="tipo-solicitud" className="w-full border-lime-700">
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>
            <SelectContent>
              {tiposSolicitud.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Espacio para alineación */}
        <div className="md:col-span-3"></div>
      </div>
    </div>
  );
}

