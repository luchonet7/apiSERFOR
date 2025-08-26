import { useState, useEffect } from 'react';
import { getConfiguracionPublica } from '@/modules/configuracion/action/parametros.action';
import { ConfiguracionDto } from '@/models/configuracion';

export function useConfiguracionPublica () {
  const [configuracion, setConfiguracion] = useState<ConfiguracionDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const loadConfiguracion = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await getConfiguracionPublica();

        if (result.success) {
          setConfiguracion(result.data);
        } else {
          setError(result.message || 'Error al cargar configuración');
        }
      } catch (err) {
        console.error('Error loading configuracion:', err);
        setError('Error al cargar la configuración');
      } finally {
        setIsLoading(false);
      }
    };

    loadConfiguracion();
  }, [isClient]);

  return {
    configuracion,
    isLoading: !isClient || isLoading,
    error,
  };
} 