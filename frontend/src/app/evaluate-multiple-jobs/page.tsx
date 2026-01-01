"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
  PageHeader,
  Button
} from "@/components/ui";
import { 
  Step1JobUpload, 
  Step2SummarySelection, 
  Step3JobScoring 
} from "@/components/wizard";
import { WizardState, StepConfig } from "@/types";
import { WIZARD, BUTTON_LABELS } from "@/constants";

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

export default function EvaluateMultipleJobsPage() {
  const router = useRouter();
  
  const [wizardState, setWizardState] = useState<WizardState>({
    currentStep: 1,
    jobData: null,
    jobs: [],
    isMultipleJobs: true,
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
    <main className="min-h-screen bg-surface flex flex-col pb-6">
      <Header />
      
      <div className="max-w-4xl mx-auto w-full px-6 pt-4 space-y-4">
        <PageHeader 
          title={currentStepConfig?.title || "Evaluate Multiple Jobs"} 
          onBack={handleBack} 
        />

        {/* Wizard Progress */}
        <div className="flex items-center justify-between mb-2">
          {WIZARD_STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className={`h-1 w-full rounded-full ${
                step.id <= wizardState.currentStep ? "bg-primary" : "bg-border"
              }`} />
              <span className={`text-[10px] uppercase font-bold mt-1 ${
                step.id === wizardState.currentStep ? "text-primary" : "text-muted"
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div className="min-h-[300px]">
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

        <div className="flex justify-between items-center pt-6 border-t border-border mt-3">
          <div className="flex space-x-3">
            <div className="flex space-x-3">
              <Button variant="ghost" onClick={() => router.push("/")}>
                {BUTTON_LABELS.CANCEL}
              </Button>
              <Button variant="secondary" onClick={handleReset}>
                {BUTTON_LABELS.RESET}
              </Button>
            </div>
          </div>

          <Button
            disabled={!isCurrentStepValid}
            onClick={handleNext}
            className="font-bold min-w-[120px]"
          >
            {wizardState.currentStep === 3 ? "Finish" : "Next Step"}
          </Button>
        </div>
      </div>
    </main>
  );
}
