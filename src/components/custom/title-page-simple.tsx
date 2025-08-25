"use client"

import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface TitlePageSimpleProps {
  title: string
  subtitle?: string
  description?: string
  icon?: ReactNode
  variant?: "default" | "centered" | "minimal" | "gradient"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showDivider?: boolean
  children?: ReactNode
}

const variants = {
  default: "space-y-2",
  centered: "text-center space-y-3",
  minimal: "space-y-1",
  gradient: "space-y-2"
}

const sizes = {
  sm: {
    title: "text-2xl font-bold",
    subtitle: "text-lg font-medium",
    description: "text-sm"
  },
  md: {
    title: "text-3xl font-bold",
    subtitle: "text-xl font-medium", 
    description: "text-base"
  },
  lg: {
    title: "text-4xl font-bold",
    subtitle: "text-2xl font-medium",
    description: "text-lg"
  },
  xl: {
    title: "text-5xl font-bold",
    subtitle: "text-3xl font-medium",
    description: "text-xl"
  }
}

const gradientTexts = {
  blue: "bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent",
  purple: "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
  green: "bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent",
  orange: "bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent",
  indigo: "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
}

export function TitlePageSimple({
  title,
  subtitle,
  description,
  icon,
  variant = "default",
  size = "md",
  className,
  showDivider = false,
  children
}: TitlePageSimpleProps) {
  const sizeClasses = sizes[size]
  const variantClasses = variants[variant]
  const gradientClass = gradientTexts.blue

  return (
    <div
      className={cn(
        "w-full",
        variantClasses,
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div
          className={cn(
            "inline-flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 hover:scale-105",
            variant === "gradient" 
              ? "bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 dark:from-blue-950/50 dark:to-cyan-950/50 dark:text-blue-400 shadow-lg"
              : "bg-muted text-muted-foreground hover:bg-muted/80",
            variant === "centered" && "mx-auto"
          )}
        >
          {icon}
        </div>
      )}

      {/* Title */}
      <h1
        className={cn(
          sizeClasses.title,
          variant === "gradient" && gradientClass,
          "tracking-tight transition-colors duration-200"
        )}
      >
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <h2
          className={cn(
            sizeClasses.subtitle,
            "text-muted-foreground font-medium transition-colors duration-200"
          )}
        >
          {subtitle}
        </h2>
      )}

      {/* Description */}
      {description && (
        <p
          className={cn(
            sizeClasses.description,
            "text-muted-foreground leading-relaxed max-w-2xl transition-colors duration-200",
            variant === "centered" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}

      {/* Divider */}
      {showDivider && (
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mt-6 transition-all duration-300" />
      )}

      {/* Children */}
      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  )
}

// Componente de ejemplo para mostrar diferentes variantes
export function TitlePageSimpleExample() {
  return (
    <div className="space-y-12 p-8">
      {/* Default */}
      <TitlePageSimple
        title="Dashboard"
        subtitle="Bienvenido de vuelta"
        description="Gestiona tus proyectos y mantén un seguimiento de tus tareas importantes."
        icon={<span className="text-xl">📊</span>}
        size="lg"
      />

      {/* Centered */}
      <TitlePageSimple
        title="Crear Proyecto"
        subtitle="Nuevo proyecto"
        description="Completa la información para crear un nuevo proyecto en el sistema."
        variant="centered"
        size="md"
        showDivider
      />

      {/* Minimal */}
      <TitlePageSimple
        title="Configuración"
        variant="minimal"
        size="sm"
      />

      {/* Gradient */}
      <TitlePageSimple
        title="Analytics"
        subtitle="Métricas y estadísticas"
        description="Visualiza el rendimiento de tu aplicación con gráficos interactivos y reportes detallados."
        icon={<span className="text-xl">📈</span>}
        variant="gradient"
        size="xl"
        showDivider
      />
    </div>
  )
} 