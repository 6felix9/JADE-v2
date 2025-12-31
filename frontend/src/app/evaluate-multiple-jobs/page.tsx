"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import FileUpload from "@/components/ui/FileUpload";
import QualityFlag from "@/components/ui/QualityFlag";
import JobList from "@/components/ui/JobList";
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
  job_purpose: string;
  [key: string]: any;
}

const MOCK_JOBS: JobData[] = [
  {
    id: "01-0025",
    job_title: "Assistant Vice President",
    employee_id: "01-0025",
    department: "Cebu Regional Office",
    manager_info: {
      job_title: "Sr. Assistant Vice President - Regional Operations",
      name: "Chito M. Recamadas",
    },
    job_purpose: "To manage the entire Cebu Regional Operations across all departments ensuring that the region operates in compliance with the standards set by the management.",
  },
  {
    id: "01-0026",
    job_title: "Finance Div Mgr",
    employee_id: "01-0026",
    department: "Finance Department",
    manager_info: {
      job_title: "Chief Financial Officer",
      name: "Maria Santos",
    },
    job_purpose: "To oversee all financial operations, budgeting, and fiscal reporting for the division.",
  },
  {
    id: "01-0027",
    job_title: "Operations Supervisor",
    employee_id: "01-0027",
    department: "Operations",
    manager_info: {
      job_title: "Operations Manager",
      name: "John Doe",
    },
    job_purpose: "To supervise daily operational activities and ensure efficiency in service delivery.",
  },
];

export default function EvaluateMultipleJobsPage() {
  const router = useRouter();
  
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [isJobListExpanded, setIsJobListExpanded] = useState(false);
  const [comparisonOption, setComparisonOption] = useState<"no" | "human">("no");
  const [humanEvaluation, setHumanEvaluation] = useState("Finance Div Mgr");
  const [qualityPassed, setQualityPassed] = useState<boolean | null>(null);

  const handleFileUpload = (file: File) => {
    // In a real app, we'd parse the file. For now, we use mock data.
    console.log("File selected:", file.name);
    setJobs(MOCK_JOBS);
    setQualityPassed(true); // Placeholder logic
  };

  const handleReset = () => {
    setJobs([]);
    setIsJobListExpanded(false);
    setComparisonOption("no");
    setQualityPassed(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-12">
      <Header />
      
      <div className="max-w-4xl mx-auto w-full px-6 pt-8 space-y-8">
        <PageHeader 
          title="Evaluate Multiple Jobs" 
          onBack={() => router.push("/")} 
        />

        <SectionCard 
          title="What jobs do you want to evaluate using AI?" 
          subtitle="Upload a file containing multiple job descriptions (CSV, XLSX, or JSON) to begin."
        >
          {jobs.length === 0 ? (
            <FileUpload 
              onFileSelect={handleFileUpload} 
              accept=".csv,.xlsx,.json" 
              label="Import and check"
            />
          ) : (
            <div className="space-y-6">
              <QualityFlag 
                status="passed" 
                message={`${jobs.length} jobs meet the quality requirements for AI evaluation.`} 
              />
              <JobList 
                jobs={jobs} 
                isExpanded={isJobListExpanded} 
                onToggle={() => setIsJobListExpanded(!isJobListExpanded)} 
              />
            </div>
          )}
        </SectionCard>

        {jobs.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionCard 
              title="Do you want to compare the AI evaluation results with any existing human JE score for these jobs?"
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
                    label="Human evaluation dataset:"
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
          nextDisabled={jobs.length === 0 || !qualityPassed}
        />
      </div>
    </main>
  );
}

