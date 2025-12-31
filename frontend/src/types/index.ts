/**
 * Centralized type definitions for JADE frontend
 * This file contains all shared interfaces and types used across the application
 */

// Job Data Interface
export interface JobData {
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

// Job Summary Interface
export interface JobSummary {
  jobId: string;
  jobTitle: string;
  summary: string;
  createdAt?: string;
}

// Form Option Types
export interface SelectOption {
  value: string;
  label: string;
}

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

// Wizard State Interface
export interface WizardState {
  // Step tracking
  currentStep: number;

  // Step 1: Job Upload & Comparison
  jobData: JobData | null; // For single job evaluation
  jobs: JobData[]; // For multiple jobs evaluation
  isMultipleJobs: boolean; // Flag to distinguish single vs multiple mode
  qualityPassed: boolean | null;
  comparisonOption: "no" | "human";
  humanEvaluation: string;

  // Step 2: Summary Selection
  isCheckingSummaries: boolean;
  hasExistingSummaries: boolean;
  summaryOption: "use-existing" | "create-new" | null;
  finalSummaries: JobSummary[];
  showExistingSummariesModal: boolean;
  isSummaryExpanded: boolean;

  // Step 3: Job Scoring
  selectedFactors: {
    accountability: boolean;
    complexity: boolean;
    judgement: boolean;
    communication: boolean;
    impact: boolean;
    knowledge: boolean;
  };
  isScoring: boolean;
  evaluationResults: Array<{
    jobId: string;
    jobTitle: string;
    scores: Record<string, number>;
    overallScore: number;
    confidence: number;
  }>;
  showResults: boolean;
}

// Wizard Step Configuration
export interface StepConfig {
  id: number;
  title: string;
  label: string;
  validate: (state: WizardState) => boolean;
}
