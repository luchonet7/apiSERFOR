"use client";

import { useState } from "react";
import { CustomDialog } from "@/components/custom/custom-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface PlantillaMapaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  tipoSolicitud: string;
  urlRest: string;
  formato: string;
  orientacion: string;
}

export function PlantillaMapaFormDialog({ open, onOpenChange }: PlantillaMapaFormDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    tipoSolicitud: "",
    urlRest: "",
    formato: "",
    orientacion: "",
  });

  // Tipos de solicitud disponibles
  const tiposSolicitud = [
    {
      value: "permisos-forestales",
      label: "Solicitud de Permisos para el aprovechamiento de productos forestales"
    },
    {
      value: "superposicion-vicunas", 
      label: "Superposición para la declaración de Manejo de vicuñas de camélidos sudamericanos silvestres a nivel nacional"
    },
    {
      value: "no-superposicion-bpp",
      label: "Solicitudes sobre No superposición a BPP para áreas de interés"
    },
    {
      value: "analisis-superposicion",
      label: "Análisis de superposición de petitorios mineros"
    }
  ];

  // Formatos de hoja disponibles
  const formatosHoja = [
    { value: "a4", label: "A4" },
    { value: "a3", label: "A3" },
    { value: "a2", label: "A2" },
    { value: "a1", label: "A1" },
    { value: "a0", label: "A0" },
    { value: "letter", label: "Letter" },
    { value: "legal", label: "Legal" },
    { value: "tabloid", label: "Tabloid" }
  ];

  // Orientaciones disponibles
  const orientaciones = [
    { value: "portrait", label: "Vertical (Portrait)" },
    { value: "landscape", label: "Horizontal (Landscape)" }
  ];

  // Manejar cambio de tipo de solicitud
  const handleTipoSolicitudChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      tipoSolicitud: value
    }));
  };

  // Manejar cambio de URL
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      urlRest: e.target.value
    }));
  };

  // Manejar cambio de formato
  const handleFormatoChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      formato: value
    }));
  };

  // Manejar cambio de orientación
  const handleOrientacionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      orientacion: value
    }));
  };

  // Manejar guardado
  const handleGuardar = () => {
    if (!formData.tipoSolicitud) {
      toast.error("Error", {
        description: "Por favor seleccione el tipo de solicitud",
        duration: 3000,
      });
      return;
    }

    if (!formData.urlRest.trim()) {
      toast.error("Error", {
        description: "Por favor ingrese la URL del rest",
        duration: 3000,
      });
      return;
    }

    if (!formData.formato) {
      toast.error("Error", {
        description: "Por favor seleccione el formato de hoja",
        duration: 3000,
      });
      return;
    }

    if (!formData.orientacion) {
      toast.error("Error", {
        description: "Por favor seleccione la orientación",
        duration: 3000,
      });
      return;
    }

    // Validar URL básica
    try {
      new URL(formData.urlRest);
    } catch {
      toast.error("Error", {
        description: "Por favor ingrese una URL válida",
        duration: 3000,
      });
      return;
    }

    // Aquí iría la lógica para guardar
    console.log("Guardando plantilla de mapa:", formData);
    
    toast.success("Plantilla de mapa guardada exitosamente", {
      duration: 3000,
    });

    // Resetear formulario y cerrar
    handleCancelar();
  };

  // Manejar cancelación
  const handleCancelar = () => {
    setFormData({
      tipoSolicitud: "",
      urlRest: "",
      formato: "",
      orientacion: "",
    });
    onOpenChange(false);
  };

  // Verificar si el formulario es válido
  const isFormValid = formData.tipoSolicitud && 
                     formData.urlRest.trim() && 
                     formData.formato && 
                     formData.orientacion;

  return (
    <CustomDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Registro de Plantilla Mapa"
      description="Complete la información para registrar una nueva plantilla de mapa"
      size="large"
    >
      <div className="space-y-6">
        {/* Tipo de Solicitud */}
        <div className="space-y-2">
          <Label htmlFor="tipo-solicitud">Tipo de Solicitud :</Label>
          <Select value={formData.tipoSolicitud} onValueChange={handleTipoSolicitudChange}>
            <SelectTrigger id="tipo-solicitud" className="w-full border-lime-700">
              <SelectValue placeholder="Seleccione tipo solicitud" />
            </SelectTrigger>
            <SelectContent>
              {tiposSolicitud.map((tipo) => (
                <SelectItem key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* URL del rest */}
        <div className="space-y-2">
          <Label htmlFor="url-rest">URL del rest :</Label>
          <Input
            id="url-rest"
            type="url"
            placeholder="Ingrese el usuario"
            value={formData.urlRest}
            onChange={handleUrlChange}
            className="w-full"
          />
        </div>

        {/* Formato */}
        <div className="space-y-2">
          <Label htmlFor="formato">Formato :</Label>
          <Select value={formData.formato} onValueChange={handleFormatoChange}>
            <SelectTrigger id="formato" className="w-full border-lime-700">
              <SelectValue placeholder="Seleccione formato de hoja" />
            </SelectTrigger>
            <SelectContent>
              {formatosHoja.map((formato) => (
                <SelectItem key={formato.value} value={formato.value}>
                  {formato.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Orientación */}
        <div className="space-y-2">
          <Label htmlFor="orientacion">Orientación :</Label>
          <Select value={formData.orientacion} onValueChange={handleOrientacionChange}>
            <SelectTrigger id="orientacion" className="w-full border-lime-700">
              <SelectValue placeholder="Seleccione orientación" />
            </SelectTrigger>
            <SelectContent>
              {orientaciones.map((orientacion) => (
                <SelectItem key={orientacion.value} value={orientacion.value}>
                  {orientacion.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleGuardar}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            disabled={!isFormValid}
          >
            Guardar
          </Button>
          <Button
            onClick={handleCancelar}
            variant="outline"
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </CustomDialog>
  );
}
