"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, Popup } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, Trash2, Eye, EyeOff, FileText, Info, Search, MapPin, Layers, ChevronDown, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight, ZoomIn } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import "leaflet/dist/leaflet.css";
import * as shapefile from "shapefile";
import { GeoFeature, AmbitoConsulta } from "../types/ambito-consulta";
import "@/lib/leaflet-config";

interface MapaInteractivoProps {
    ambitos: AmbitoConsulta[];
    onAmbitosChange: (ambitos: AmbitoConsulta[]) => void;
    onNavigateToAmbito?: (ambitoId: string) => void;
}

// Componente para centrar el mapa en los datos
function MapController ({ ambitos }: { ambitos: AmbitoConsulta[] }) {
    const map = useMap();

    const fitBounds = useCallback(() => {
        if (ambitos.length > 0) {
            const bounds = ambitos.reduce((acc, ambito) => {
                if (ambito.geojson.geometry.type === "Polygon") {
                    const coords = ambito.geojson.geometry.coordinates[0];
                    coords.forEach((coord: [number, number]) => {
                        acc.push([coord[1], coord[0]]); // Leaflet usa [lat, lng]
                    });
                }
                return acc;
            }, [] as [number, number][]);

            if (bounds.length > 0) {
                map.fitBounds(bounds);
            }
        }
    }, [ambitos, map]);

    // Centrar en los datos cuando cambien los ámbitos
    React.useEffect(() => {
        if (ambitos.length > 0) {
            setTimeout(fitBounds, 100);
        }
    }, [ambitos, fitBounds]);

    return null;
}

// Componente para controles de polígono individual
function PolygonControls ({ ambito, onToggleVisibility, onRemove, onNavigate }: {
    ambito: AmbitoConsulta;
    onToggleVisibility: (id: string) => void;
    onRemove: (id: string) => void;
    onNavigate: (id: string) => void;
}) {
    return (
        <div className="p-2 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
                <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: ambito.color }}
                />
                <span className="font-medium text-sm text-gray-900">{ambito.name}</span>
            </div>

            <div className="text-xs text-gray-600 mb-3">
                <div>Área: {ambito.area || 0} ha</div>
                <div>Fuente: {ambito.source || "N/A"}</div>
            </div>

            <div className="flex gap-1">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onToggleVisibility(ambito.id)}
                    className="flex-1 text-xs"
                    title={ambito.visible ? "Ocultar polígono" : "Mostrar polígono"}
                >
                    {ambito.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onNavigate(ambito.id)}
                    className="flex-1 text-xs"
                    title="Centrar en polígono"
                >
                    <ZoomIn className="w-3 h-3" />
                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRemove(ambito.id)}
                    className="flex-1 text-xs text-red-600 hover:text-red-700"
                    title="Eliminar polígono"
                >
                    <Trash2 className="w-3 h-3" />
                </Button>
            </div>
        </div>
    );
}

// Función para calcular el área de un polígono en hectáreas
const calculatePolygonArea = (coordinates: number[][][]): number => {
    if (!coordinates || coordinates.length === 0) return 0;

    const coords = coordinates[0]; // Tomamos el primer anillo exterior
    let area = 0;

    for (let i = 0; i < coords.length; i++) {
        const j = (i + 1) % coords.length;
        area += coords[i][0] * coords[j][1];
        area -= coords[j][0] * coords[i][1];
    }

    area = Math.abs(area) / 2;

    // Convertir a hectáreas (aproximadamente)
    // Esta es una aproximación simple, para mayor precisión se necesitaría una librería como turf.js
    const areaInHectares = area * 111.32 * 111.32 * Math.cos(coords[0][1] * Math.PI / 180) / 10000;

    return Math.round(areaInHectares * 100) / 100;
};

export function MapaInteractivo ({ ambitos, onAmbitosChange, onNavigateToAmbito }: MapaInteractivoProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showLayers, setShowLayers] = useState(true);
    const [showTable, setShowTable] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [expandedCategories, setExpandedCategories] = useState({
        inei: true,
        sernanp: true,
        serfor: false,
        ministerioCultura: false,
        dgspf: false
    });

    const colors = [
        "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
        "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"
    ];

    const generateRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
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

    const toggleCategory = (category: keyof typeof expandedCategories) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const parseGeoJSON = async (file: File): Promise<GeoFeature[]> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = e.target?.result as string;
                    const geojson = JSON.parse(content);

                    if (geojson.type === "FeatureCollection") {
                        resolve(geojson.features);
                    } else if (geojson.type === "Feature") {
                        resolve([geojson]);
                    } else {
                        reject(new Error("Formato GeoJSON no válido"));
                    }
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    };

    const parseShapefile = async (file: File): Promise<GeoFeature[]> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const arrayBuffer = e.target?.result as ArrayBuffer;
                    const features: GeoFeature[] = [];

                    const source = await shapefile.open(arrayBuffer);
                    let result;
                    while ((result = await source.read()) && !result.done) {
                        features.push(result.value as GeoFeature);
                    }

                    resolve(features);
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const parseKML = async (file: File): Promise<GeoFeature[]> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = e.target?.result as string;
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(content, "text/xml");

                    const features: GeoFeature[] = [];
                    const placemarks = xmlDoc.getElementsByTagName("Placemark");

                    for (let i = 0; i < placemarks.length; i++) {
                        const placemark = placemarks[i];
                        const name = placemark.getElementsByTagName("name")[0]?.textContent || `Área ${i + 1}`;
                        const coordinates = placemark.getElementsByTagName("coordinates")[0]?.textContent;

                        if (coordinates) {
                            const coords = coordinates.trim().split(/\s+/).map(coord => {
                                const [lng, lat] = coord.split(',').map(Number);
                                return [lng, lat];
                            });

                            features.push({
                                type: "Feature",
                                geometry: {
                                    type: "Polygon",
                                    coordinates: [coords]
                                },
                                properties: {
                                    name,
                                    id: `kml_${i}`
                                }
                            });
                        }
                    }

                    resolve(features);
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setIsLoading(true);

        try {
            const file = files[0];
            let features: GeoFeature[] = [];

            if (file.name.toLowerCase().endsWith('.geojson') || file.name.toLowerCase().endsWith('.json')) {
                features = await parseGeoJSON(file);
            } else if (file.name.toLowerCase().endsWith('.zip')) {
                features = await parseShapefile(file);
            } else if (file.name.toLowerCase().endsWith('.kml')) {
                features = await parseKML(file);
            } else {
                throw new Error("Formato de archivo no soportado");
            }

            // Convertir features a ámbitos de consulta
            const nuevosAmbitos: AmbitoConsulta[] = features.map((feature, index) => {
                const area = feature.geometry.type === "Polygon"
                    ? calculatePolygonArea(feature.geometry.coordinates)
                    : 0;

                return {
                    id: `ambito_${Date.now()}_${index}`,
                    name: feature.properties.name || `Área ${ambitos.length + index + 1}`,
                    geojson: feature,
                    visible: true,
                    color: generateRandomColor(),
                    area: area,
                    source: file.name
                };
            });

            onAmbitosChange([...ambitos, ...nuevosAmbitos]);

            toast.success(`${nuevosAmbitos.length} área(s) cargada(s) exitosamente`, {
                description: `Se agregaron ${nuevosAmbitos.length} nuevo(s) ámbito(s) de consulta`,
            });

        } catch (error) {
            console.error("Error al procesar archivo:", error);
            toast.error("Error al procesar el archivo", {
                description: error instanceof Error ? error.message : "Formato no válido",
            });
        } finally {
            setIsLoading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const loadExampleData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/data/ejemplo-geojson.json');
            const geojson = await response.json();

            const features = geojson.features;
            const nuevosAmbitos: AmbitoConsulta[] = features.map((feature: GeoFeature, index: number) => {
                const area = feature.geometry.type === "Polygon"
                    ? calculatePolygonArea(feature.geometry.coordinates)
                    : 0;

                return {
                    id: `ambito_${Date.now()}_${index}`,
                    name: feature.properties.name || `Área ${ambitos.length + index + 1}`,
                    geojson: feature,
                    visible: true,
                    color: generateRandomColor(),
                    area: area,
                    source: "ejemplo-geojson.json"
                };
            });

            onAmbitosChange([...ambitos, ...nuevosAmbitos]);

            toast.success(`${nuevosAmbitos.length} área(s) de ejemplo cargada(s)`, {
                description: "Se cargaron datos de ejemplo para demostración",
            });
        } catch (error) {
            toast.error("Error al cargar datos de ejemplo", {
                description: "No se pudieron cargar los datos de ejemplo",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const toggleAmbitoVisibility = (id: string) => {
        const updatedAmbitos = ambitos.map(ambito =>
            ambito.id === id ? { ...ambito, visible: !ambito.visible } : ambito
        );
        onAmbitosChange(updatedAmbitos);
    };

    const removeAmbito = (id: string) => {
        const updatedAmbitos = ambitos.filter(ambito => ambito.id !== id);
        onAmbitosChange(updatedAmbitos);
        toast.success("Ámbito eliminado", {
            description: "El ámbito de consulta ha sido removido del mapa",
        });
    };

    const navigateToAmbito = (id: string) => {
        const ambito = ambitos.find(a => a.id === id);
        if (ambito && ambito.geojson.geometry.type === "Polygon") {
            // Centrar el mapa en el ámbito específico
            const coords = ambito.geojson.geometry.coordinates[0];
            const bounds = coords.map((coord: [number, number]) => [coord[1], coord[0]]);

            // Aquí se implementaría la lógica para centrar el mapa
            // Por ahora solo mostramos un toast
            toast.success("Navegando al ámbito", {
                description: `Centrando mapa en: ${ambito.name}`,
                duration: 2000,
            });

            // Llamar a la función callback si existe
            onNavigateToAmbito?.(id);
        }
    };

    const getGeoJSONStyle = (color: string) => ({
        fillColor: color,
        weight: 2,
        opacity: 1,
        color: color,
        fillOpacity: 0.3
    });

    // Función para manejar eventos de polígonos
    const onEachFeature = (feature: any, layer: any) => {
        const ambito = ambitos.find(a => a.id === feature.properties.id);
        if (!ambito) return;

        // Agregar popup con controles
        layer.bindPopup(() => {
            const container = document.createElement('div');
            container.innerHTML = `
                <div class="p-2 min-w-[200px]">
                    <div class="flex items-center gap-2 mb-2">
                        <div class="w-4 h-4 rounded-full" style="background-color: ${ambito.color}"></div>
                        <span class="font-medium text-sm text-gray-900">${ambito.name}</span>
                    </div>
                    
                    <div class="text-xs text-gray-600 mb-3">
                        <div>Área: ${ambito.area || 0} ha</div>
                        <div>Fuente: ${ambito.source || "N/A"}</div>
                    </div>
                    
                    <div class="flex gap-1">
                        <button 
                            class="flex-1 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
                            onclick="window.toggleVisibility('${ambito.id}')"
                            title="${ambito.visible ? 'Ocultar polígono' : 'Mostrar polígono'}"
                        >
                            ${ambito.visible ? '👁️' : '👁️‍🗨️'}
                        </button>
                        
                        <button 
                            class="flex-1 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
                            onclick="window.navigateToPolygon('${ambito.id}')"
                            title="Centrar en polígono"
                        >
                            🔍
                        </button>
                        
                        <button 
                            class="flex-1 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 text-red-600 hover:text-red-700"
                            onclick="window.removePolygon('${ambito.id}')"
                            title="Eliminar polígono"
                        >
                            🗑️
                        </button>
                    </div>
                </div>
            `;
            return container;
        });

        // Agregar tooltip al hacer hover
        layer.bindTooltip(`
            <div class="text-center">
                <div class="font-medium">${ambito.name}</div>
                <div class="text-xs text-gray-600">Haz clic para ver controles</div>
            </div>
        `, { permanent: false, direction: 'top' });
    };

    // Exponer funciones globalmente para los botones del popup
    React.useEffect(() => {
        (window as any).toggleVisibility = toggleAmbitoVisibility;
        (window as any).navigateToPolygon = navigateToAmbito;
        (window as any).removePolygon = removeAmbito;
    }, [ambitos]);

    return (
        <TooltipProvider>
            <div className="w-full h-screen flex flex-col">
                {/* Header con controles */}
                <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-semibold text-gray-900">Mapa Interactivo</h2>
                        <div className="flex gap-2">
                            <Input
                                ref={fileInputRef}
                                type="file"
                                accept=".geojson,.json,.zip,.kml"
                                onChange={handleFileUpload}
                                disabled={isLoading}
                                className="hidden"
                            />

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isLoading}
                                        size="sm"
                                        variant="outline"
                                    >
                                        <Upload className="w-4 h-4 mr-1" />
                                        {isLoading ? "Procesando..." : "Importar"}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                    <div className="space-y-2">
                                        <p className="font-medium">Formatos aceptados:</p>
                                        <ul className="text-sm space-y-1">
                                            <li>• <strong>GeoJSON</strong> (.geojson, .json)</li>
                                            <li>• <strong>KML</strong> (.kml)</li>
                                            <li>• <strong>Shapefile</strong> (.zip)</li>
                                        </ul>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Los archivos deben contener polígonos válidos
                                        </p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={loadExampleData}
                                        disabled={isLoading}
                                        size="sm"
                                        variant="outline"
                                    >
                                        <FileText className="w-4 h-4 mr-1" />
                                        Ejemplo
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Cargar datos de ejemplo para demostración</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Buscar polígonos..."
                                value={searchTerm}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="pl-10 w-64"
                            />
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowTable(!showTable)}
                        >
                            {showTable ? "Ocultar Tabla" : "Mostrar Tabla"}
                        </Button>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="flex-1 flex w-full">
                    {/* Mapa principal */}
                    <div className="flex-1 relative min-w-0">
                        <MapContainer
                            center={[-12.0464, -77.0428]} // Lima, Perú
                            zoom={6}
                            style={{ height: "100%", width: "100%" }}
                            className="z-0"
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />

                            {/* Renderizar ámbitos de consulta */}
                            {ambitos.map((ambito) => (
                                ambito.visible && (
                                    <GeoJSON
                                        key={ambito.id}
                                        data={{
                                            ...ambito.geojson,
                                            properties: {
                                                ...ambito.geojson.properties,
                                                id: ambito.id
                                            }
                                        } as any}
                                        style={getGeoJSONStyle(ambito.color)}
                                        onEachFeature={onEachFeature}
                                    />
                                )
                            ))}

                            <MapController ambitos={ambitos} />
                        </MapContainer>
                    </div>

                    {/* Panel de tabla de resultados */}
                    {showTable && (
                        <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Polígonos Cargados</h3>
                                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        {ambitos.length} polígonos
                                    </span>
                                </div>

                                {ambitos.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                        <p>No hay polígonos cargados</p>
                                        <p className="text-sm">Importa un archivo para ver los resultados</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Controles de paginación */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-600">Mostrar:</span>
                                                <select
                                                    value={itemsPerPage}
                                                    onChange={(e) => handleItemsPerPageChange(e.target.value)}
                                                    className="border border-gray-300 rounded px-1 py-1 text-xs"
                                                >
                                                    <option value={5}>5</option>
                                                    <option value={10}>10</option>
                                                    <option value={20}>20</option>
                                                    <option value={50}>50</option>
                                                </select>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {startIndex + 1}-{Math.min(endIndex, filteredAmbitos.length)} de {filteredAmbitos.length}
                                            </span>
                                        </div>

                                        {/* Lista de polígonos */}
                                        <div className="space-y-2 max-h-96 overflow-y-auto">
                                            {currentAmbitos.map((ambito) => (
                                                <div key={ambito.id} className="border rounded-lg p-3 hover:bg-gray-50">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className="w-3 h-3 rounded-full"
                                                                style={{ backgroundColor: ambito.color }}
                                                            />
                                                            <span className="font-medium text-sm">{ambito.name}</span>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => navigateToAmbito(ambito.id)}
                                                            className="p-1 h-6 w-6"
                                                        >
                                                            <MapPin className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                                        <div>
                                                            <span className="font-medium">Área:</span> {ambito.area || 0} ha
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Fuente:</span> {ambito.source || "N/A"}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Paginación */}
                                        {totalPages > 1 && (
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className="p-1 h-6 w-6"
                                                >
                                                    <ChevronLeft className="w-3 h-3" />
                                                </Button>

                                                <div className="flex items-center gap-1">
                                                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                                                        let pageNumber;
                                                        if (totalPages <= 3) {
                                                            pageNumber = i + 1;
                                                        } else if (currentPage <= 2) {
                                                            pageNumber = i + 1;
                                                        } else if (currentPage >= totalPages - 1) {
                                                            pageNumber = totalPages - 2 + i;
                                                        } else {
                                                            pageNumber = currentPage - 1 + i;
                                                        }

                                                        return (
                                                            <Button
                                                                key={pageNumber}
                                                                variant={currentPage === pageNumber ? "default" : "outline"}
                                                                size="sm"
                                                                onClick={() => handlePageChange(pageNumber)}
                                                                className="w-6 h-6 p-0 text-xs"
                                                            >
                                                                {pageNumber}
                                                            </Button>
                                                        );
                                                    })}
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                    className="p-1 h-6 w-6"
                                                >
                                                    <ChevronRight className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </TooltipProvider>
    );
}
