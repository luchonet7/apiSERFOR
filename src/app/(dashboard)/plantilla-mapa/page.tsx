import { TitlePage } from "@/components/custom/title-page";
import { Home, Map } from "lucide-react";
import { PlantillaMapaContainer } from "@/modules/plantilla-mapa/components/plantilla-mapa-container";

export default function PlantillaMapaPage() {
  const breadcrumb = [
    {
      label: "Inicio",
      href: "/dashboard",
      icon: <Home className="w-4 h-4" />,
    },
    {
      label: "Plantilla de Mapa",
      icon: <Map className="w-4 h-4" />,
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-green-50 dark:bg-green-950/20 h-full">
      <TitlePage
        title="Mantenimiento Plantilla de Mapa"
        breadcrumb={breadcrumb}
      />
      
      <div className="bg-white dark:bg-stone-950/50 rounded-lg shadow-sm">
        <PlantillaMapaContainer />
      </div>
    </div>
  );
}
