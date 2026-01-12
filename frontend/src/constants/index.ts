/**
 * Centralized constants for JADE frontend
 * This file contains all magic strings, routes, and configuration values used across the application
 */

// Application Routes
export const ROUTES = {
  HOME: '/',
  EVALUATE_JOB: '/evaluate-job',
  EVALUATE_MULTIPLE: '/evaluate-multiple-jobs',
  QUESTIONNAIRE: '/questionnaire',
} as const;

// Wizard Configuration
export const WIZARD = {
  STEPS: {
    JOB_UPLOAD: 1,
    SUMMARY_SELECTION: 2,
    AI_EVALUATION: 3,
  },
  LABELS: {
    STEP_1: "Upload & Compare",
    STEP_2: "Create Summary",
    STEP_3: "Evaluate",
  },
} as const;

// Button Labels
export const BUTTON_LABELS = {
  CANCEL: 'Cancel',
  RESET: 'Reset',
  NEXT: 'Next',
  SUBMIT: 'Submit',
  BACK: 'Back',
  IMPORT_AND_CHECK: 'Import and check',
  UPLOAD: 'Upload',
} as const;

// File Accept Types
export const FILE_ACCEPT_TYPES = {
  CSV: '.csv',
  XLSX: '.xlsx',
  JSON: '.json',
  ALL_JOB_FORMATS: '.csv,.xlsx,.json',
} as const;

// Quality Status Messages
export const QUALITY_MESSAGES = {
  PASSED: 'This job meets the quality requirements for AI evaluation.',
  FAILED: 'This job does not meet the quality requirements.',
} as const;

// Comparison Options
export const COMPARISON_OPTIONS = {
  NO: 'no',
  HUMAN: 'human',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  QUESTIONNAIRES: 'jade_questionnaires',
} as const;

// Question Types
export const QUESTION_TYPES = {
  TEXT: 'text',
  MULTIPLE_CHOICE: 'multiple_choice',
} as const;
