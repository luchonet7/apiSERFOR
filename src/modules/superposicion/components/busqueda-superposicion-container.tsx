"use client";

import { FiltrosBusqueda } from "./filtros-busqueda";
import { TablaBusquedaResultados } from "./tabla-busqueda-resultados";

export function BusquedaSuperposicionContainer() {
  return (
    <div className="p-6 space-y-6">
      <FiltrosBusqueda />
      <TablaBusquedaResultados />
    </div>
  );
}
