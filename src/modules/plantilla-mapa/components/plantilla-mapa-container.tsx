"use client";

import { FiltrosPlantillaMapa } from "./filtros-plantilla-mapa";
import { TablaPlantillaMapa } from "./tabla-plantilla-mapa";

export function PlantillaMapaContainer() {
  return (
    <div className="p-6 space-y-6">
      <FiltrosPlantillaMapa />
      <TablaPlantillaMapa />
    </div>
  );
}
