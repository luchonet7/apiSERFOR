"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon, Search, X } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { FiltrosBusqueda as FiltrosBusquedaType } from "../types/superposicion.types";

// Componente DatePicker personalizado
function DatePicker ({
  date,
  onDateChange,
  placeholder = "Seleccionar fecha"
}: {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal border-lime-700",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-lime-700" />
          {date ? format(date, "dd/MM/yyyy", { locale: es }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
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
    <div className="space-y-4">
      {/* Primera fila de filtros */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        {/* Filtro Dropdown */}
        <div className="space-y-2">
          <Label htmlFor="filtro">Filtro :</Label>
          <Select value={filtro} onValueChange={setFiltro}>
            <SelectTrigger id="filtro" className="w-full border-lime-700">
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="mineros">Petitorios Mineros</SelectItem>
              <SelectItem value="forestales">Concesiones Forestales</SelectItem>
              <SelectItem value="protegidas">Áreas Protegidas</SelectItem>
              <SelectItem value="indigenas">Territorios Indígenas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Nombre */}
        <div className="space-y-2 col-span-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            placeholder="Ingrese nombre o número de expediente"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border-lime-700"
          />
        </div>

        {/* Fecha de Registro */}
        <div className="space-y-2 col-span-2">
          <Label>Fecha de Registro :</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm min-w-fit">De :</Label>
              <DatePicker
                date={fechaDesde}
                onDateChange={setFechaDesde}
                placeholder="Fecha desde"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm min-w-fit">hasta :</Label>
              <DatePicker
                date={fechaHasta}
                onDateChange={setFechaHasta}
                placeholder="Fecha hasta"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end gap-3">
        {hasFilters && (
          <Button
            variant="outline"
            onClick={handleLimpiar}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <X className="h-4 w-4 mr-2" />
            Limpiar Filtros
          </Button>
        )}
        <Button
          onClick={handleBuscar}
          className="bg-green-600 hover:bg-green-700 text-white px-8"
        >
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </div>
    </div>
  );
}
