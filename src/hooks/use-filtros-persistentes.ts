import { useState, useEffect } from 'react';

export interface FiltrosPersistentes {
  [key: string]: any;
}

export function useFiltrosPersistentes<T extends FiltrosPersistentes>(
  key: string,
  filtrosIniciales: T
) {
  const [filtros, setFiltros] = useState<T>(filtrosIniciales);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar filtros guardados al inicializar
  useEffect(() => {
    try {
      const filtrosGuardados = localStorage.getItem(key);
      if (filtrosGuardados) {
        const parsedFiltros = JSON.parse(filtrosGuardados);
        setFiltros(parsedFiltros);
      }
    } catch (error) {
      console.error('Error al cargar filtros guardados:', error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  // Función para guardar filtros aplicados
  const guardarFiltrosAplicados = (filtrosAplicados: T) => {
    setFiltros(filtrosAplicados);
    try {
      localStorage.setItem(key, JSON.stringify(filtrosAplicados));
    } catch (error) {
      console.error('Error al guardar filtros aplicados:', error);
    }
  };

  // Función para limpiar filtros y eliminarlos del localStorage
  const limpiarFiltros = () => {
    setFiltros(filtrosIniciales);
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error al limpiar filtros:', error);
    }
  };

  // Función para verificar si hay filtros aplicados
  const tieneFiltrosAplicados = () => {
    return Object.values(filtros).some(
      (value) => value && value.toString().trim() !== ""
    );
  };

  return {
    filtros,
    guardarFiltrosAplicados,
    limpiarFiltros,
    tieneFiltrosAplicados,
    isLoaded
  };
} 