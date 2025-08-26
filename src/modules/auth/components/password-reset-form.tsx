"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { passwordResetSchema, type PasswordResetFormData } from "../schema/password-reset.schema";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { LoadingButton } from "@/components/custom/loading-button";

interface PasswordResetFormProps {
  onSuccess?: () => void;
}

export function PasswordResetForm({ onSuccess }: PasswordResetFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const { forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = async (data: PasswordResetFormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await forgotPassword({ email: data.email });

      if (result.success) {
        setMessage({ type: "success", text: result.message || "Se ha enviado un correo con las instrucciones para restablecer tu contraseña" });
        toast.success("Correo de recuperación enviado exitosamente");
        reset();
        onSuccess?.();
      } else {
        setMessage({ type: "error", text: result.error || "Error al enviar el correo de recuperación" });
        toast.error(result.error || "Error al enviar el correo de recuperación");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Error interno del servidor. Por favor, inténtalo de nuevo.";
      setMessage({ type: "error", text: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Recuperar Contraseña</CardTitle>
            <CardDescription>
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
            </CardDescription>
          </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Mensajes de error y éxito */}
          {message && (
            <div className={`flex items-center gap-2 p-3 text-sm rounded-md ${
              message.type === "error" 
                ? "text-red-600 bg-red-50 border border-red-200" 
                : "text-green-600 bg-green-50 border border-green-200"
            }`}>
              {message.type === "error" ? (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <div className="space-y-2">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  {...register("email")}
                  className={`w-full px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
              {!errors.email && (
                <p className="text-xs text-muted-foreground">
                  Ingresa tu correo electrónico registrado
                </p>
              )}
            </div>
          </div>

          <LoadingButton
            type="submit"
            className="w-full"
            isLoading={isLoading}
            loadingText="Enviando enlace..."
          >
            <Mail className="w-4 h-4 mr-2" />
            Enviar enlace de recuperación
          </LoadingButton>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="flex items-center justify-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 