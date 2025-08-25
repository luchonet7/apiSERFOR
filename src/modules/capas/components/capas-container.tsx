"use client";

import { FiltrosCapas } from "./filtros-capas";
import { TablaCapas } from "./tabla-capas";

export function CapasContainer() {
  return (
    <div className="p-6 space-y-6">
      <FiltrosCapas />
      <TablaCapas />
    </div>
  );
}
