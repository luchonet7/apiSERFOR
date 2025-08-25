"use client";

import { IconButton } from "@/components/custom/icon-button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Trash2 } from "lucide-react";

interface AmbitoConsultaFormProps {
  data: any;
  onChange: (data: any) => void;
}

const areas = [
];

export function AmbitoConsultaForm ({ data, onChange }: AmbitoConsultaFormProps) {
  const handleAreaChange = (areaId: string, checked: boolean) => {
    const updatedAreas = checked
      ? [...data.areas, areaId]
      : data.areas.filter((id: string) => id !== areaId);

    onChange({
      ...data,
      areas: updatedAreas
    });
  };

  return (
    <div className="space-y-4">

    </div>
  );
}

