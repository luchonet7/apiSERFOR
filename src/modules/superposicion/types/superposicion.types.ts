// Tipo para los datos de superposición
export interface SuperposicionData {
    id: string;
    nroExp: string;
    asunto: string;
    tipoSolicitud: string;
    profesional: string;
}

// Tipo para los filtros de búsqueda
export interface FiltrosBusqueda {
    filtro: string;
    nombre: string;
    fechaDesde?: Date;
    fechaHasta?: Date;
}

// Tipo para el formulario (sin ID)
export type SuperposicionFormData = Omit<SuperposicionData, 'id'>;

// Opciones para tipos de solicitud
export const TIPOS_SOLICITUD = [
    "Análisis de superposición de petitorios mineros",
    "Análisis de superposición de concesiones forestales",
    "Análisis de superposición de áreas protegidas",
    "Análisis de superposición de territorios indígenas",
    "Otros"
] as const;

// Opciones para profesionales
export const PROFESIONALES = [
    "Lenin Ventura",
    "María García",
    "Carlos López",
    "Ana Rodríguez",
    "Pedro Martínez"
] as const;
