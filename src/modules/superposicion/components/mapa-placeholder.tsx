"use client";

import { useState } from "react";
import { MapaInteractivo } from "./mapa-interactivo";
import { AmbitoConsulta } from "../types/ambito-consulta";

interface MapaPlaceholderProps {
  ambitos?: AmbitoConsulta[];
  onAmbitosChange?: (ambitos: AmbitoConsulta[]) => void;
  onNavigateToAmbito?: (ambitoId: string) => void;
}

export function MapaPlaceholder ({ ambitos: externalAmbitos, onAmbitosChange, onNavigateToAmbito }: MapaPlaceholderProps) {
  const [internalAmbitos, setInternalAmbitos] = useState<AmbitoConsulta[]>([]);

  const ambitos = externalAmbitos || internalAmbitos;
  const setAmbitos = onAmbitosChange || setInternalAmbitos;

  return (
    <MapaInteractivo
      ambitos={ambitos}
      onAmbitosChange={setAmbitos}
      onNavigateToAmbito={onNavigateToAmbito}
    />
  );
}

