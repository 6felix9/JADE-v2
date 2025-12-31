"use client";

import { useState } from "react";
import {
  SectionCard,
  FileUpload,
  QualityFlag,
  JobPreview,
  JobList,
  RadioGroup,
  Select
} from "@/components/ui";
import { WizardState } from "@/types";
import { mockJobData, mockJobs } from "@/lib/mockData";
import { QUALITY_MESSAGES } from "@/constants";

interface Step1Props {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
}

export default function Step1JobUpload({ state, updateState }: Step1Props) {
  const [isJobListExpanded, setIsJobListExpanded] = useState(false);

  const handleFileUpload = (file: File) => {
    // In a real app, we'd parse the file. For now, we use mock data.
    console.log("File selected:", file.name);
    
    if (state.isMultipleJobs) {
      updateState({
        jobs: mockJobs,
        qualityPassed: true
      });
    } else {
      updateState({
        jobData: mockJobData,
        qualityPassed: true
      });
    }
  };

  const hasJobs = state.isMultipleJobs ? state.jobs.length > 0 : state.jobData !== null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionCard 
        title={state.isMultipleJobs ? "What jobs do you want to evaluate using AI?" : "What job do you want to evaluate using AI?"}
        subtitle={state.isMultipleJobs 
          ? "Upload a file containing multiple job descriptions (CSV, XLSX, or JSON) to begin."
          : "Upload a single job description file (CSV, XLSX, or JSON) to begin."
        }
      >
        {!hasJobs ? (
          <FileUpload 
            onFileSelect={handleFileUpload} 
            accept=".csv,.xlsx,.json"
            label={state.isMultipleJobs ? "Import and check" : undefined}
          />
        ) : (
          <div className="space-y-6">
            <QualityFlag 
              status="passed" 
              message={state.isMultipleJobs 
                ? `${state.jobs.length} jobs meet the quality requirements for AI evaluation.`
                : QUALITY_MESSAGES.PASSED
              } 
            />
            {state.isMultipleJobs ? (
              <JobList 
                jobs={state.jobs} 
                isExpanded={isJobListExpanded} 
                onToggle={() => setIsJobListExpanded(!isJobListExpanded)} 
              />
            ) : (
              state.jobData && <JobPreview job={state.jobData} />
            )}
          </div>
        )}
      </SectionCard>

      {hasJobs && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionCard 
            title={state.isMultipleJobs 
              ? "Do you want to compare the AI evaluation results with any existing human JE score for these jobs?"
              : "Do you want to compare the AI evaluation results with any existing human JE score for the same job?"
            }
          >
            <RadioGroup
              name="comparison"
              value={state.comparisonOption}
              onChange={(value) => updateState({ comparisonOption: value as "no" | "human" })}
              options={[
                { value: "no", label: "No thanks" },
                { value: "human", label: "Compare to Human Score(s)" }
              ]}
            />

            {state.comparisonOption === "human" && (
              <div className="mt-4 animate-in fade-in zoom-in-95 duration-200">
                <Select
                  label={state.isMultipleJobs ? "Human evaluation dataset:" : "Human evaluation:"}
                  value={state.humanEvaluation}
                  onChange={(value) => updateState({ humanEvaluation: value })}
                  options={[
                    { value: "Finance Div Mgr", label: "Finance Div Mgr" },
                    { value: "Operations Supervisor", label: "Operations Supervisor" },
                    { value: "HR Director", label: "HR Director" }
                  ]}
                />
              </div>
            )}
          </SectionCard>
        </div>
      )}
    </div>
  );
}

