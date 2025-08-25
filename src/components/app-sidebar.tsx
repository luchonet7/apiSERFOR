"use client";

import * as React from "react";
import { EllipsisVertical, LogOut, User, ChevronUp, Monitor, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useSidebarMenus } from "@/hooks/use-sidebar-menus";

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname();
  const { state } = useSidebar();
  const { data: session } = useSession();
  const { getFilteredMenus } = useSidebarMenus();
  const { setTheme, theme, resolvedTheme } = useTheme();
  const isCollapsed = state === "collapsed";
  
  // Estado para el usuario simulado
  const [mockUser, setMockUser] = useState<MockUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Marcar cuando el componente está montado
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cargar datos simulados del localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('mockUser');
      const loginStatus = localStorage.getItem('isLoggedIn');
      
      if (userData && loginStatus === 'true') {
        setMockUser(JSON.parse(userData));
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Usar datos simulados o de sesión real
  const displayUser = mockUser || session?.user;
  const userIsLoggedIn = isLoggedIn || !!session;

  const handleMenuClick = (title: string, url: string) => {
    router.push(url);
  };

  const handleLogout = () => {
    // Limpiar datos simulados
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockUser');
      localStorage.removeItem('isLoggedIn');
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
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast.success(`Tema cambiado`, {
      description: `Modo ${newTheme === 'light' ? 'claro' : newTheme === 'dark' ? 'oscuro' : 'sistema'} activado`,
    });
  };

  return (
    <div className="relative md:h-full">
      <Sidebar 
        collapsible="icon" 
        className="md:!relative md:!inset-auto md:h-full md:border-r md:!z-10" 
        {...props}
      >
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-0"> 
          </div>
        </SidebarHeader>

        <SidebarContent>
        {getFilteredMenus().map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        tooltip={item.description || item.title}
                        isActive={isActive}
                        disabled={item.disabled}
                        onClick={() => handleMenuClick(item.title, item.url)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          {/* Selector de Tema */}
          <SidebarMenuItem>
            <div className={`px-3 py-2 ${isCollapsed ? "" : "flex items-center justify-between"}`}>
              <span className="text-xs font-medium text-sidebar-foreground">
                {!isCollapsed ? "Tema" : ""}
              </span>
              <div className={`flex items-center justify-center gap-1 ${isCollapsed ? "flex-col" : ""}`}>
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
                    !mounted 
                      ? 'bg-muted text-muted-foreground' 
                      : theme === 'light' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                  }`}
                  title="Modo claro"
                >
                  <Sun className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
                    !mounted 
                      ? 'bg-muted text-muted-foreground' 
                      : theme === 'dark' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                  }`}
                  title="Modo oscuro"
                >
                  <Moon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </SidebarMenuItem>

          {/* Cerrar Sesión */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      </Sidebar>
    </div>
  );
}
