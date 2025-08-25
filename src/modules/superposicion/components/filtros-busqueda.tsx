"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
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

// Componente DatePicker personalizado
function DatePicker({ 
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

export function FiltrosBusqueda() {
  const [filtro, setFiltro] = useState("");
  const [nombre, setNombre] = useState("");
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>();
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>();

  const handleBuscar = () => {
    // Lógica de búsqueda aquí (por ahora solo presentacional)
    console.log("Buscando...", { filtro, nombre, fechaDesde, fechaHasta });
  };

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
              <SelectItem value="tipo1">Tipo 1</SelectItem>
              <SelectItem value="tipo2">Tipo 2</SelectItem>
              <SelectItem value="tipo3">Tipo 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Nombre */}
        <div className="space-y-2 col-span-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            placeholder="Ingrese nombre"
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

      {/* Botón de búsqueda */}
      <div className="flex justify-end">
        <Button 
          onClick={handleBuscar}
          className="bg-green-600 hover:bg-green-700 text-white px-8"
        >
          Buscar
        </Button>
      </div>
    </div>
  );
}
