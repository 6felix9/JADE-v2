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
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Summary Review */}
      <SectionCard 
        title="Job Summaries for Evaluation" 
        subtitle="Review the summaries that will be used for AI scoring."
      >
        <JobSummaryViewer summaries={state.finalSummaries} />
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
          <div className="flex flex-col items-center space-y-4 py-4">
            <p className="text-muted text-center max-w-md">
              The AI will analyze the job summaries based on your selected factors to determine the job level and scores.
            </p>
            <Button 
              onClick={handleScoreJobs} 
              disabled={!anyFactorSelected || state.isScoring}
              className="w-full md:w-auto px-6 py-4 text-lg h-auto"
            >
              {state.isScoring ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-background"></div>
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
            <div className="space-y-4">
              {state.evaluationResults.map((result) => (
                <div key={result.jobId} className="border border-border rounded-xl overflow-hidden">
                  <button 
                    onClick={() => toggleResult(result.jobId)}
                    className="w-full flex items-center justify-between p-4 bg-surface hover:bg-border/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-foreground">{result.jobTitle}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                           <span className="text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            Overall: {result.overallScore}
                          </span>
                          <span className="text-xs font-medium px-2 py-0.5 bg-success/10 text-success rounded-full">
                            {result.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    </div>
                    {expandedResults[result.jobId] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  
                  {expandedResults[result.jobId] && (
                    <div className="p-6 bg-background border-t border-border animate-in slide-in-from-top-2 duration-200">
                      <h5 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Factor Scores</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(result.scores).map(([factor, score]) => (
                          <div key={factor} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-foreground capitalize">{factor}</span>
                              <span className="text-sm font-bold text-primary">{score}/5</span>
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

