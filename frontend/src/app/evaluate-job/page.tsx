"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
  PageHeader,
  ActionButtons
} from "@/components/ui";
import { 
  Step1JobUpload, 
  Step2SummarySelection, 
  Step3JobScoring 
} from "@/components/wizard";
import { WizardState, StepConfig } from "@/types";
import { WIZARD } from "@/constants";

const WIZARD_STEPS: StepConfig[] = [
  {
    id: 1,
    title: "Job Upload",
    label: "Upload & Compare",
    validate: (state) => {
      const hasJobs = state.isMultipleJobs 
        ? state.jobs.length > 0 
        : state.jobData !== null;
      return hasJobs && state.qualityPassed === true;
    },
  },
  {
    id: 2,
    title: "Job Summary",
    label: "Create Summary",
    validate: (state) => state.finalSummaries.length > 0,
  },
  {
    id: 3,
    title: "Job Scoring",
    label: "Score Jobs",
    validate: (state) => state.evaluationResults.length > 0,
  },
];

export default function EvaluateJobPage() {
  const router = useRouter();
  
  const [wizardState, setWizardState] = useState<WizardState>({
    currentStep: 1,
    jobData: null,
    jobs: [],
    isMultipleJobs: false,
    qualityPassed: null,
    comparisonOption: "no",
    humanEvaluation: "Finance Div Mgr",
    isCheckingSummaries: true,
    hasExistingSummaries: false,
    summaryOption: null,
    finalSummaries: [],
    showExistingSummariesModal: false,
    isSummaryExpanded: false,
    selectedFactors: {
      accountability: true,
      complexity: true,
      judgement: true,
      communication: true,
      impact: true,
      knowledge: true,
    },
    isScoring: false,
    evaluationResults: [],
    showResults: false,
  });

  const updateWizardState = (updates: Partial<WizardState>) => {
    setWizardState(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (wizardState.currentStep < WIZARD_STEPS.length) {
      const nextStep = wizardState.currentStep + 1;
      
      // Side effect: Reset summary checking when entering step 2
      if (nextStep === 2) {
        updateWizardState({ 
          currentStep: nextStep,
          isCheckingSummaries: true,
          hasExistingSummaries: false
        });
      } else {
        updateWizardState({ currentStep: nextStep });
      }
    } else {
      // Finish wizard
      router.push("/");
    }
  };

  const handleBack = () => {
    if (wizardState.currentStep > 1) {
      updateWizardState({ currentStep: wizardState.currentStep - 1 });
    } else {
      router.push("/");
    }
  };

  const handleReset = () => {
    switch (wizardState.currentStep) {
      case 1:
        updateWizardState({
          jobData: null,
          jobs: [],
          qualityPassed: null,
          comparisonOption: "no",
        });
        break;
      case 2:
        updateWizardState({
          summaryOption: null,
          finalSummaries: [],
          isSummaryExpanded: false,
          isCheckingSummaries: true,
        });
        break;
      case 3:
        updateWizardState({
          selectedFactors: {
            accountability: true,
            complexity: true,
            judgement: true,
            communication: true,
            impact: true,
            knowledge: true,
          },
          evaluationResults: [],
          showResults: false,
        });
        break;
    }
  };

  const currentStepConfig = WIZARD_STEPS.find(s => s.id === wizardState.currentStep);
  const isCurrentStepValid = currentStepConfig?.validate(wizardState) ?? false;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-12">
      <Header />
      
      <div className="max-w-4xl mx-auto w-full px-6 pt-8 space-y-8">
        <PageHeader 
          title={currentStepConfig?.title || "Evaluate a Job"} 
          onBack={handleBack} 
        />

        {/* Wizard Progress - Optional future enhancement */}
        <div className="flex items-center justify-between mb-4">
          {WIZARD_STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className={`h-1 w-full rounded-full ${
                step.id <= wizardState.currentStep ? "bg-blue-600" : "bg-gray-200"
              }`} />
              <span className={`text-[10px] uppercase font-bold mt-2 ${
                step.id === wizardState.currentStep ? "text-blue-600" : "text-gray-400"
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div className="min-h-[400px]">
          {wizardState.currentStep === 1 && (
            <Step1JobUpload state={wizardState} updateState={updateWizardState} />
          )}
          {wizardState.currentStep === 2 && (
            <Step2SummarySelection state={wizardState} updateState={updateWizardState} />
          )}
          {wizardState.currentStep === 3 && (
            <Step3JobScoring state={wizardState} updateState={updateWizardState} />
          )}
        </div>

        <ActionButtons 
          onCancel={() => router.push("/")}
          onReset={handleReset}
          onNext={handleNext}
          onBack={handleBack}
          showBack={wizardState.currentStep > 1}
          nextDisabled={!isCurrentStepValid}
          nextLabel={wizardState.currentStep === 3 ? "Finish" : "Next Step"}
        />
      </div>
    </main>
  );
}
