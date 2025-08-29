"use client";

import { useState, useMemo } from "react";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FiltrosBusqueda } from "./filtros-busqueda";
import { TablaBusquedaResultados } from "./tabla-busqueda-resultados";
import { SuperposicionData, FiltrosBusqueda as FiltrosBusquedaType } from "../types/superposicion.types";

// Datos mock iniciales
const mockDataBase: SuperposicionData = {
    id: "1",
    nroExp: "2025-0016083",
    asunto: "Atención a consulta formulada sobre 748 petitorios mineros, en el marco de lo regulado en el artículo N° 62 de la Ley N° 29763, Ley Forestal y de Fauna Silvestre.",
    tipoSolicitud: "Análisis de superposición de petitorios mineros",
    profesional: "Lenin Ventura"
};

const initialData: SuperposicionData[] = Array.from({ length: 13 }, (_, index) => ({
    ...mockDataBase,
    id: `${index + 1}`,
    nroExp: `2025-00160${83 + index}`,
}));

interface BusquedaContainerProps {
    onNextStep?: () => void;
}

export function BusquedaContainer ({ onNextStep }: BusquedaContainerProps) {
    const [allData, setAllData] = useState<SuperposicionData[]>(initialData);
    const [filteredData, setFilteredData] = useState<SuperposicionData[]>(initialData);
    const [activeFilters, setActiveFilters] = useState<FiltrosBusquedaType>({
        filtro: "",
        nombre: "",
    });

    // Función para aplicar filtros
    const aplicarFiltros = (filtros: FiltrosBusquedaType) => {
        setActiveFilters(filtros);

        let resultado = [...allData];

        // Filtro por tipo de solicitud
        if (filtros.filtro && filtros.filtro !== "todos") {
            const filtroMap: Record<string, string> = {
                mineros: "petitorios mineros",
                forestales: "concesiones forestales",
                protegidas: "áreas protegidas",
                indigenas: "territorios indígenas"
            };

            const searchTerm = filtroMap[filtros.filtro];
            if (searchTerm) {
                resultado = resultado.filter(item =>
                    item.tipoSolicitud.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
        }

        // Filtro por nombre o número de expediente
        if (filtros.nombre.trim()) {
            const searchTerm = filtros.nombre.toLowerCase();
            resultado = resultado.filter(item =>
                item.nroExp.toLowerCase().includes(searchTerm) ||
                item.asunto.toLowerCase().includes(searchTerm) ||
                item.profesional.toLowerCase().includes(searchTerm)
            );
        }

        // Filtro por fecha (simulado - en un caso real tendrías fechas en los datos)
        if (filtros.fechaDesde || filtros.fechaHasta) {
            // Aquí podrías implementar la lógica de filtrado por fecha
            // Por ahora mantenemos todos los datos
            console.log("Filtros de fecha aplicados:", { fechaDesde: filtros.fechaDesde, fechaHasta: filtros.fechaHasta });
        }

        setFilteredData(resultado);
    };

    // Función para limpiar filtros
    const limpiarFiltros = () => {
        setActiveFilters({
            filtro: "",
            nombre: "",
        });
        setFilteredData(allData);
    };

    // Función para actualizar datos cuando se agrega/edita/elimina
    const actualizarDatos = (nuevosDatos: SuperposicionData[]) => {
        setAllData(nuevosDatos);
        // Reaplicar filtros activos
        if (activeFilters.filtro || activeFilters.nombre || activeFilters.fechaDesde || activeFilters.fechaHasta) {
            aplicarFiltros(activeFilters);
        } else {
            setFilteredData(nuevosDatos);
        }
    };

    return (
        <div className="space-y-6">
            {/* Filtros */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Filtros de Búsqueda
                </h2>
                <FiltrosBusqueda
                    onBuscar={aplicarFiltros}
                    onLimpiar={limpiarFiltros}
                />
            </div>

            {/* Resultados */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Resultados de Búsqueda
                    </h2>
                    <div className="text-sm text-gray-500">
                        {filteredData.length} registro{filteredData.length !== 1 ? 's' : ''} encontrado{filteredData.length !== 1 ? 's' : ''}
                    </div>
                </div>

                {/* Tabla con datos filtrados */}
                <TablaBusquedaResultados
                    data={filteredData}
                    onDataChange={actualizarDatos}
                />
            </div>

            {/* Botón para continuar al siguiente paso */}
            {onNextStep && (
                <div className="flex justify-end">
                    <Button
                        onClick={onNextStep}
                        className="bg-green-600 hover:bg-green-700 text-white px-8"
                    >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Continuar con Nuevo Registro
                    </Button>
                </div>
            )}
        </div>
    );
}
