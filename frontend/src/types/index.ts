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
