"use client";

import { CustomInputControlled } from "@/components/custom/input-controlled";
import { DateInputControlled } from "@/components/custom/date-input-controlled";

interface DatosExpedienteFormProps {
  data: any;
  onChange: (data: any) => void;
}

export function DatosExpedienteForm({ data, onChange }: DatosExpedienteFormProps) {
  const handleChange = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Datos del Expediente
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nro de Expediente :
          </label>
          <CustomInputControlled
            type="text"
            placeholder="Ingrese el usuario"
            value={data.nroExpediente}
            onChange={(e) => handleChange('nroExpediente', e.target.value)}
            maxLength={50}
            allowedCharacters={["letters", "numeric", "symbols"]}
            className="border-lime-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Asunto :
          </label>
          <CustomInputControlled
            type="text"
            placeholder="Ingrese el asunto"
            value={data.asunto}
            onChange={(e) => handleChange('asunto', e.target.value)}
            maxLength={200}
            allowedCharacters={["letters", "numeric", "symbols"]}
            className="border-lime-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fecha :
          </label>
          <DateInputControlled
            value={data.fecha}
            onChange={(e) => handleChange('fecha', e.target.value)}
            placeholder="Fecha"
            className="border-lime-700"
          />
        </div>
      </div>
    </div>
  );
}

