"use client";

import { CheckCircle } from "lucide-react";
import { WizardState } from "@/types";

interface FactorSelectionProps {
  selectedFactors: WizardState["selectedFactors"];
  onFactorToggle: (factor: keyof WizardState["selectedFactors"]) => void;
}

export default function FactorSelection({ selectedFactors, onFactorToggle }: FactorSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(selectedFactors).map(([key, value]) => (
        <label 
          key={key} 
          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
            value 
              ? "border-primary bg-primary/10" 
              : "border-border bg-background hover:border-border/80"
          }`}
        >
          <input
            type="checkbox"
            className="hidden"
            checked={value}
            onChange={() => onFactorToggle(key as keyof WizardState["selectedFactors"])}
          />
          <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 transition-colors ${
            value ? "bg-primary border-primary" : "bg-background border-border"
          }`}>
            {value && <CheckCircle className="w-4 h-4 text-background" />}
          </div>
          <span className={`capitalize font-medium ${value ? "text-primary" : "text-foreground"}`}>
            {key}
          </span>
        </label>
      ))}
    </div>
  );
}

