"use client";

import * as React from "react";
import { Info, Monitor, Moon, Sun, ChevronDown, ChevronUp, EllipsisVertical } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

// Tipo para el usuario simulado
interface MockUser {
  id: string;
  email: string;
  name: string;
  numeroDocumento: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  celular: string;
  estado: boolean;
  rol: string;
  fechaCreacion: Date;
}

export function Navbar() {
  const { setTheme } = useTheme();
  const { data: session } = useSession();

  // Estado para el usuario simulado
  const [mockUser, setMockUser] = useState<MockUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cargar datos simulados del localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("mockUser");
      const loginStatus = localStorage.getItem("isLoggedIn");

      if (userData && loginStatus === "true") {
        setMockUser(JSON.parse(userData));
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Usar datos simulados o de sesión real
  const displayUser = mockUser || session?.user;
  const userIsLoggedIn = isLoggedIn || !!session;

  const handleUserAction = (action: string) => {
    if (action === "Cerrar sesión") {
      // Limpiar datos simulados
      if (typeof window !== "undefined") {
        localStorage.removeItem("mockUser");
        localStorage.removeItem("isLoggedIn");
      }
      setMockUser(null);
      setIsLoggedIn(false);

      toast.success("Sesión cerrada exitosamente", {
        description: "Redirigiendo al login...",
      });

      // Redireccionar al login después de un delay
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 1000);
    } else {
      toast(`Acción: ${action}`, {
        description: "Funcionalidad en desarrollo",
      });
    }
  };

  return (
    <div className="border-b bg-background relative h-16 flex items-center">
      <div className="flex items-center justify-between px-4 sm:pr-6 sm:pl-0 w-full h-full">
        {/* Lado izquierdo: Toggle + Logos */}
        <div className="flex items-center gap-2 h-full">
          <SidebarTrigger className="h-8 w-8 ml-2" />
          
          {/* Separator - Oculto en móviles */}
          <Separator orientation="vertical" className="h-8 hidden md:block" />

          {/* Logos - Ocultos en móviles */}
          <div className="flex items-center gap-3 hidden md:flex">
            <div className="relative h-10 w-40 flex-shrink-0">
              <Image
                src="/logo-minagri.png"
                alt="Logo Perú"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-10 w-40 flex-shrink-0">
              <Image
                src="/logo-serfor.png"
                alt="Logo SERFOR"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Lado derecho: Nombre de SISTEMA y avatar */}
        <div className="flex items-center gap-5 h-full">
          {/* Título del sistema - Oculto en móviles */}
          <h1 className="text-sm sm:text-base md:text-md font-semibold text-foreground truncate hidden md:block">
            Analisis de superposición de petitorios mineros
          </h1>
          
          {/* Avatar del usuario - Siempre visible */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">
                {displayUser?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {displayUser?.name || "Usuario"}
              </span>
              <span className="truncate text-xs">
                {displayUser?.email || "usuario@serfor.gob.pe"}
              </span>
            </div>
            <EllipsisVertical className="size-4 ml-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
