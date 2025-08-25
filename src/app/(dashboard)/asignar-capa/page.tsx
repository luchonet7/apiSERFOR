import { TitlePage } from "@/components/custom/title-page";
import { AsignarCapaContainer } from "@/modules/asignar-capa/components";
import { Home, Layers } from "lucide-react";

export default function AsignarCapaPage() {
  return (
    <div className="space-y-6 p-6 bg-green-50 dark:bg-green-950/20 h-full">
      <TitlePage
        title="Asignar de Capas a Solicitud"
        breadcrumb={[
          { label: "Inicio", href: "/dashboard", icon: <Home className="w-4 h-4" /> },
          { label: "Administración de Capas", icon: <Layers className="w-4 h-4" /> }
        ]}
      />
      <div className="bg-white dark:bg-stone-950/50 rounded-lg shadow-sm">
        <AsignarCapaContainer />
      </div>
    </div>
  );
}

