"use client";

import { FiltrosPlantillaWord } from "./filtros-plantilla-word";
import { TablaPlantillaWord } from "./tabla-plantilla-word";


export function PlantillaWordContainer() {
  return (
    <div className="p-6 space-y-6">
      <FiltrosPlantillaWord />
      <TablaPlantillaWord />
    </div>
  );
}
