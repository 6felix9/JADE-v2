"use client";

import { useEffect } from "react";
import {
  SectionCard,
  Modal,
  JobSummaryViewer,
  RadioGroup,
  Button
} from "@/components/ui";
import { FileText, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { WizardState } from "@/types";
import { mockExistingSummaries, mockNewSummaries } from "@/lib/mockData";

interface Step2Props {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
}

export default function Step2SummarySelection({ state, updateState }: Step2Props) {
  useEffect(() => {
    // Simulate checking for existing summaries if not already done
    if (state.isCheckingSummaries) {
      const timer = setTimeout(() => {
        updateState({
          isCheckingSummaries: false,
          hasExistingSummaries: true // Always true for mock purposes
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.isCheckingSummaries, updateState]);

  const handleOptionSelect = (val: string) => {
    const option = val as "use-existing" | "create-new";
    updateState({ 
      summaryOption: option,
      finalSummaries: option === "use-existing" ? mockExistingSummaries : []
    });
  };

  const handleGenerateSummaries = () => {
    updateState({ isGeneratingSummaries: true });
    
    setTimeout(() => {
      updateState({ 
        finalSummaries: mockNewSummaries,
        isGeneratingSummaries: false
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {state.isCheckingSummaries ? (
        <div className="flex flex-col items-center justify-center p-16 space-y-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          <p className="text-muted text-sm font-medium animate-pulse">Checking Library for existing summaries...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {state.hasExistingSummaries && (
            <SectionCard className="p-3">
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2.5 p-2.5 bg-warning/10 border border-warning/20 rounded-lg text-warning">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-xs font-medium">
                    A Job Summary already exists for one or more jobs in the Library.
                  </p>
                </div>
                <div className="space-y-2.5">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => updateState({ showExistingSummariesModal: true })}
                    className="w-full flex items-center justify-center space-x-2 py-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span className="text-sm">View existing summaries</span>
                  </Button>

                  <div className="pt-2.5 border-t border-border">
                    <p className="text-[11px] font-semibold text-foreground mb-1.5">
                      Do you want to use these existing summaries, or create new ones to be used for the AI evaluation?
                    </p>
                    <RadioGroup
                      name="summary-choice"
                      value={state.summaryOption || ""}
                      onChange={handleOptionSelect}
                      className="text-[11px]"
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
                </div>
              </div>
            </SectionCard>
          )}

          {state.summaryOption === "create-new" && state.finalSummaries.length === 0 && (
            <SectionCard title="Generate Job Summaries">
              <div className="flex flex-col items-center space-y-3 py-2">
                <p className="text-muted text-sm text-center max-w-md">
                  The AI will analyze the job descriptions to create concise summaries for evaluation.
                </p>
                <Button 
                  onClick={handleGenerateSummaries} 
                  disabled={state.isGeneratingSummaries}
                  className="w-full md:w-auto px-5 py-3 text-base h-auto"
                >
                  {state.isGeneratingSummaries ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background"></div>
                      <span>Generating Summaries...</span>
                    </div>
                  ) : (
                    "Generate Job Summaries"
                  )}
                </Button>
              </div>
            </SectionCard>
          )}

          {(!state.summaryOption || state.finalSummaries.length > 0) && (
            <SectionCard 
              title="Job Summaries Review" 
              subtitle={
                state.finalSummaries.length > 0
                  ? (state.summaryOption === "use-existing"
                      ? "Existing job summaries from the Library will be used for evaluation."
                      : "The new job summaries have been prepared for your review.")
                  : "Select an option or generate summaries to review."
              }
            >
              {state.finalSummaries.length > 0 ? (
                <div className="space-y-3">
                  {state.summaryOption === "use-existing" ? (
                    <div className="flex items-center space-x-2 p-3 bg-surface border border-border rounded-lg text-foreground font-medium">
                      <FileText className="w-5 h-5 text-muted" />
                      <span className="text-sm">Using existing summaries from Library</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg">
                        <div className="flex items-center space-x-2 text-primary font-medium">
                          <FileText className="w-5 h-5" />
                          <span className="text-sm">{state.finalSummaries.length} Job summaries generated</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => updateState({ isSummaryExpanded: !state.isSummaryExpanded })}
                          className="text-primary hover:text-primary-hover font-semibold flex items-center space-x-1"
                        >
                          <span className="text-sm">Click to {state.isSummaryExpanded ? 'hide' : 'view'}</span>
                          {state.isSummaryExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </Button>
                      </div>

                      {state.isSummaryExpanded && (
                        <div className="animate-in slide-in-from-top-2 duration-200">
                          <JobSummaryViewer summaries={state.finalSummaries} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : null}
            </SectionCard>
          )}
        </div>
      )}

      {/* Viewer Modal */}
      <Modal
        isOpen={state.showExistingSummariesModal}
        onClose={() => updateState({ showExistingSummariesModal: false })}
        title="Existing Job Summaries"
        size="lg"
      >
        <JobSummaryViewer summaries={mockExistingSummaries} />
        <div className="mt-4 flex justify-end">
          <Button size="sm" onClick={() => updateState({ showExistingSummariesModal: false })}>Close</Button>
        </div>
      </Modal>
    </div>
  );
}