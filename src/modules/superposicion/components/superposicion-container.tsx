"use client";

import { useState } from "react";
import { SuperposicionStepper } from "./superposicion-stepper";
import { RegistroForm } from "./registro-form";
import { AnalisisView } from "./analisis-view";

export function SuperposicionContainer () {
  const [currentStep, setCurrentStep] = useState(1);
  const [ambitos, setAmbitos] = useState<any[]>([]);

  const handleNextStep = (ambitosFromStep?: any[]) => {
    if (currentStep < 2) {
      if (ambitosFromStep) {
        setAmbitos(ambitosFromStep);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBackToFirst = () => {
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Stepper */}
        <SuperposicionStepper currentStep={currentStep} onBackToFirst={handleBackToFirst} />

        {/* Content based on current step */}
        {currentStep === 1 && (
          <RegistroForm onNext={handleNextStep} />
        )}
        {currentStep === 2 && (
          <AnalisisView onBack={handlePrevStep} ambitos={ambitos} />
        )}
      </div>
    </div>
  );
}

