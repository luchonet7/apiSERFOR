import { TitlePage } from "@/components/custom/title-page";
import { Home, Layers } from "lucide-react";
import { CapasContainer } from "@/modules/capas/components/capas-container";

export default function CapasPage() {
  const breadcrumb = [
    {
      label: "Inicio",
      href: "/dashboard",
      icon: <Home className="w-4 h-4" />,
    },
    {
      label: "Capas",
      icon: <Layers className="w-4 h-4" />,
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-green-50 dark:bg-green-950/20 h-full">
      <TitlePage
        title="Mantenimiento Capas"
        breadcrumb={breadcrumb}
      />
      
      <div className="bg-white dark:bg-stone-950/50 rounded-lg shadow-sm">
        <CapasContainer />
      </div>
    </div>
  );
}
