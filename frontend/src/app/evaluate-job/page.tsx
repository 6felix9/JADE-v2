"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
  PageHeader,
  SectionCard,
  FileUpload,
  QualityFlag,
  JobPreview,
  RadioGroup,
  Select,
  ActionButtons
} from "@/components/ui";
import { JobData } from "@/types";
import { mockJobData } from "@/lib/mockData";

export default function EvaluateJobPage() {
  const router = useRouter();
  
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [comparisonOption, setComparisonOption] = useState<"no" | "human">("no");
  const [humanEvaluation, setHumanEvaluation] = useState("Finance Div Mgr");
  const [qualityPassed, setQualityPassed] = useState<boolean | null>(null);

  const handleFileUpload = (file: File) => {
    // In a real app, we'd parse the file. For now, we use mock data.
    console.log("File selected:", file.name);
    setJobData(mockJobData);
    setQualityPassed(true); // Placeholder logic
  };

  const handleReset = () => {
    setJobData(null);
    setComparisonOption("no");
    setQualityPassed(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-12">
      <Header />
      
      <div className="max-w-4xl mx-auto w-full px-6 pt-8 space-y-8">
        <PageHeader 
          title="Evaluate a Job" 
          onBack={() => router.push("/")} 
        />

        <SectionCard 
          title="What job do you want to evaluate using AI?" 
          subtitle="Upload a single job description file (CSV, XLSX, or JSON) to begin."
        >
          {!jobData ? (
            <FileUpload 
              onFileSelect={handleFileUpload} 
              accept=".csv,.xlsx,.json" 
            />
          ) : (
            <div className="space-y-6">
              <QualityFlag 
                status="passed" 
                message="This job meets the quality requirements for AI evaluation." 
              />
              <JobPreview job={jobData} />
            </div>
          )}
        </SectionCard>

        {jobData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionCard 
              title="Do you want to compare the AI evaluation results with any existing human JE score for the same job?"
            >
              <RadioGroup
                name="comparison"
                value={comparisonOption}
                onChange={(value) => setComparisonOption(value as "no" | "human")}
                options={[
                  { value: "no", label: "No thanks" },
                  { value: "human", label: "Compare to Human Score(s)" }
                ]}
              />

              {comparisonOption === "human" && (
                <div className="mt-4 animate-in fade-in zoom-in-95 duration-200">
                  <Select
                    label="Human evaluation:"
                    value={humanEvaluation}
                    onChange={setHumanEvaluation}
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

        <ActionButtons 
          onCancel={() => router.push("/")}
          onReset={handleReset}
          onNext={() => router.push("/create-job-summary")}
          nextDisabled={!jobData || !qualityPassed}
        />
      </div>
    </main>
  );
}
