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
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface CapaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  tema: string;
  grupo: string;
  codigo: string;
  baseDatos: string;
  tabla: string;
  objetoGeografico: string;
}

export function CapaFormDialog({ open, onOpenChange }: CapaFormDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    tema: "",
    grupo: "",
    codigo: "",
    baseDatos: "",
    tabla: "",
    objetoGeografico: "",
  });

  // Temas disponibles
  const temas = [
    { value: "zonificacion-forestal", label: "Zonificación Forestal" },
    { value: "areas-protegidas", label: "Áreas Protegidas" },
    { value: "concesiones-mineras", label: "Concesiones Mineras" },
    { value: "territorios-indigenas", label: "Territorios Indígenas" },
    { value: "cuencas-hidrograficas", label: "Cuencas Hidrográficas" },
    { value: "biodiversidad", label: "Biodiversidad" },
    { value: "recursos-forestales", label: "Recursos Forestales" },
    { value: "cartografia-base", label: "Cartografía Base" }
  ];

  // Grupos disponibles (pueden cambiar según el tema seleccionado)
  const grupos = [
    { value: "administrativo", label: "Administrativo" },
    { value: "ambiental", label: "Ambiental" },
    { value: "fisico", label: "Físico" },
    { value: "socioeconomico", label: "Socioeconómico" },
    { value: "infraestructura", label: "Infraestructura" },
    { value: "recursos-naturales", label: "Recursos Naturales" }
  ];

  // Manejar cambio de tema
  const handleTemaChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      tema: value,
      // Resetear grupo cuando cambia el tema
      grupo: ""
    }));
  };

  // Manejar cambio de grupo
  const handleGrupoChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      grupo: value
    }));
  };

  // Manejar cambio de código
  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      codigo: e.target.value
    }));
  };

  // Manejar cambio de base de datos
  const handleBaseDatosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      baseDatos: e.target.value
    }));
  };

  // Manejar cambio de tabla
  const handleTablaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      tabla: e.target.value
    }));
  };

  // Manejar cambio de objeto geográfico
  const handleObjetoGeograficoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      objetoGeografico: e.target.value
    }));
  };

  // Manejar agregar nuevo tema
  const handleAddTema = () => {
    // Aquí se podría abrir otro dialog para agregar un nuevo tema
    toast.info("Funcionalidad para agregar nuevo tema", {
      description: "Esta funcionalidad se implementará próximamente",
      duration: 3000,
    });
  };

  // Manejar guardado
  const handleGuardar = () => {
    if (!formData.tema) {
      toast.error("Error", {
        description: "Por favor seleccione un tema",
        duration: 3000,
      });
      return;
    }

    if (!formData.grupo) {
      toast.error("Error", {
        description: "Por favor seleccione un grupo",
        duration: 3000,
      });
      return;
    }

    if (!formData.codigo.trim()) {
      toast.error("Error", {
        description: "Por favor ingrese el código",
        duration: 3000,
      });
      return;
    }

    if (!formData.baseDatos.trim()) {
      toast.error("Error", {
        description: "Por favor ingrese la base de datos",
        duration: 3000,
      });
      return;
    }

    if (!formData.tabla.trim()) {
      toast.error("Error", {
        description: "Por favor ingrese la tabla",
        duration: 3000,
      });
      return;
    }

    if (!formData.objetoGeografico.trim()) {
      toast.error("Error", {
        description: "Por favor ingrese el objeto geográfico",
        duration: 3000,
      });
      return;
    }

    // Aquí iría la lógica para guardar
    console.log("Guardando capa:", formData);
    
    toast.success("Capa guardada exitosamente", {
      duration: 3000,
    });

    // Resetear formulario y cerrar
    handleCancelar();
  };

  // Manejar cancelación
  const handleCancelar = () => {
    setFormData({
      tema: "",
      grupo: "",
      codigo: "",
      baseDatos: "",
      tabla: "",
      objetoGeografico: "",
    });
    onOpenChange(false);
  };

  // Verificar si el formulario es válido
  const isFormValid = formData.tema && 
                     formData.grupo && 
                     formData.codigo.trim() && 
                     formData.baseDatos.trim() && 
                     formData.tabla.trim() && 
                     formData.objetoGeografico.trim();

  return (
    <CustomDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Registro de capa"
      description="Complete la información para registrar una nueva capa"
      size="large"
    >
      <div className="space-y-6">
        {/* Tema */}
        <div className="space-y-2">
          <Label htmlFor="tema">Tema :</Label>
          <div className="flex gap-2">
            <Select value={formData.tema} onValueChange={handleTemaChange}>
              <SelectTrigger id="tema" className="flex-1 border-lime-700">
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent>
                {temas.map((tema) => (
                  <SelectItem key={tema.value} value={tema.value}>
                    {tema.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              onClick={handleAddTema}
              className="bg-green-600 hover:bg-green-700 text-white px-3"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Grupo */}
        <div className="space-y-2">
          <Label htmlFor="grupo">Grupo :</Label>
          <Select value={formData.grupo} onValueChange={handleGrupoChange}>
            <SelectTrigger id="grupo" className="w-full border-lime-700">
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>
            <SelectContent>
              {grupos.map((grupo) => (
                <SelectItem key={grupo.value} value={grupo.value}>
                  {grupo.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Código */}
        <div className="space-y-2">
          <Label htmlFor="codigo">Código :</Label>
          <Input
            id="codigo"
            type="text"
            placeholder="Ingrese el usuario"
            value={formData.codigo}
            onChange={handleCodigoChange}
            className="w-full border-lime-700"
          />
        </div>

        {/* Base de datos */}
        <div className="space-y-2">
          <Label htmlFor="base-datos">Base de datos:</Label>
          <Input
            id="base-datos"
            type="text"
            placeholder="Ingrese el base de datos"
            value={formData.baseDatos}
            onChange={handleBaseDatosChange}
            className="w-full border-lime-700"
          />
        </div>

        {/* Tabla */}
        <div className="space-y-2">
          <Label htmlFor="tabla">Tabla :</Label>
          <Input
            id="tabla"
            type="text"
            placeholder="Ingrese el Tabla"
            value={formData.tabla}
            onChange={handleTablaChange}
            className="w-full border-lime-700"
          />
        </div>

        {/* Objeto geográfico */}
        <div className="space-y-2">
          <Label htmlFor="objeto-geografico">Objeto geográfico :</Label>
          <Input
            id="objeto-geografico"
            type="text"
            value={formData.objetoGeografico}
            onChange={handleObjetoGeograficoChange}
            className="w-full border-lime-700"
          />
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
