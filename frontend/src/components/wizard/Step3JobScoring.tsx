"use client";

import { useState } from "react";
import {
  SectionCard,
  JobSummaryViewer,
  Button,
  FactorSelection,
} from "@/components/ui";
import { ChevronDown, ChevronUp, BarChart3, Info } from "lucide-react";
import { WizardState } from "@/types";
import { mockEvaluationResults } from "@/lib/mockData";

interface Step3Props {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
}

export default function Step3JobScoring({ state, updateState }: Step3Props) {
  const [expandedResults, setExpandedResults] = useState<Record<string, boolean>>({});
  const [isSummariesExpanded, setIsSummariesExpanded] = useState(false);

  const toggleResult = (jobId: string) => {
    setExpandedResults(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  const handleFactorToggle = (factor: keyof WizardState["selectedFactors"]) => {
    updateState({
      selectedFactors: {
        ...state.selectedFactors,
        [factor]: !state.selectedFactors[factor]
      }
    });
  };

  const handleScoreJobs = () => {
    updateState({ isScoring: true });
    
    // Simulate API call for scoring
    setTimeout(() => {
      updateState({
        isScoring: false,
        evaluationResults: mockEvaluationResults,
        showResults: true
      });
    }, 2000);
  };

  const anyFactorSelected = Object.values(state.selectedFactors).some(v => v);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Summary Review */}
      <SectionCard 
        title="Job Summaries for Evaluation" 
        subtitle="Review the summaries that will be used for AI scoring."
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg">
            <div className="flex items-center space-x-2 text-foreground font-medium">
              <Info className="w-5 h-5 text-muted" />
              <span className="text-sm">{state.finalSummaries.length} Job summaries ready</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSummariesExpanded(!isSummariesExpanded)}
              className="text-primary hover:text-primary-hover font-semibold flex items-center space-x-1"
            >
              <span className="text-sm">Click to {isSummariesExpanded ? 'hide' : 'view'}</span>
              {isSummariesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </Button>
          </div>

          {isSummariesExpanded && (
            <div className="animate-in slide-in-from-top-2 duration-200">
              <JobSummaryViewer summaries={state.finalSummaries} />
            </div>
          )}
        </div>
      </SectionCard>

      {/* Factor Selection */}
      <SectionCard 
        title="Select Evaluation Factors" 
        subtitle="Choose which factors the AI should use to score the job(s)."
      >
        <FactorSelection 
          selectedFactors={state.selectedFactors}
          onFactorToggle={handleFactorToggle}
        />
      </SectionCard>

      {/* Scoring Action */}
      {!state.showResults && (
        <SectionCard title="Generate AI Evaluation">
          <div className="flex flex-col items-center space-y-3 py-2">
            <p className="text-muted text-sm text-center max-w-md">
              The AI will analyze the job summaries based on your selected factors to determine the job level and scores.
            </p>
            <Button 
              onClick={handleScoreJobs} 
              disabled={!anyFactorSelected || state.isScoring}
              className="w-full md:w-auto px-5 py-3 text-base h-auto"
            >
              {state.isScoring ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background"></div>
                  <span>Scoring Jobs...</span>
                </div>
              ) : (
                "Score the Job(s)"
              )}
            </Button>
          </div>
        </SectionCard>
      )}

      {/* Results Section */}
      {state.showResults && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SectionCard 
            title="Evaluation Results" 
            subtitle="AI generated scores for each job based on selected factors."
          >
            <div className="space-y-3">
              {state.evaluationResults.map((result) => (
                <div key={result.jobId} className="border border-border rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleResult(result.jobId)}
                    className="w-full flex items-center justify-between p-3 bg-surface hover:bg-border/10 transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <BarChart3 className="w-4.5 h-4.5" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-sm text-foreground">{result.jobTitle}</h4>
                        <div className="flex items-center space-x-2 mt-0.5">
                           <span className="text-[10px] font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            Overall: {result.overallScore}
                          </span>
                          <span className="text-[10px] font-medium px-2 py-0.5 bg-success/10 text-success rounded-full">
                            {result.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                    {expandedResults[result.jobId] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  
                  {expandedResults[result.jobId] && (
                    <div className="p-4 bg-background border-t border-border animate-in slide-in-from-top-2 duration-200">
                      <h5 className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-3">Factor Scores</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(result.scores).map(([factor, score]) => (
                          <div key={factor} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium text-foreground capitalize">{factor}</span>
                              <span className="text-xs font-bold text-primary">{score}/5</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}

