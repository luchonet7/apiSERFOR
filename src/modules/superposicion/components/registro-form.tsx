"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Filter, MapPin, Upload, Search, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { MapaInteractivo } from "./mapa-interactivo";
import { AmbitoConsulta } from "../types/ambito-consulta";
import { toast } from "sonner";

interface RegistroFormProps {
  onNext: (ambitos?: any[]) => void;
}

export function RegistroForm ({ onNext }: RegistroFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    numeroExpediente: "",
    asunto: "",
    fecha: ""
  });

  const [ambitos, setAmbitos] = useState<AmbitoConsulta[]>([]);
  const [selectedAreas, setSelectedAreas] = useState({
    areaUno: true,
    areaDos: true,
    areaTres: true,
    areaCuatro: true
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAreaToggle = (area: keyof typeof selectedAreas) => {
    setSelectedAreas(prev => ({
      ...prev,
      [area]: !prev[area]
    }));
  };

  // Filtrar y paginar los ámbitos
  const filteredAmbitos = useMemo(() => {
    return ambitos.filter(ambito =>
      ambito.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [ambitos, searchTerm]);

  const totalPages = Math.ceil(filteredAmbitos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAmbitos = filteredAmbitos.slice(startIndex, endIndex);

  // Resetear a la primera página cuando cambie el término de búsqueda
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = parseInt(value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Resetear a la primera página
  };

  const handleCancelar = () => {
    // Verificar si hay datos ingresados
    const hayDatos = formData.numeroExpediente.trim() ||
      formData.asunto.trim() ||
      formData.fecha ||
      ambitos.length > 0;

    if (hayDatos) {
      if (confirm("¿Está seguro que desea cancelar? Se perderán los datos ingresados.")) {
        router.push('/busqueda');
      }
    } else {
      router.push('/busqueda');
    }
  };

  const handleSubmit = async () => {
    // Validar campos obligatorios
    if (!formData.numeroExpediente.trim()) {
      toast.error("El número de expediente es obligatorio");
      return;
    }

    if (!formData.asunto.trim()) {
      toast.error("El asunto es obligatorio");
      return;
    }

    if (!formData.fecha) {
      toast.error("La fecha es obligatoria");
      return;
    }

    // Validar que haya al menos un ámbito seleccionado
    if (ambitos.length === 0) {
      toast.error("Debe seleccionar al menos un ámbito en el mapa");
      return;
    }

    try {
      // Preparar los datos del expediente
      const expedienteData = {
        activo: true,
        nroexp: formData.numeroExpediente.trim(),
        jsonref: JSON.stringify(ambitos.map(ambito => ({
          referencia: ambito.name,
          geojson: ambito.geojson
        }))),
        asunto: formData.asunto.trim(),
        fechaexp: formData.fecha,
        userRegistro: "LMEZA" // Esto debería venir del contexto de autenticación
      };

      // Configurar headers
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Configurar opciones de la petición
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(expedienteData),
        redirect: "follow" as RequestRedirect
      };

      // Realizar la petición
      const response = await fetch("http://localhost:9300/maqueta/Expediente/guardar", requestOptions);
      const result = await response.text();

      console.log("Respuesta de la API:", result);

      // Si la petición fue exitosa, navegar de vuelta a la lista de búsqueda
      if (response.ok) {
        toast.success("Superposición registrada exitosamente");
        // Navegar de vuelta a la página de búsqueda
        router.push('/busqueda');
      } else {
        console.error("Error al guardar el expediente:", result);
        toast.error("Error al guardar el expediente");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      toast.error("Error al enviar datos");
    }
  };

  return (
    <div className="bg-white w-full">
      {/* Datos del expediente */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Datos del expediente</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nro. de Expediente
            </label>
            <Input
              value={formData.numeroExpediente}
              onChange={(e) => handleInputChange("numeroExpediente", e.target.value)}
              placeholder="Ingrese número de expediente"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Asunto
            </label>
            <Input
              value={formData.asunto}
              onChange={(e) => handleInputChange("asunto", e.target.value)}
              placeholder="Ingrese asunto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <Input
              type="date"
              value={formData.fecha}
              onChange={(e) => handleInputChange("fecha", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Mapa principal */}
      <div className="mb-6">
        <div className="px-6 flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Mapa principal</h2>
        </div>
        <div className="relative overflow-hidden">
          {/* Mapa de Leaflet */}
          <div className="h-[600px] w-full">
            <MapaInteractivo
              ambitos={ambitos}
              onAmbitosChange={setAmbitos}
              onNavigateToAmbito={(ambitoId) => {
                console.log("Navegando al ámbito:", ambitoId);
              }}
            />
          </div>
        </div>
      </div>



      {/* Botones */}
      <div className="px-6 pb-6 flex justify-between">
        <Button
          onClick={handleCancelar}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </Button>
        <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
          Guardar
        </Button>
      </div>

      {/* Nota al pie */}
      <div className="px-6 pb-6 text-center">
        <p className="text-sm text-gray-500">
          Los polígonos cargados se mostrarán en la tabla y en el mapa interactivo.
        </p>
      </div>
    </div>
  );
}

