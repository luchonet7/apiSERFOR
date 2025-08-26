"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CustomInputControlled } from "@/components/custom/input-controlled";
import { LoadingButton } from "@/components/custom/loading-button";
import { TitlePageSimple } from "@/components/custom/title-page-simple";
import { Lock, Mail } from "lucide-react";
import { toast } from "sonner";

// Schema para el formulario de login
const loginFormSchema = z.object({
  email: z.string().email("Correo electrónico inválido").max(100),
  password: z.string().min(1, "La contraseña es requerida").max(100),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

function LoginPageContent () {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "prueba@serfor.gob.pe",
      password: "123456",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      toast.success("¡Registro exitoso! Por favor inicia sesión.");
    }
  }, [searchParams]);

  async function onSubmit (values: LoginFormValues) {
    try {
      // Simulación de proceso de login con delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Datos de usuario simulados que coinciden con la estructura de next-auth.d.ts
      const mockUserData = {
        id: "user-123",
        email: values.email || "mia@serfor.gob.pe",
        name: values.email.includes("admin") ? "Admin SERFOR" : "Mia V",
        numeroDocumento: "12345678",
        apellidoPaterno: "Vargas",
        apellidoMaterno: "Silva",
        nombres: values.email.includes("admin") ? "Administrador" : "Maria Isabel",
        celular: "+51 987654321",
        estado: true,
        rol: values.email.includes("admin") ? "Administrador" : "Analista Senior",
        fechaCreacion: new Date("2023-01-15")
      };

      // Simular el guardado en localStorage para persistencia visual
      if (typeof window !== 'undefined') {
        localStorage.setItem('mockUser', JSON.stringify(mockUserData));
        localStorage.setItem('isLoggedIn', 'true');
      }

      toast.success(`¡Bienvenido ${mockUserData.name}!`, {
        description: "Login simulado exitoso"
      });

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error en simulación de login:", error);
      toast.error("Error en la simulación de login");
    }
  }

  return (
    <div className="flex items-center justify-center bg-white dark:bg-stone-950 rounded-lg">
      <div className="mx-auto w-full max-w-md space-y-8 p-6">
        <TitlePageSimple
          title="Iniciar Sesión"
          description="Ingresa tus credenciales para acceder a tu cuenta"
          variant="centered"
          size="sm"
          icon={<Lock className="w-6 h-6" />}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="email"
                      maxLength={100}
                      label="Correo electrónico"
                      icon={<Mail className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Ejemplo: usuario@ejemplo.com"
                      textTransform="lowercase"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInputControlled
                      type="password"
                      maxLength={100}
                      label="Contraseña"
                      icon={<Lock className="w-4 h-4" />}
                      allowedCharacters={["letters", "numeric", "symbols"]}
                      helperText="Ingresa tu contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-blue-600 dark:text-blue-200 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              loadingText="Iniciando sesión..."
              className="w-full"
            >
              Iniciar Sesión
            </LoadingButton>


          </form>
        </Form>
      </div>
    </div>
  );
}

export default function LoginPage () {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center">
        <div className="mx-auto w-full max-w-md space-y-8 p-6">
          <TitlePageSimple
            title="Iniciar Sesión"
            description="Ingresa tus credenciales para acceder a tu cuenta"
            variant="centered"
            size="sm"
            icon={<Lock className="w-6 h-6" />}
          />
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Cargando...</span>
          </div>
        </div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
