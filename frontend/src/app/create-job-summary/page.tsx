"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
  PageHeader,
  SectionCard,
  ActionButtons,
  Modal,
  JobSummaryViewer,
  RadioGroup,
  Button
} from "@/components/ui";
import { FileText, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { JobSummary } from "@/types";
import { mockExistingSummaries, mockNewSummaries } from "@/lib/mockData";

export default function CreateJobSummaryPage() {
  const router = useRouter();
  
  const [isChecking, setIsChecking] = useState(true);
  const [hasExistingSummaries, setHasExistingSummaries] = useState(false);
  const [showViewerModal, setShowViewerModal] = useState(false);
  const [summaryOption, setSummaryOption] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [finalSummaries, setFinalSummaries] = useState<JobSummary[]>([]);

  useEffect(() => {
    // Simulate checking for existing summaries
    const timer = setTimeout(() => {
      setIsChecking(false);
      setHasExistingSummaries(true); // Always true for mock purposes
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleOptionSelect = (val: string) => {
    setSummaryOption(val);
    if (val === "use-existing") {
      setFinalSummaries(mockExistingSummaries);
    } else {
      // Don't auto-generate for "create-new", wait for button click
      setFinalSummaries([]);
    }
  };

  const handleGenerateSummaries = () => {
    setFinalSummaries(mockNewSummaries);
  };

  const handleReset = () => {
    setSummaryOption(null);
    setFinalSummaries([]);
    setIsExpanded(false);
    setIsChecking(true);
    setHasExistingSummaries(false);
    setTimeout(() => {
      setIsChecking(false);
      setHasExistingSummaries(true);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pb-12">
      <Header />
      
      <div className="max-w-4xl mx-auto w-full px-6 pt-8 space-y-8">
        <PageHeader 
          title="Create Job Summary(ies)" 
          onBack={() => router.back()} 
        />

        {isChecking ? (
          <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 font-medium animate-pulse">Checking Library for existing summaries...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {hasExistingSummaries && (
              <SectionCard className="p-4">
                <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-amber-50 border border-amber-100 rounded-lg text-amber-900">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    A Job Summary already exists for one or more jobs in the Library.
                  </p>
                </div>
                  <div className="space-y-3">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => setShowViewerModal(true)}
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View existing summaries</span>
                    </Button>

                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs font-semibold text-gray-900 mb-2">
                        Do you want to use these existing summaries, or create new ones to be used for the AI evaluation?
                      </p>
                      <RadioGroup
                        name="summary-choice"
                        value={summaryOption || ""}
                        onChange={handleOptionSelect}
                        className="text-sm"
                        options={[
                          { 
                            value: "use-existing", 
                            label: "Use existing summaries where possible and create new summaries only for jobs having no existing summary." 
                          },
                          { 
                            value: "create-new", 
                            label: "Create and use new summaries for all jobs. (Any existing summaries will remain in the Library.)" 
                          }
                        ]}
                      />
                    </div>

                    {summaryOption === "create-new" && finalSummaries.length === 0 && (
                      <div className="pt-3 border-t border-gray-100">
                        <Button 
                          onClick={handleGenerateSummaries}
                          className="w-full"
                        >
                          Generate job summaries
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SectionCard>
            )}

            <SectionCard 
              title="Job Summaries Generation" 
              subtitle={finalSummaries.length > 0 ? "The job summaries have been prepared for your review." : hasExistingSummaries && summaryOption ? (summaryOption === "create-new" ? "Click 'Generate job summaries' above to create new summaries." : "") : hasExistingSummaries ? "Select an option above to proceed." : "Generating job summaries..."}
            >
              {finalSummaries.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-center space-x-3 text-blue-900 font-medium">
                      <FileText className="w-6 h-6" />
                      <span>{finalSummaries.length} Job summaries generated</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1"
                    >
                      <span>Click to {isExpanded ? 'hide' : 'view'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>

                  {isExpanded && (
                    <div>
                      <JobSummaryViewer summaries={finalSummaries} />
                    </div>
                  )}
                </div>
              ) : !hasExistingSummaries ? (
                <div className="p-12 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center space-y-3 text-gray-400">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p>Generating summaries...</p>
                </div>
              ) : null}
            </SectionCard>
          </div>
        )}

        <ActionButtons 
          onCancel={() => router.push("/")}
          onReset={handleReset}
          onNext={() => console.log("Proceeding to AI Evaluation...")}
          nextDisabled={finalSummaries.length === 0}
          nextLabel="Proceed to AI Evaluation"
        />
      </div>

      {/* Viewer Modal */}
      <Modal
        isOpen={showViewerModal}
        onClose={() => setShowViewerModal(false)}
        title="Existing Job Summaries"
        size="lg"
      >
        <JobSummaryViewer summaries={mockExistingSummaries} />
        <div className="mt-6 flex justify-end">
          <Button onClick={() => setShowViewerModal(false)}>Close</Button>
        </div>
      </Modal>
    </main>
  );
}

