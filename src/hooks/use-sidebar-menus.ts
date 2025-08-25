import { 
  Home, 
  FileSearch, 
  Search, 
  Settings, 
  FileText, 
  Map, 
  Layers, 
  UserPlus, 
  FileUser 
} from "lucide-react";

export interface SidebarMenuItem {
  title: string;
  url: string;
  icon: any;
  description?: string;
  disabled?: boolean;
  badge?: string;
}

export interface SidebarMenuGroup {
  label: string;
  items: SidebarMenuItem[];
}

export function useSidebarMenus() {
  const menuGroups: SidebarMenuGroup[] = [
    {
      label: "Principal",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: Home,
          description: "Panel principal del sistema",
        },
        {
          title: "Superposición",
          url: "/superposicion",
          icon: FileSearch,
          description: "Análisis de superposición de petitorios mineros",
        },
        {
          title: "Búsqueda",
          url: "/busqueda",
          icon: Search,
          description: "Búsqueda de expedientes y documentos",
        },
        {
          title: "Mantenimiento",
          url: "/mantenimiento",
          icon: Settings,
          description: "Configuración y mantenimiento del sistema",
        },
      ],
    },
    {
      label: "Herramientas",
      items: [
        {
          title: "Plantilla Word",
          url: "/plantilla-word",
          icon: FileText,
          description: "Plantillas de documentos Word",
        },
        {
          title: "Plantilla Mapa",
          url: "/plantilla-mapa",
          icon: Map,
          description: "Plantillas cartográficas",
        },
        {
          title: "Capas",
          url: "/capas",
          icon: Layers,
          description: "Gestión de capas geográficas",
        },
      ],
    },
    {
      label: "Asignaciones",
      items: [
        {
          title: "Asignar Solicitud",
          url: "/asignar-solicitud",
          icon: UserPlus,
          description: "Asignación de solicitudes",
        },
        {
          title: "Asignar Capa",
          url: "/asignar-capa",
          icon: FileUser,
          description: "Asignación de capas a usuarios",
        },
      ],
    },
  ];

  const getFilteredMenus = (): SidebarMenuGroup[] => {
    // Aquí se puede agregar lógica de filtrado basada en roles
    return menuGroups;
  };

  return {
    getFilteredMenus,
    menuGroups,
  };
}
