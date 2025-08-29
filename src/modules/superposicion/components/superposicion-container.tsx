"use client";

import { useState } from "react";
import { SuperposicionStepper } from "./superposicion-stepper";
import { RegistroForm } from "./registro-form";
import { AnalisisView } from "./analisis-view";
import { BusquedaContainer } from "./busqueda-container";

export function SuperposicionContainer () {
  const [currentStep, setCurrentStep] = useState(1);
  const [ambitos, setAmbitos] = useState<any[]>([]);

  const handleNextStep = (ambitosFromStep?: any[]) => {
    if (currentStep < 3) {
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

    <div className="">

      <RegistroForm onNext={handleNextStep} />

    </div>

  );
}

