import { TitlePage } from "@/components/custom/title-page";
import { Home, FileText } from "lucide-react";
import { PlantillaWordContainer } from "@/modules/plantilla-word/components/plantilla-word-container";

export default function PlantillaWordPage() {
  const breadcrumb = [
    {
      label: "Inicio",
      href: "/dashboard",
      icon: <Home className="w-4 h-4" />,
    },
    {
      label: "Plantilla de Informe",
      icon: <FileText className="w-4 h-4" />,
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-green-50 dark:bg-green-950/20 h-full">
      <TitlePage
        title="Mantenimiento Plantilla Informe"
        breadcrumb={breadcrumb}
      />
      
      <div className="bg-white dark:bg-stone-950/50 rounded-lg shadow-sm">
        <PlantillaWordContainer />
      </div>
    </div>
  );
}
