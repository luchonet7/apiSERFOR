import { TitlePage } from "@/components/custom/title-page";
import { Home, FileSearch } from "lucide-react";
import { SuperposicionContainer } from "@/modules/superposicion/components/superposicion-container";

export default function SuperposicionPage () {
  const breadcrumb = [
    {
      label: "Inicio",
      href: "/dashboard",
      icon: <Home className="w-4 h-4" />,
    },
    {
      label: "Superposición",
      icon: <FileSearch className="w-4 h-4" />,
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-green-50 dark:bg-green-950/20">
      <TitlePage
        title="Registrar Análisis de Superposición"
        breadcrumb={breadcrumb}
      />

      <div className="bg-white dark:bg-stone-950/50 rounded-lg shadow-sm">
        <SuperposicionContainer />
      </div>
    </div>
  );
}

