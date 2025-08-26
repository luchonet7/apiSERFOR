"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect } from "react";
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
import { useLogin } from "../api/auth.actions";

// Schema para el formulario de login
const loginFormSchema = z.object({
    usuario: z.string().min(1, "El usuario es requerido").max(100),
    password: z.string().min(1, "La contraseña es requerida").max(100),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm () {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Usando el nuevo hook con estructura similar a useLazyQuery
    const [executeLogin, { data: loginData, error: loginError, isLoading: loadingLoginData }] = useLogin();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            usuario: "userSsenQa ",
            password: "123456",
        },
    });

    const isSubmitting = form.formState.isSubmitting;

    useEffect(() => {
        if (searchParams.get("registered") === "true") {
            toast.success("¡Registro exitoso! Por favor inicia sesión.");
        }
    }, [searchParams]);

    // Efecto para manejar la respuesta del login
    useEffect(() => {
        if (loginData) {
            if (loginData.success) {
                toast.success("Inicio de sesión exitoso");
                router.push("/dashboard");
            } else {
                toast.error(loginData.message || "Error al iniciar sesión");
            }
        }
    }, [loginData, router]);

    // Efecto para manejar errores del login
    useEffect(() => {
        if (loginError) {
            console.error("Error en login:", loginError);
            toast.error("Error al iniciar sesión. Verifica tus credenciales.");
        }
    }, [loginError]);

    const onSubmit = async (data: LoginFormValues) => {
        try {
            await executeLogin({
                nombre: data.usuario, // Usando usuario como nombre de usuario
                password: data.password,
                sistema: { id: 1 }, // Valores por defecto - ajustar según necesidades
                compagnia: { id: 1 }, // Valores por defecto - ajustar según necesidades
            });
        } catch (error) {
            // El error ya se maneja en el useEffect
            console.error("Error al ejecutar login:", error);
        }
    };

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
                            name="usuario"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <CustomInputControlled
                                            type="text"
                                            maxLength={100}
                                            label="Usuario"
                                            icon={<Mail className="w-4 h-4" />}
                                            allowedCharacters={["letters", "numeric", "symbols"]}
                                            helperText="Ejemplo: usuario"
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
                            isLoading={isSubmitting || loadingLoginData}
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
