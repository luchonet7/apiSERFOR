"use client";

import { Suspense } from "react";
import { ResetPasswordForm } from "../components/reset-password-form";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Lock } from "lucide-react";

// Componente de carga para Suspense
function ResetPasswordSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2">Cargando formulario...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ResetPasswordView() {
  return (
    <Suspense fallback={<ResetPasswordSkeleton />}>
      <ResetPasswordForm />
    </Suspense>
  );
} 