"use client";

import { X, MapPin, FileText, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SuperposicionData } from "../types/superposicion.types";

interface DetalleSuperposicionProps {
    isOpen: boolean;
    onClose: () => void;
    data: SuperposicionData | null;
}

export function DetalleSuperposicion ({
    isOpen,
    onClose,
    data
}: DetalleSuperposicionProps) {
    if (!data) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-green-600" />
                            Detalle de Superposición
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="h-8 w-8 p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Información básica */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Información del Expediente
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-4 w-4 text-green-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Número de Expediente</p>
                                            <p className="font-medium">{data.nroExp}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <FileText className="h-4 w-4 text-green-600 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Asunto</p>
                                            <p className="font-medium text-sm leading-relaxed">
                                                {data.asunto}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Información del Proceso
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <User className="h-4 w-4 text-blue-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Profesional Asignado</p>
                                            <p className="font-medium">{data.profesional}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-4 w-4 text-blue-600 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500">Tipo de Solicitud</p>
                                            <Badge variant="secondary" className="mt-1">
                                                {data.tipoSolicitud}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Sección de análisis de superposición */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Análisis de Superposición
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="font-medium text-green-800">Áreas Sin Conflicto</span>
                                </div>
                                <p className="text-2xl font-bold text-green-600">748</p>
                                <p className="text-sm text-green-700">Petitorios mineros</p>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span className="font-medium text-yellow-800">Áreas con Advertencia</span>
                                </div>
                                <p className="text-2xl font-bold text-yellow-600">23</p>
                                <p className="text-sm text-yellow-700">Requieren revisión</p>
                            </div>

                            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="font-medium text-red-800">Áreas en Conflicto</span>
                                </div>
                                <p className="text-2xl font-bold text-red-600">5</p>
                                <p className="text-sm text-red-700">Requieren intervención</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Sección de documentación */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Documentación Relacionada
                        </h3>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-gray-600" />
                                    <span className="text-sm font-medium">Informe de Superposición.pdf</span>
                                </div>
                                <Button variant="outline" size="sm" className="text-xs">
                                    Descargar
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-gray-600" />
                                    <span className="text-sm font-medium">Mapa de Superposición.geojson</span>
                                </div>
                                <Button variant="outline" size="sm" className="text-xs">
                                    Descargar
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-gray-600" />
                                    <span className="text-sm font-medium">Resumen Ejecutivo.docx</span>
                                </div>
                                <Button variant="outline" size="sm" className="text-xs">
                                    Descargar
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="border-lime-700 text-lime-700 hover:bg-lime-50"
                        >
                            Cerrar
                        </Button>
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            Generar Reporte
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
