"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { TableSelect } from "@/components/table/table-select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Layers,
  Map,
  MapPin,
  Save,
  Trash2,
} from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { MapaInteractivo } from "./mapa-interactivo";

interface AnalisisViewProps {
  onBack: () => void;
  ambitos?: any[];
}

interface ResultadoAnalisis {
  id: string;
  tipo: string;
  descripcion: string;
  calorias: string;
  superficie1: string;
  superficie2: string;
}

export function AnalisisView ({ onBack, ambitos: initialAmbitos = [] }: AnalisisViewProps) {
  const [activeTab, setActiveTab] = useState("zco");
  const [ambitoSeleccionado, setAmbitoSeleccionado] = useState({
    areaUno: true,
    areaDos: true,
    areaTres: true,
    areaCuatro: true,
  });

  // Estado para los ámbitos de consulta del mapa
  const [ambitos, setAmbitos] = useState<any[]>(initialAmbitos);

  const [capasExpanded, setCapasExpanded] = useState({
    inei: true,
    sernanp: true,
    serfor: false,
    ministerio: false,
    dgspf: false,
  });

  const [capasSeleccionadas, setCapasSeleccionadas] = useState({
    inei: {
      limites: true,
    },
    sernanp: {
      anpNacional: true,
      anpRegional: true,
      anpPrivada: true,
      zonaAmortiguamiento: true,
      reservaBiosfera: true,
    },
  });

  // Función para cambiar estado de capas INEI
  const toggleCapaINEI = (subcapa: keyof typeof capasSeleccionadas.inei) => {
    setCapasSeleccionadas((prev) => ({
      ...prev,
      inei: {
        ...prev.inei,
        [subcapa]: !prev.inei[subcapa],
      },
    }));
  };

  // Función para cambiar estado de capas SERNANP
  const toggleCapaSERNANP = (
    subcapa: keyof typeof capasSeleccionadas.sernanp
  ) => {
    setCapasSeleccionadas((prev) => ({
      ...prev,
      sernanp: {
        ...prev.sernanp,
        [subcapa]: !prev.sernanp[subcapa],
      },
    }));
  };

  // Datos mock para la tabla de resultados
  const resultados: ResultadoAnalisis[] = [
    {
      id: "1",
      tipo: "Desserts (100g serving)",
      descripcion: "ZCO",
      calorias: "Calories",
      superficie1: "Superficie (ha)",
      superficie2: "Superficie (ha)",
    },
    {
      id: "2",
      tipo: "-",
      descripcion: "ANP",
      calorias: "Concesión para Conservación",
      superficie1: "-",
      superficie2: "-",
    },
    {
      id: "3",
      tipo: "-",
      descripcion: "-",
      calorias: "-",
      superficie1: "-",
      superficie2: "-",
    },
    {
      id: "4",
      tipo: "-",
      descripcion: "-",
      calorias: "-",
      superficie1: "-",
      superficie2: "-",
    },
  ];

  const columns: ColumnDef<ResultadoAnalisis>[] = [
    {
      accessorKey: "tipo",
      header: "ZCO",
    },
    {
      accessorKey: "descripcion",
      header: "ANP",
    },
    {
      accessorKey: "calorias",
      header: "Concesión para Conservación",
    },
    {
      accessorKey: "superficie1",
      header: "Superficie (ha)",
    },
    {
      accessorKey: "superficie2",
      header: "Superficie (ha)",
    },
  ];

  const toggleCapa = (categoria: string) => {
    setCapasExpanded((prev) => ({
      ...prev,
      [categoria]: !prev[categoria as keyof typeof prev],
    }));
  };

  // Función para manejar el botón Cargar
  const handleCargar = () => {
    toast.success("Cargando capas seleccionadas", {
      description: "Las capas se están procesando en el mapa",
      duration: 3000,
    });
  };

  // Función para manejar el botón Guardar
  const handleGuardar = () => {
    toast.success("Análisis guardado exitosamente", {
      description: "El análisis ha sido guardado en el sistema",
      duration: 3000,
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Layout principal de dos columnas */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        {/* Columna izquierda - Mapa y Resultados */}
        <div className="lg:col-span-2 space-y-4 h-full flex flex-col">
          {/* Mapa del Análisis */}
          <Card className="flex-1">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Mapa del Análisis</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0 h-full">
              <MapaInteractivo
                ambitos={ambitos}
                onAmbitosChange={setAmbitos}
              />
            </CardContent>
          </Card>

          {/* Resultados */}
          <Card className="flex-1">
            <CardHeader className="py-3">
              <CardTitle className="text-lg">Resultados</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3">
                {/* Tabs de resultados */}
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="zco">ZCO</TabsTrigger>
                  <TabsTrigger value="anp">ANP</TabsTrigger>
                  <TabsTrigger value="concesion">Concesión para Conservación</TabsTrigger>
                </TabsList>

                {/* Contenido de tabs */}
                <TabsContent value="zco">
                  <TableSelect
                    columns={columns}
                    data={resultados}
                    pagination={true}
                    pageSize={5}
                    maxHeight="200px"
                  />
                </TabsContent>

                <TabsContent value="anp">
                  <TableSelect
                    columns={columns}
                    data={resultados}
                    pagination={true}
                    pageSize={5}
                    maxHeight="200px"
                  />
                </TabsContent>

                <TabsContent value="concesion">
                  <TableSelect
                    columns={columns}
                    data={resultados}
                    pagination={true}
                    pageSize={5}
                    maxHeight="200px"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Proceso */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-lg">Proceso</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 grid grid-cols-3 gap-2">
              <div className="space-y-2 col-span-2">
                <div className="flex items-center justify-start gap-2">
                  <Button
                    variant="outline"
                    className="bg-green-600 hover:bg-green-700 text-white border-green-600 min-w-32"
                  >
                    <FileText className="w-4 h-4" />
                    Informe
                  </Button>
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">W</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-start gap-2">
                  <Button
                    variant="outline"
                    className="bg-green-600 hover:bg-green-700 text-white border-green-600 min-w-32"
                  >
                    <Map className="w-4 h-4" />
                    Mapa
                  </Button>
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">PDF</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleGuardar}
                className="bg-green-600 hover:bg-green-700 text-white col-span-1 w-full h-full"
              >
                <Save className="w-4 h-4" />
                Guardar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha - Controles */}
        <div className="space-y-4 h-full">
          {/* Ámbito de Consulta */}




          {/* Capas */}
          <Card className="flex-1">
            <CardHeader className="py-3">
              <CardTitle className="text-lg">Capas a intersectar</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2 max-h-80 overflow-y-auto">
              {/* INEI */}
              <div>
                <div
                  className="flex items-center space-x-2 cursor-pointer py-1"
                  onClick={() => toggleCapa("inei")}
                >
                  <Layers className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">INEI</span>
                  {capasExpanded.inei ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
                {capasExpanded.inei && (
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={capasSeleccionadas.inei.limites}
                        onCheckedChange={() => toggleCapaINEI("limites")}
                      />
                      <span className="text-sm">Límites</span>
                    </div>
                  </div>
                )}
              </div>

              {/* SERNANP */}
              <div>
                <div
                  className="flex items-center space-x-2 cursor-pointer py-1"
                  onClick={() => toggleCapa("sernanp")}
                >
                  <Layers className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">SERNANP</span>
                  {capasExpanded.sernanp ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
                {capasExpanded.sernanp && (
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={capasSeleccionadas.sernanp.anpNacional}
                        onCheckedChange={() => toggleCapaSERNANP("anpNacional")}
                      />
                      <span className="text-sm">ANP Nacional</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={capasSeleccionadas.sernanp.anpRegional}
                        onCheckedChange={() => toggleCapaSERNANP("anpRegional")}
                      />
                      <span className="text-sm">ANP Regional</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={capasSeleccionadas.sernanp.anpPrivada}
                        onCheckedChange={() => toggleCapaSERNANP("anpPrivada")}
                      />
                      <span className="text-sm">ANP Privada</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={capasSeleccionadas.sernanp.zonaAmortiguamiento}
                        onCheckedChange={() =>
                          toggleCapaSERNANP("zonaAmortiguamiento")
                        }
                      />
                      <span className="text-sm">Zona de Amortiguamiento</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={capasSeleccionadas.sernanp.reservaBiosfera}
                        onCheckedChange={() =>
                          toggleCapaSERNANP("reservaBiosfera")
                        }
                      />
                      <span className="text-sm">Reserva de Biosfera</span>
                    </div>
                  </div>
                )}
              </div>

              {/* SERFOR */}
              <div>
                <div
                  className="flex items-center space-x-2 cursor-pointer py-1"
                  onClick={() => toggleCapa("serfor")}
                >
                  <Layers className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">SERFOR</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* MINISTERIO CULTURA */}
              <div>
                <div
                  className="flex items-center space-x-2 cursor-pointer py-1"
                  onClick={() => toggleCapa("ministerio")}
                >
                  <Layers className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">
                    MINISTERIO CULTURA
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* DGSPF */}
              <div>
                <div
                  className="flex items-center space-x-2 cursor-pointer py-1"
                  onClick={() => toggleCapa("dgspf")}
                >
                  <Layers className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">DGSPF</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botón Cargar */}
          <Button
            onClick={handleCargar}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Intersectar
          </Button>


        </div>
      </div>
    </div>
  );
}
