"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import FileUpload from "@/components/ui/FileUpload";
import QualityFlag from "@/components/ui/QualityFlag";
import JobPreview from "@/components/ui/JobPreview";
import RadioGroup from "@/components/ui/RadioGroup";
import Select from "@/components/ui/Select";
import ActionButtons from "@/components/ui/ActionButtons";

interface JobData {
  id: string;
  job_title: string;
  employee_id: string;
  department: string;
  manager_info: {
    job_title: string;
    name: string;
  };
  position_type: string;
  team_size: string;
  supervisory_duties: string;
  budget_responsibility: string;
  scope_of_impact: string;
  job_purpose: string;
  key_responsibilities: Record<string, string>;
  responsibility1_details: string;
  responsibility2_details: string;
  responsibility3_details: string;
  decision_making: string;
  error_impact: string;
  work_timeframe: string;
  key_interactions: string;
  complexity_level: string;
  work_environment: string;
}

const MOCK_JOB_DATA: JobData = {
  id: "01-0025",
  job_title: "Assistant Vice President",
  employee_id: "01-0025",
  department: "Cebu Regional Office",
  manager_info: {
    job_title: "Sr. Assistant Vice President - Regional Operations",
    name: "Chito M. Recamadas",
  },
  position_type: "Has oversight of people, and/or budget, and/or an area of operations (including healthcare)",
  team_size: "10 teams, 193 people",
  supervisory_duties: "True",
  budget_responsibility: "General and Administrative expenses of Cebu Regional Operations",
  scope_of_impact: "All departments in Cebu Region, Dumaguete and Tacloban Satellite Offices",
  job_purpose: "To manage the entire Cebu Regional Operations across all departments ensuring that the region operates in compliance with the standards set by the management. Ensures cohesiveness and foster collaboration among the different departments. Actively engage and support in revenue generation and create cost containment initiatives to achieve a positive bottom line ensuring sustainability of the regional operations.  Motivate and inspire the people, provide the necessary resources to achieve the desired level of performance expected which will ultimately result in attaining the goals, objectives and KRAs of the Regional Operations.",
  key_responsibilities: {
    "1": "Oversee the daily operations of Cebu Region.",
    "2": "Planning",
    "4": "Problem solving of the different concerns among various department.",
    "5": "Ensure that the team is working cohesively and collaboratively.",
    "6": "Motivate and inspire the people to perform and achieve their targets.",
    "7": "Manages 10 Department Heads.",
    "8": "Review performance metrics of different departments.",
    "9": "Organize and attend meetings",
    "10": "Acts as Check Signatory B for all disbursements of Intellicare and Avega for 5 banks.",
  },
  responsibility1_details: "1f",
  responsibility2_details: "www",
  responsibility3_details: "www",
  decision_making: "www",
  error_impact: "www",
  work_timeframe: "1 - 6 months",
  key_interactions: "www",
  complexity_level: "www",
  work_environment: "General Office environment",
};

export default function EvaluateJobPage() {
  const router = useRouter();
  
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [comparisonOption, setComparisonOption] = useState<"no" | "human">("no");
  const [humanEvaluation, setHumanEvaluation] = useState("Finance Div Mgr");
  const [qualityPassed, setQualityPassed] = useState<boolean | null>(null);

  const handleFileUpload = (file: File) => {
    // In a real app, we'd parse the file. For now, we use mock data.
    console.log("File selected:", file.name);
    setJobData(MOCK_JOB_DATA);
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
                onChange={setComparisonOption}
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
