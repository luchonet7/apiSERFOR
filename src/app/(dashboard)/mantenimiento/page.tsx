import { TitlePage } from "@/components/custom/title-page";
import { Home, Map } from "lucide-react";

export default function MantenimientoPage() {
  const breadcrumb = [
    {
      label: "Inicio",
      href: "/dashboard",
      icon: <Home className="w-4 h-4" />,
    },
    {
      label: "Mantenimiento",
      icon: <Map className="w-4 h-4" />,
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-green-50 dark:bg-green-950/20 h-full">
      <TitlePage
        title="Mantenimiento"
        breadcrumb={breadcrumb}
      />
    </div>
  );
}
