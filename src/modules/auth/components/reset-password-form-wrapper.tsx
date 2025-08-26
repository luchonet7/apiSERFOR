"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { resetPasswordSchema, type ResetPasswordFormData } from "../schema/password-reset.schema";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export function ResetPasswordFormWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { resetPassword, validateResetToken } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [tokenMessage, setTokenMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || "",
    }
  });

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenMessage("Token no proporcionado");
        setIsVerifying(false);
        return;
      }

      try {
        const result = await validateResetToken(token);
        if (result.success) {
          setIsValidToken(true);
          setTokenMessage("Token válido");
        } else {
          setIsValidToken(false);
          setTokenMessage(result.message || "Token inválido o expirado");
        }
      } catch (error) {
        setIsValidToken(false);
        setTokenMessage("Error al validar el token");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [token, validateResetToken]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await resetPassword({
        token: data.token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      });

      if (result.success) {
        setMessage({ type: "success", text: result.message || "Contraseña restablecida exitosamente" });
        toast.success("Contraseña restablecida exitosamente");
        reset();
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        setMessage({ type: "error", text: result.error || "Error al restablecer la contraseña" });
        toast.error(result.error || "Error al restablecer la contraseña");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Error interno del servidor. Por favor, inténtalo de nuevo.";
      setMessage({ type: "error", text: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2">Verificando token...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isValidToken) {
    return (
      <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-red-600">
                Token Inválido
              </CardTitle>
              <CardDescription className="text-center">
                {tokenMessage}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  El enlace de recuperación no es válido o ha expirado.
                </p>
                <Button asChild className="w-full">
                  <Link href="/auth/forgot-password">
                    Solicitar nuevo enlace
                  </Link>
                </Button>
                <div>
                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-500"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Volver al inicio de sesión
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
    );
  }

  return (
    <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Nueva contraseña
            </CardTitle>
            <CardDescription>
              Crea una contraseña segura para tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {message && (
                <Alert variant={message.type === "error" ? "destructive" : "default"}>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}

              <input type="hidden" {...register("token")} />

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva contraseña</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu nueva contraseña"
                    {...register("newPassword")}
                    className={errors.newPassword ? "border-red-500 pr-10" : "border-gray-300 dark:border-gray-700 pr-10"}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-sm text-red-500 dark:text-red-400">{errors.newPassword.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirma tu nueva contraseña"
                    {...register("confirmPassword")}
                    className={errors.confirmPassword ? "border-red-500 pr-10" : "border-gray-300 dark:border-gray-700 pr-10"}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 dark:text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Restableciendo...</span>
                  </div>
                ) : (
                  "Restablecer contraseña"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-200 hover:text-blue-500"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio de sesión
              </Link>
            </div>
          </CardContent>
        </Card>
  );
} 