"use client";

import { FiltrosAsignarSolicitud } from "./filtros-asignar-solicitud";
import { TablaAsignarSolicitud } from "./tabla-asignar-solicitud";

export function AsignarSolicitudContainer() {
  return (
    <div className="p-6 space-y-6">
      <FiltrosAsignarSolicitud />
      <TablaAsignarSolicitud />
    </div>
  );
}
