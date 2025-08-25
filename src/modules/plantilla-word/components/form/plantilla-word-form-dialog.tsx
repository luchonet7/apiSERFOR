"use client";

import { useState, useCallback } from "react";
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
import { Upload, X, File } from "lucide-react";
import { toast } from "sonner";

interface PlantillaWordFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  tipoSolicitud: string;
  archivo: File | null;
  nombreArchivo: string;
}

export function PlantillaWordFormDialog({ open, onOpenChange }: PlantillaWordFormDialogProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isValidFile, setIsValidFile] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    tipoSolicitud: "",
    archivo: null,
    nombreArchivo: "",
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

  // Validar extensión del archivo
  const validateFileExtension = (file: File): boolean => {
    const validExtensions = ['.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    return validExtensions.includes(fileExtension);
  };

  // Formatear tamaño de archivo
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Manejar cambio de tipo de solicitud
  const handleTipoSolicitudChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      tipoSolicitud: value
    }));
  };

  // Manejar cambio de nombre de archivo
  const handleNombreArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      nombreArchivo: e.target.value
    }));
  };

  // Manejar cambio de archivo
  const handleArchivoChange = useCallback((file: File | null) => {
    if (file && !validateFileExtension(file)) {
      setIsValidFile(false);
      toast.error("Tipo de archivo no válido", {
        description: "Por favor seleccione un archivo .doc o .docx",
        duration: 4000,
      });
      return;
    }
    
    setIsValidFile(true);
    setFormData(prev => ({
      ...prev,
      archivo: file,
      nombreArchivo: file ? file.name.replace(/\.[^/.]+$/, "") : ""
    }));
  }, []);

  // Manejar eliminación de archivo
  const handleRemoveFile = useCallback(() => {
    setIsValidFile(true);
    setFormData(prev => ({
      ...prev,
      archivo: null,
      nombreArchivo: ""
    }));
  }, []);

  // Manejar drop de archivo
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleArchivoChange(files[0]);
    }
  }, [handleArchivoChange]);

  // Manejar drag over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  // Manejar drag leave
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  // Manejar selección de archivo por click
  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleArchivoChange(file);
      }
    };
    input.click();
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

    if (!formData.archivo) {
      toast.error("Error", {
        description: "Por favor seleccione un archivo de plantilla",
        duration: 3000,
      });
      return;
    }

    if (!formData.nombreArchivo.trim()) {
      toast.error("Error", {
        description: "Por favor ingrese el nombre del archivo",
        duration: 3000,
      });
      return;
    }

    // Aquí iría la lógica para guardar
    console.log("Guardando plantilla:", formData);
    
    toast.success("Plantilla guardada exitosamente", {
      duration: 3000,
    });

    // Resetear formulario y cerrar
    handleCancelar();
  };

  // Manejar cancelación
  const handleCancelar = () => {
    setFormData({
      tipoSolicitud: "",
      archivo: null,
      nombreArchivo: "",
    });
    setIsValidFile(true);
    onOpenChange(false);
  };

  return (
    <CustomDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Registro de Plantilla Word"
      description="Complete la información para registrar una nueva plantilla"
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

        {/* Plantilla - Área de carga de archivo */}
        <div className="space-y-2">
          <Label>Plantilla :</Label>
          
          {!formData.archivo ? (
            /* Área de drag & drop */
            <div
              className={`
                border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                ${isDragOver 
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" 
                  : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
                }
              `}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleFileSelect}
            >
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    sin archivo
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileSelect();
                    }}
                  >
                    Seleccione archivo
                  </Button>
                </div>

                <div className="text-xs text-gray-400">
                  <p>Tipos aceptados: .doc, .docx</p>
                </div>
              </div>
            </div>
          ) : (
            /* Archivo seleccionado */
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <File className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {formData.archivo.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(formData.archivo.size)}
                    </p>
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="text-gray-500 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Botón Cargar */}
          {formData.archivo && (
            <Button 
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 text-white mt-3"
            >
              Cargar
            </Button>
          )}
        </div>

        {/* Nombre del archivo */}
        <div className="space-y-2">
          <Label htmlFor="nombre-archivo">Nombre del archivo :</Label>
          <Input
            id="nombre-archivo"
            type="text"
            placeholder="Ingrese el usuario"
            value={formData.nombreArchivo}
            onChange={handleNombreArchivoChange}
            className="w-full"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleGuardar}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            disabled={!formData.archivo || !isValidFile}
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
