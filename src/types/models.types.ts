// Tipos para evitar dependencias circulares en los modelos

export interface IArea {
  id: number;
  nombre: string;
  descripcion?: string;
  fechaCreacion: Date;
  estado: boolean;
  usuarios?: any[];
  conceptosTramite?: any[];
}

export interface IConceptoTramite {
  id: number;
  nombre: string;
  descripcion?: string;
  fechaCreacion: Date;
  estado: boolean;
  area: IArea | null;
  areaId: number;
  requisitos?: IRequisito[];
}

export interface IRequisito {
  id: number;
  nombre: string;
  fechaCreacion: Date;
  estado: boolean;
  conceptosTramite?: IConceptoTramite[];
}

export interface IRecurso {
  id: number;
  titulo: string;
  tipo: string;
  recurso: string;
  fechaCreacion: Date;
  estado: boolean;
}

// ===== SOLICITUD TRAMITE =====
export interface ISolicitudTramite {
  id: number;
  codigo: string;
  asunto: string;
  descripcion: string;
  conceptoTramiteId: number;
  conceptoTramite?: IConceptoTramite;
  fecha: Date;
  numeroFolios: number;
  numeroSolicitud: string;
  iniciales: string;
  archivo?: string | null;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  razonSocial?: string | null;
  tipoPersona: string;
  numeroDocumento: string;
  tipoDocumento: string;
  telefono: string;
  correo: string;
  direccion?: string | null;
} 