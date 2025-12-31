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
    updateState({ finalSummaries: mockNewSummaries });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {state.isCheckingSummaries ? (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted font-medium animate-pulse">Checking Library for existing summaries...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {state.hasExistingSummaries && (
            <SectionCard className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg text-warning">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    A Job Summary already exists for one or more jobs in the Library.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => updateState({ showExistingSummariesModal: true })}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View existing summaries</span>
                  </Button>

                  <div className="pt-3 border-t border-border">
                    <p className="text-xs font-semibold text-foreground mb-2">
                      Do you want to use these existing summaries, or create new ones to be used for the AI evaluation?
                    </p>
                    <RadioGroup
                      name="summary-choice"
                      value={state.summaryOption || ""}
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

                  {state.summaryOption === "create-new" && state.finalSummaries.length === 0 && (
                    <div className="pt-3 border-t border-border">
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
            subtitle={state.finalSummaries.length > 0 ? "The job summaries have been prepared for your review." : state.hasExistingSummaries && state.summaryOption ? (state.summaryOption === "create-new" ? "Click 'Generate job summaries' above to create new summaries." : "") : state.hasExistingSummaries ? "Select an option above to proceed." : "Generating job summaries..."}
          >
            {state.finalSummaries.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center space-x-3 text-primary font-medium">
                    <FileText className="w-6 h-6" />
                    <span>{state.finalSummaries.length} Job summaries generated</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => updateState({ isSummaryExpanded: !state.isSummaryExpanded })}
                    className="text-primary hover:text-primary-hover font-semibold flex items-center space-x-1"
                  >
                    <span>Click to {state.isSummaryExpanded ? 'hide' : 'view'}</span>
                    {state.isSummaryExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>

                {state.isSummaryExpanded && (
                  <div>
                    <JobSummaryViewer summaries={state.finalSummaries} />
                  </div>
                )}
              </div>
            ) : !state.hasExistingSummaries ? (
              <div className="p-12 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center space-y-3 text-muted">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p>Generating summaries...</p>
              </div>
            ) : null}
          </SectionCard>
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
        <div className="mt-6 flex justify-end">
          <Button onClick={() => updateState({ showExistingSummariesModal: false })}>Close</Button>
        </div>
      </Modal>
    </div>
  );
}

