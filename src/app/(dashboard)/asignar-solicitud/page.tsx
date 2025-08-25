import { TitlePage } from "@/components/custom/title-page";
import { Home, UserPlus } from "lucide-react";
import { AsignarSolicitudContainer } from "@/modules/asignar-solicitud/components/asignar-solicitud-container";

export default function AsignarSolicitudPage() {
  const breadcrumb = [
    {
      label: "Inicio",
      href: "/dashboard",
      icon: <Home className="w-4 h-4" />,
    },
    {
      label: "Administración de Solicitudes",
      icon: <UserPlus className="w-4 h-4" />,
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-green-50 dark:bg-green-950/20">
      <TitlePage
        title="Asignar de Solicitud a Usuario"
        breadcrumb={breadcrumb}
      />
      
      <div className="bg-white dark:bg-stone-950/50 rounded-lg shadow-sm">
        <AsignarSolicitudContainer />
      </div>
    </div>
  );
}
