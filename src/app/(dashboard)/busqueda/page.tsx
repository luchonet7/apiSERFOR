import { TitlePage } from "@/components/custom/title-page";
import { BusquedaContainer } from "@/modules/superposicion/components/busqueda-container";
import { Home, Search } from "lucide-react";

export default function BusquedaPage () {
  const breadcrumb = [
    {
      label: "Inicio",
      href: "/dashboard",
      icon: <Home className="w-4 h-4" />,
    },
    {
      label: "Búsqueda",
      icon: <Search className="w-4 h-4" />,
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-green-50 dark:bg-green-950/20 h-full">
      <TitlePage
        title="Búsqueda de Superposición"
        breadcrumb={breadcrumb}
      />

      <div className="bg-white dark:bg-stone-950/50 rounded-lg shadow-sm">
        <BusquedaContainer />
      </div>
    </div>
  );
}
