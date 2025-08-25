"use client";

import { Badge } from "@/components/ui/badge";
import { AllowRoles } from "@/enums/allow-roles";
import { cn } from "@/lib/utils";

interface RoleBadgeProps {
  role: AllowRoles;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export function RoleBadge({ 
  role, 
  size = "default", 
  variant = "default",
  className 
}: RoleBadgeProps) {
  const getRoleConfig = (role: AllowRoles) => {
    switch (role) {
      case AllowRoles.ADMIN:
        return {
          label: "Administrador",
          color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
        };
      case AllowRoles.JEFE_AREA:
        return {
          label: "Jefe de Área",
          color: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
        };
      case AllowRoles.PERSONAL_AREA:
        return {
          label: "Personal de Área",
          color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
        };
      case AllowRoles.USUARIO:
        return {
          label: "Usuario",
          color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
        };
      default:
        return {
          label: "Usuario",
          color: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800",
        };
    }
  };

  const roleConfig = getRoleConfig(role);

  return (
    <Badge
      variant={variant}
      className={cn(
        "border",
        roleConfig.color,
        size === "sm" && "text-xs px-1.5 py-0.5",
        size === "lg" && "text-sm px-3 py-1",
        className
      )}
    >
      {roleConfig.label}
    </Badge>
  );
} 