"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FiltrosAsignarSolicitud() {
  const [tipoSolicitud, setTipoSolicitud] = useState("");
  const [usuario, setUsuario] = useState("");

  return (
    <div className="space-y-6">
      {/* Tipo de Solicitud */}
      <div className="space-y-2">
        <Label htmlFor="tipo-solicitud">Tipo de Solicitud :</Label>
        <Select value={tipoSolicitud} onValueChange={setTipoSolicitud}>
          <SelectTrigger id="tipo-solicitud" className="w-full max-w-md border-lime-700">
            <SelectValue placeholder="Seleccione tipo solicitud" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="permisos-forestales">
              Solicitud de Permisos para el aprovechamiento de productos forestales
            </SelectItem>
            <SelectItem value="superposicion-vicunas">
              Superposición para la declaración de Manejo de vicuñas de camélidos sudamericanos silvestres a nivel nacional
            </SelectItem>
            <SelectItem value="no-superposicion-bpp">
              Solicitudes sobre No superposición a BPP para áreas de interés
            </SelectItem>
            <SelectItem value="analisis-superposicion">
              Análisis de superposición de petitorios mineros
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Usuario */}
      <div className="space-y-2">
        <Label htmlFor="usuario">Usuario :</Label>
        <Select value={usuario} onValueChange={setUsuario}>
          <SelectTrigger id="usuario" className="w-full max-w-md border-lime-700">
            <SelectValue placeholder="Seleccione usuario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rossana-paganini">Rossana Paganini</SelectItem>
            <SelectItem value="ana-mendoza">Ana Mendoza</SelectItem>
            <SelectItem value="carlos-rodriguez">Carlos Rodríguez</SelectItem>
            <SelectItem value="maria-garcia">María García</SelectItem>
            <SelectItem value="luis-torres">Luis Torres</SelectItem>
            <SelectItem value="sofia-vargas">Sofía Vargas</SelectItem>
            <SelectItem value="diego-morales">Diego Morales</SelectItem>
            <SelectItem value="patricia-silva">Patricia Silva</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
