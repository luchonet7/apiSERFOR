# Módulo de Superposición con Mapa Interactivo

Este módulo implementa un sistema de superposición geográfica con un mapa interactivo que permite importar y visualizar archivos geográficos.

## Características

### 🗺️ Mapa Interactivo
- **React Leaflet**: Mapa interactivo basado en OpenStreetMap
- **Centrado automático**: El mapa se centra automáticamente en los datos cargados
- **Zoom y navegación**: Controles de zoom y navegación estándar

### 📁 Importación de Archivos
- **GeoJSON** (.geojson, .json): Formato estándar para datos geográficos
- **Shapefile** (.zip): Archivos ESRI Shapefile comprimidos
- **KML** (.kml): Formato de Google Earth/KML

### 🎨 Ámbitos de Consulta
- **Colores únicos**: Cada polígono tiene un color distintivo
- **Visibilidad**: Control individual de visibilidad de cada ámbito
- **Gestión**: Agregar, eliminar y modificar ámbitos de consulta
- **Lista dinámica**: Panel lateral con lista de ámbitos cargados

## Componentes Principales

### MapaInteractivo
Componente principal que maneja:
- Importación de archivos geográficos
- Renderizado de polígonos en el mapa
- Gestión de ámbitos de consulta
- Controles de visibilidad

### MapaPlaceholder
Wrapper que integra el mapa en el flujo de trabajo:
- Manejo de estado de ámbitos
- Integración con formularios

### AnalisisView
Vista de análisis que incluye:
- Mapa interactivo para análisis
- Panel de ámbitos de consulta
- Resultados de superposición

## Uso

### 1. Importar Archivos
```typescript
// El componente acepta archivos arrastrados o seleccionados
<MapaInteractivo 
  ambitos={ambitos}
  onAmbitosChange={setAmbitos}
/>
```

### 2. Gestión de Ámbitos
```typescript
interface AmbitoConsulta {
  id: string;
  name: string;
  geojson: GeoFeature;
  visible: boolean;
  color: string;
}
```

### 3. Datos de Ejemplo
El componente incluye un botón "Ejemplo" que carga datos de demostración para probar la funcionalidad.

## Formatos Soportados

### GeoJSON
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Mi Área"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[lng, lat], [lng, lat], ...]]
      }
    }
  ]
}
```

### Shapefile
- Archivo ZIP que contiene .shp, .shx, .dbf y otros archivos relacionados
- Se procesa automáticamente usando la librería `shapefile`

### KML
- Formato XML de Google Earth
- Se parsea para extraer Placemarks con geometrías

## Dependencias

```json
{
  "react-leaflet": "^4.2.1",
  "leaflet": "^1.9.4",
  "@types/leaflet": "^1.9.8",
  "shapefile": "^0.6.6"
}
```

## Configuración

### Leaflet Icons
Se incluye configuración para evitar problemas con iconos en Next.js:
```typescript
// src/lib/leaflet-config.ts
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
```

## Flujo de Trabajo

1. **Registro**: Usuario carga archivos geográficos y define ámbitos
2. **Análisis**: Sistema procesa superposiciones y muestra resultados
3. **Resultados**: Visualización de análisis en mapa y tablas

## Notas Técnicas

- Los archivos se procesan en el cliente usando FileReader API
- Los polígonos se renderizan usando react-leaflet GeoJSON
- El estado se mantiene entre pasos del flujo de trabajo
- Se incluyen notificaciones toast para feedback del usuario
