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

// Componente DatePicker personalizado mejorado
function DatePicker ({
  date,
  onDateChange,
  placeholder = "Seleccionar fecha",
  label
}: {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  label: string;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-gray-700">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "justify-start text-left font-normal border-gray-300 text-xs h-9 w-full px-3",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-3 w-3 text-gray-600" />
            {date ? format(date, "dd/MM/yyyy", { locale: es }) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

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

      <div className="space-y-6">
        {/* Primera fila: Tipo de solicitud y búsqueda */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tipo de Solicitud */}
          <div className="space-y-2">
            <Label htmlFor="filtro" className="text-sm font-medium text-gray-700">
              Tipo de Solicitud
            </Label>
            <Select value={filtro} onValueChange={setFiltro}>
              <SelectTrigger id="filtro" className="w-full border-gray-300 text-sm h-10">
                <SelectValue placeholder="Seleccione el tipo de solicitud" />
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
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
              Buscar
            </Label>
            <Input
              id="nombre"
              placeholder="Nombre, expediente o profesional"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border-gray-300 text-sm h-10"
            />
          </div>
        </div>

        {/* Segunda fila: Rango de fechas */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Rango de Fechas
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              date={fechaDesde}
              onDateChange={setFechaDesde}
              placeholder="dd/mm/yyyy"
              label="Fecha desde"
            />
            <DatePicker
              date={fechaHasta}
              onDateChange={setFechaHasta}
              placeholder="dd/mm/yyyy"
              label="Fecha hasta"
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
          {hasFilters && (
            <Button
              variant="outline"
              onClick={handleLimpiar}
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm h-10 px-6"
            >
              <X className="h-4 w-4 mr-2" />
              Limpiar Filtros
            </Button>
          )}
          <Button
            onClick={handleBuscar}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white text-sm h-10 px-6 shadow-sm"
          >
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </div>

    </div>
  );
}
