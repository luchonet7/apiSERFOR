// API Demo para el módulo de superposición

export interface ExpedienteData {
  nroExpediente: string;
  asunto: string;
  fecha: string;
  estado: string;
}

export interface AnalisisResult {
  id: string;
  areaId: string;
  areaNombre: string;
  tipoConflicto: 'superposicion' | 'libre';
  descripcion: string;
  hectareas: number;
  detalles?: string;
}

export interface SuperposicionAnalisis {
  expediente: ExpedienteData;
  resultados: AnalisisResult[];
  resumen: {
    totalAreas: number;
    superposiciones: number;
    areaTotal: number;
  };
}

// Datos demo
const demoExpedientes: ExpedienteData[] = [
  {
    nroExpediente: "EXP-2024-001",
    asunto: "Solicitud de concesión minera - Sector Norte",
    fecha: "2024-01-15",
    estado: "en_proceso"
  },
  {
    nroExpediente: "EXP-2024-002", 
    asunto: "Análisis de superposición - Área de expansión",
    fecha: "2024-01-20",
    estado: "completado"
  }
];

const demoResultados: AnalisisResult[] = [
  {
    id: "1",
    areaId: "area1",
    areaNombre: "Área uno",
    tipoConflicto: "libre",
    descripcion: "No se detectaron superposiciones",
    hectareas: 567.4
  },
  {
    id: "2", 
    areaId: "area2",
    areaNombre: "Área dos",
    tipoConflicto: "superposicion",
    descripcion: "Conflicto con petitorio minero existente",
    hectareas: 45.2,
    detalles: "Superposición parcial con concesión minera CM-2023-045"
  },
  {
    id: "3",
    areaId: "area3", 
    areaNombre: "Área tres",
    tipoConflicto: "libre",
    descripcion: "No se detectaron superposiciones",
    hectareas: 234.1
  },
  {
    id: "4",
    areaId: "area4",
    areaNombre: "Área cuatro", 
    tipoConflicto: "superposicion",
    descripcion: "Conflicto con área natural protegida",
    hectareas: 12.8,
    detalles: "Superposición con Parque Nacional Ejemplo"
  }
];

// Simulación de APIs
export const superposicionApi = {
  // Obtener expedientes
  async getExpedientes(): Promise<ExpedienteData[]> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    return demoExpedientes;
  },

  // Crear nuevo análisis
  async crearAnalisis(datos: {
    nroExpediente: string;
    asunto: string;
    fecha: string;
    archivo?: File;
    areas: string[];
  }): Promise<{ success: boolean; id: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Creando análisis con datos:", datos);
    
    return {
      success: true,
      id: `analisis-${Date.now()}`
    };
  },

  // Ejecutar análisis de superposición
  async ejecutarAnalisis(analisisId: string): Promise<SuperposicionAnalisis> {
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const expediente = demoExpedientes[0];
    const resultados = demoResultados;
    
    const resumen = {
      totalAreas: resultados.length,
      superposiciones: resultados.filter(r => r.tipoConflicto === 'superposicion').length,
      areaTotal: resultados.reduce((sum, r) => sum + r.hectareas, 0)
    };

    return {
      expediente,
      resultados,
      resumen
    };
  },

  // Exportar resultados
  async exportarResultados(analisisId: string, formato: 'pdf' | 'excel' | 'shapefile'): Promise<Blob> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simular archivo
    const contenido = `Reporte de análisis ${analisisId} - Formato: ${formato}`;
    return new Blob([contenido], { type: 'text/plain' });
  }
};

// Hook para usar la API (opcional)
export const useSuperposicionApi = () => {
  const crearYEjecutarAnalisis = async (datos: {
    nroExpediente: string;
    asunto: string;
    fecha: string;
    archivo?: File;
    areas: string[];
  }) => {
    try {
      // 1. Crear análisis
      const { id } = await superposicionApi.crearAnalisis(datos);
      
      // 2. Ejecutar análisis
      const resultados = await superposicionApi.ejecutarAnalisis(id);
      
      return { success: true, data: resultados };
    } catch (error) {
      console.error("Error en análisis:", error);
      return { success: false, error: "Error al procesar el análisis" };
    }
  };

  return {
    crearYEjecutarAnalisis,
    ...superposicionApi
  };
};

