"use client";

import { Check, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SuperposicionStepperProps {
  currentStep: number;
  onBackToFirst?: () => void;
}

const steps = [
  {
    id: 1,
    title: "Gestión",
    description: "Buscar y gestionar"
  },
  {
    id: 2,
    title: "Registro",
    description: "Datos y archivo"
  },
  {
    id: 3,
    title: "Análisis",
    description: "Revisión y envío"
  }
];

export function SuperposicionStepper ({ currentStep, onBackToFirst }: SuperposicionStepperProps) {
  return (
    <div className="space-y-6">
      {/* Título principal */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-700">
          Sistema de Superposición
        </h1>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                  currentStep > step.id
                    ? "bg-green-600 border-green-600 text-white"
                    : currentStep === step.id
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>

              {/* Step Label */}
              <div className="ml-3">
                <div
                  className={cn(
                    "text-sm font-medium",
                    currentStep >= step.id
                      ? "text-green-600"
                      : "text-gray-400"
                  )}
                >
                  {step.title}
                </div>
                <div className="text-xs text-gray-500">
                  {step.description}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-16 h-0.5 mx-4 transition-colors",
                  currentStep > step.id
                    ? "bg-green-600"
                    : "bg-gray-300"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Botón de retorno */}
      {currentStep > 1 && onBackToFirst && (
        <div className="flex justify-start">
          <Button
            onClick={onBackToFirst}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
        </div>
      )}
    </div>
  );
}

