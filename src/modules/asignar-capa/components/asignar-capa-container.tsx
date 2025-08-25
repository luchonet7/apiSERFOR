"use client";

import { FiltrosAsignarCapa } from "./filtros-asignar-capa";
import { TablaAsignarCapa } from "./tabla-asignar-capa";

export function AsignarCapaContainer() {
  return (
    <div className="p-6 space-y-6">
      <FiltrosAsignarCapa />
      <TablaAsignarCapa />
    </div>
  );
}

