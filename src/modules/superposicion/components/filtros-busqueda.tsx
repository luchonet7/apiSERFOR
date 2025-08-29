"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon, Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FiltrosBusqueda as FiltrosBusquedaType } from "../types/superposicion.types";



interface FiltrosBusquedaProps {
  onBuscar: (filtros: FiltrosBusquedaType) => void;
  onLimpiar: () => void;
}

export function FiltrosBusqueda ({ onBuscar, onLimpiar }: FiltrosBusquedaProps) {
  const [filtro, setFiltro] = useState("");
  const [nombre, setNombre] = useState("");
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>();
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>();

  const handleBuscar = () => {
    onBuscar({
      filtro,
      nombre,
      fechaDesde,
      fechaHasta
    });
  };

  const handleLimpiar = () => {
    setFiltro("");
    setNombre("");
    setFechaDesde(undefined);
    setFechaHasta(undefined);
    onLimpiar();
  };

  const hasFilters = filtro || nombre || fechaDesde || fechaHasta;

  return (
    <div>

      {/* Header con título */}
      < div className="flex items-center gap-2 mb-6" >
        <Filter className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filtros de Búsqueda</h3>
      </div >

      <div className="space-y-4">
        {/* Todos los filtros en una línea */}
        <div className="flex flex-wrap items-end gap-4">
          {/* Tipo de Solicitud */}
          <div className="space-y-1 min-w-[200px]">
            <Label htmlFor="filtro" className="text-xs font-medium text-gray-700">
              Tipo de Solicitud
            </Label>
            <Select value={filtro} onValueChange={setFiltro}>
              <SelectTrigger id="filtro" className="w-full border-gray-300 text-xs h-8">
                <SelectValue placeholder="Seleccione tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="mineros">Petitorios Mineros</SelectItem>
                <SelectItem value="forestales">Concesiones Forestales</SelectItem>
                <SelectItem value="protegidas">Áreas Protegidas</SelectItem>
                <SelectItem value="indigenas">Territorios Indígenas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campo de búsqueda */}
          <div className="space-y-1 min-w-[250px]">
            <Label htmlFor="nombre" className="text-xs font-medium text-gray-700">
              Buscar
            </Label>
            <Input
              id="nombre"
              placeholder="Nombre, expediente o profesional"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border-gray-300 text-xs h-8"
            />
          </div>

          {/* Fecha desde */}
          <div className="space-y-1 min-w-[140px]">
            <Label className="text-xs font-medium text-gray-700">
              Desde
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "justify-start text-left font-normal border-gray-300 text-xs h-8 w-full px-2",
                    !fechaDesde && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-1 h-3 w-3 text-gray-600" />
                  {fechaDesde ? format(fechaDesde, "dd/MM/yyyy", { locale: es }) : "dd/mm/yyyy"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={fechaDesde}
                  onSelect={setFechaDesde}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Fecha hasta */}
          <div className="space-y-1 min-w-[140px]">
            <Label className="text-xs font-medium text-gray-700">
              Hasta
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "justify-start text-left font-normal border-gray-300 text-xs h-8 w-full px-2",
                    !fechaHasta && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-1 h-3 w-3 text-gray-600" />
                  {fechaHasta ? format(fechaHasta, "dd/MM/yyyy", { locale: es }) : "dd/mm/yyyy"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={fechaHasta}
                  onSelect={setFechaHasta}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 ml-auto">
            {hasFilters && (
              <Button
                variant="outline"
                onClick={handleLimpiar}
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 text-xs h-8 px-3"
              >
                <X className="h-3 w-3 mr-1" />
                Limpiar
              </Button>
            )}
            <Button
              onClick={handleBuscar}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white text-xs h-8 px-4 shadow-sm"
            >
              <Search className="h-3 w-3 mr-1" />
              Buscar
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
