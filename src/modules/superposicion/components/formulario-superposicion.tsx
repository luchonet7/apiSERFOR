"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { SuperposicionData, SuperposicionFormData, TIPOS_SOLICITUD, PROFESIONALES } from "../types/superposicion.types";

interface FormularioSuperposicionProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: SuperposicionFormData) => void;
    editData?: SuperposicionData | null;
    isEditing?: boolean;
}

export function FormularioSuperposicion ({
    isOpen,
    onClose,
    onSubmit,
    editData,
    isEditing = false
}: FormularioSuperposicionProps) {
    const [formData, setFormData] = useState<SuperposicionFormData>({
        nroExp: "",
        asunto: "",
        tipoSolicitud: "",
        profesional: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Cargar datos para edición
    useEffect(() => {
        if (editData && isEditing) {
            setFormData({
                nroExp: editData.nroExp,
                asunto: editData.asunto,
                tipoSolicitud: editData.tipoSolicitud,
                profesional: editData.profesional
            });
        } else {
            // Resetear formulario para nuevo registro
            setFormData({
                nroExp: "",
                asunto: "",
                tipoSolicitud: "",
                profesional: ""
            });
        }
        setErrors({});
    }, [editData, isEditing, isOpen]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.nroExp.trim()) {
            newErrors.nroExp = "El número de expediente es requerido";
        }

        if (!formData.asunto.trim()) {
            newErrors.asunto = "El asunto es requerido";
        }

        if (!formData.tipoSolicitud) {
            newErrors.tipoSolicitud = "El tipo de solicitud es requerido";
        }

        if (!formData.profesional) {
            newErrors.profesional = "El profesional es requerido";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
            onClose();
        }
    };

    const handleInputChange = (field: keyof SuperposicionFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>
                            {isEditing ? "Editar Superposición" : "Agregar Nueva Superposición"}
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Número de Expediente */}
                    <div className="space-y-2">
                        <Label htmlFor="nroExp" className="text-sm font-medium">
                            Número de Expediente *
                        </Label>
                        <Input
                            id="nroExp"
                            value={formData.nroExp}
                            onChange={(e) => handleInputChange("nroExp", e.target.value)}
                            placeholder="Ej: 2025-0016083"
                            className={errors.nroExp ? "border-red-500" : "border-lime-700"}
                        />
                        {errors.nroExp && (
                            <p className="text-sm text-red-500">{errors.nroExp}</p>
                        )}
                    </div>

                    {/* Asunto */}
                    <div className="space-y-2">
                        <Label htmlFor="asunto" className="text-sm font-medium">
                            Asunto *
                        </Label>
                        <Textarea
                            id="asunto"
                            value={formData.asunto}
                            onChange={(e) => handleInputChange("asunto", e.target.value)}
                            placeholder="Ingrese el asunto del expediente"
                            className={`min-h-[100px] ${errors.asunto ? "border-red-500" : "border-lime-700"}`}
                        />
                        {errors.asunto && (
                            <p className="text-sm text-red-500">{errors.asunto}</p>
                        )}
                    </div>

                    {/* Tipo de Solicitud */}
                    <div className="space-y-2">
                        <Label htmlFor="tipoSolicitud" className="text-sm font-medium">
                            Tipo de Solicitud *
                        </Label>
                        <Select
                            value={formData.tipoSolicitud}
                            onValueChange={(value) => handleInputChange("tipoSolicitud", value)}
                        >
                            <SelectTrigger
                                id="tipoSolicitud"
                                className={errors.tipoSolicitud ? "border-red-500" : "border-lime-700"}
                            >
                                <SelectValue placeholder="Seleccione el tipo de solicitud" />
                            </SelectTrigger>
                            <SelectContent>
                                {TIPOS_SOLICITUD.map((tipo) => (
                                    <SelectItem key={tipo} value={tipo}>
                                        {tipo}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.tipoSolicitud && (
                            <p className="text-sm text-red-500">{errors.tipoSolicitud}</p>
                        )}
                    </div>

                    {/* Profesional */}
                    <div className="space-y-2">
                        <Label htmlFor="profesional" className="text-sm font-medium">
                            Profesional *
                        </Label>
                        <Select
                            value={formData.profesional}
                            onValueChange={(value) => handleInputChange("profesional", value)}
                        >
                            <SelectTrigger
                                id="profesional"
                                className={errors.profesional ? "border-red-500" : "border-lime-700"}
                            >
                                <SelectValue placeholder="Seleccione el profesional" />
                            </SelectTrigger>
                            <SelectContent>
                                {PROFESIONALES.map((prof) => (
                                    <SelectItem key={prof} value={prof}>
                                        {prof}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.profesional && (
                            <p className="text-sm text-red-500">{errors.profesional}</p>
                        )}
                    </div>

                    {/* Botones de acción */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="border-lime-700 text-lime-700 hover:bg-lime-50"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            {isEditing ? "Actualizar" : "Guardar"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
