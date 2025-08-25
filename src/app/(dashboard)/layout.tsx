"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        {/* Navbar en la parte superior con ancho completo */}
        <div className="navbar-container">
            <Navbar />
        </div>
        
        {/* Contenedor para sidebar y contenido principal */}
        <div className="flex flex-1 relative sidebar-container">
          <AppSidebar />
          <main className="flex-1 main-content">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
