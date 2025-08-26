import { useCallback } from 'react';

interface ExportExcelOptions {
    headers?: string[];
    fieldMapping?: string[];
    filename?: string;
    sheetName?: string;
}

interface UseExportExcelReturn {
    exportToExcel: (data: any[], options?: ExportExcelOptions) => void;
}

export const useExportExcel = (): UseExportExcelReturn => {

    /**
     * Convierte un array de objetos a formato CSV
     */
    const convertToCSV = useCallback((data: any[], headers?: string[], fieldMapping?: string[]): string => {
        if (!data || data.length === 0) {
            throw new Error('No hay datos para exportar');
        }

        // Si no se proporcionan headers, usar las claves del primer objeto
        const defaultHeaders = Object.keys(data[0]);
        const finalHeaders = headers || defaultHeaders;
        const finalFieldMapping = fieldMapping || defaultHeaders;

        // Validar que el número de headers coincida con el mapping
        if (finalHeaders.length !== finalFieldMapping.length) {
            throw new Error('El número de cabeceras debe coincidir con el número de campos mapeados');
        }

        // Crear la línea de cabeceras
        const headerRow = finalHeaders.join(',');

        // Crear las líneas de datos
        const dataRows = data.map(row => {
            return finalFieldMapping.map(field => {
                const value = row[field];
                // Escapar comillas y envolver en comillas si contiene coma, comilla o salto de línea
                if (value === null || value === undefined) {
                    return '';
                }
                const stringValue = String(value);
                if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                    return `"${stringValue.replace(/"/g, '""')}"`;
                }
                return stringValue;
            }).join(',');
        });

        return [headerRow, ...dataRows].join('\n');
    }, []);

    /**
     * Descarga un archivo CSV como Excel (con extensión .xlsx)
     */
    const downloadCSVAsExcel = useCallback((csvContent: string, filename: string = 'export.xlsx'): void => {
        // Crear el blob con el contenido CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        // Crear el enlace de descarga
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';

        // Agregar al DOM, hacer clic y limpiar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Liberar la URL del objeto
        URL.revokeObjectURL(url);
    }, []);

    /**
     * Función principal para exportar a Excel
     */
    const exportToExcel = useCallback((data: any[], options: ExportExcelOptions = {}): void => {
        try {
            const {
                headers,
                fieldMapping,
                filename = 'export.xlsx',
                sheetName = 'Sheet1'
            } = options;

            // Validaciones básicas
            if (!Array.isArray(data)) {
                throw new Error('Los datos deben ser un array');
            }

            if (data.length === 0) {
                throw new Error('El array de datos está vacío');
            }

            // Si se proporcionan headers pero no fieldMapping, usar las claves del primer objeto
            if (headers && !fieldMapping) {
                const defaultFields = Object.keys(data[0]);
                if (headers.length !== defaultFields.length) {
                    throw new Error('El número de cabeceras debe coincidir con el número de campos en los datos');
                }
            }

            // Convertir a CSV
            const csvContent = convertToCSV(data, headers, fieldMapping);

            // Descargar el archivo
            downloadCSVAsExcel(csvContent, filename);

        } catch (error) {
            console.error('Error al exportar a Excel:', error);
            throw error;
        }
    }, [convertToCSV, downloadCSVAsExcel]);

    return {
        exportToExcel
    };
};

export default useExportExcel; 