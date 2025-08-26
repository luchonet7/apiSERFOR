import { useCallback, useState } from 'react';
import { buscarExacto, getData } from '@/service/data.actions';

interface DataMapperTiposOptions {
    dataAttribute: string;      // Nombre del atributo de la data original
    tableName: string;         // Nombre de la tabla (tipos)
    tableAttribute: string;    // Atributo de la tabla para comparar
    tipocon: boolean;         // Si es true usa buscarExacto, si es false usa getData
    valortipocon: string;     // Valor para tipo conexion (001 - agua / 002 - desague)
}

interface UseDataMapperTiposReturn {
    mapDataWithDescriptions: (data: any[], options: DataMapperTiposOptions[]) => Promise<any[]>;
    isLoading: boolean;
    error: string | null;
}

/**
 * Hook personalizado para mapear datos con descripciones de tablas de tipos
 * 
 * @returns {UseDataMapperTiposReturn} Objeto con la función de mapeo y estados
 * 
 * @example
 * const { mapDataWithDescriptions, isLoading, error } = useDataMapperTipos();
 * 
 * const dataMapeada = await mapDataWithDescriptions(dataOriginal, [
 *   {
 *     dataAttribute: 'tiposervicio',
 *     tableName: 'tiposervicio',
 *     tableAttribute: 'codigo',
 *     tipocon: false,
 *     valortipocon: ''
 *   },
 *   {
 *     dataAttribute: 'tipoaccesoriosconex_a',
 *     tableName: 'tipoaccesoriosconex',
 *     tableAttribute: 'codigo',
 *     tipocon: true,
 *     valortipocon: '001'
 *   }
 * ]);
 */
export const useDataMapperTipos = (): UseDataMapperTiposReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Mapea los datos reemplazando códigos con descripciones
     */
    const mapDataWithDescriptions = useCallback(async (
        data: any[],
        options: DataMapperTiposOptions[]
    ): Promise<any[]> => {
        try {
            setIsLoading(true);
            setError(null);

            // Validaciones
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('Los datos deben ser un array no vacío');
            }

            if (!Array.isArray(options) || options.length === 0) {
                throw new Error('Las opciones deben ser un array no vacío');
            }

            const tableDataPromises = options.map(async (option) => {
                const { tableName, tipocon, valortipocon } = option;

                if (tipocon) {
                    return await buscarExacto(tableName, ["tipocon"], [valortipocon]);
                } else {
                    return await getData(tableName);
                }
            });

            const tableDataResults = await Promise.all(tableDataPromises);

            // Verificar que todas las consultas fueron exitosas
            const failedRequests = tableDataResults.filter((result: any) => !result.success);
            if (failedRequests.length > 0) {
                const errorMessages = failedRequests.map((result: any) => result.message).join(', ');
                throw new Error(`Error al obtener datos de tablas: ${errorMessages}`);
            }

            // Crear un mapa de códigos a descripciones para cada tabla
            const codeToDescriptionMaps = tableDataResults.map((result: any, index: number) => {
                const tableData = result.data;
                const tableAttribute = options[index].tableAttribute;

                const map = new Map();

                tableData.forEach((item: any) => {
                    const code = item[tableAttribute];
                    const description = item.descripcion || item.nombre;

                    if (code !== undefined && description !== undefined) {
                        map.set(code.toString(), description);
                    }
                });

                return map;
            });

            // Mapear los datos originales
            const mappedData = data.map((item: any) => {
                const mappedItem = { ...item };

                options.forEach((option, index) => {
                    const { dataAttribute } = option;
                    const codeToDescriptionMap = codeToDescriptionMaps[index];
                    const originalValue = item[dataAttribute];

                    if (originalValue !== undefined && originalValue !== null) {
                        const description = codeToDescriptionMap.get(originalValue.toString());
                        if (description !== undefined) {
                            mappedItem[dataAttribute] = description;
                        }
                    }
                });

                return mappedItem;
            });

            return mappedData;

        } catch (err: any) {
            const errorMessage = err.message || 'Error desconocido al mapear datos';
            setError(errorMessage);
            console.error('Error en useDataMapperTipos:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        mapDataWithDescriptions,
        isLoading,
        error
    };
};

export default useDataMapperTipos; 