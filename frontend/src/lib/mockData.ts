/**
 * Mock data service for JADE frontend
 * This file contains all mock data used for development and testing
 * In production, this data will be replaced with actual API calls
 */

import { JobData, JobSummary } from "@/types";

// Single job data for evaluation
export const mockJobData: JobData = {
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

// Multiple jobs data for batch evaluation
export const mockJobs: JobData[] = [
  {
    id: "01-0025",
    job_title: "Assistant Vice President",
    employee_id: "01-0025",
    department: "Cebu Regional Office",
    manager_info: {
      job_title: "Sr. Assistant Vice President - Regional Operations",
      name: "Chito M. Recamadas",
    },
    position_type: "Has oversight of people, and/or budget, and/or an area of operations",
    team_size: "10 teams, 193 people",
    supervisory_duties: "True",
    budget_responsibility: "General and Administrative expenses",
    scope_of_impact: "All departments in Cebu Region",
    job_purpose: "To manage the entire Cebu Regional Operations across all departments ensuring that the region operates in compliance with the standards set by the management.",
    key_responsibilities: { "1": "Oversee daily operations", "2": "Planning", "3": "Problem solving" },
    responsibility1_details: "Oversee daily operations of Cebu Region",
    responsibility2_details: "Strategic planning and execution",
    responsibility3_details: "Problem solving across departments",
    decision_making: "Strategic decisions affecting regional operations",
    error_impact: "High impact on regional performance",
    work_timeframe: "1 - 6 months",
    key_interactions: "Department heads, senior management",
    complexity_level: "High",
    work_environment: "General Office environment",
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
    position_type: "Has oversight of budget and financial operations",
    team_size: "5 teams, 25 people",
    supervisory_duties: "True",
    budget_responsibility: "Divisional financial operations",
    scope_of_impact: "Finance Division",
    job_purpose: "To oversee all financial operations, budgeting, and fiscal reporting for the division.",
    key_responsibilities: { "1": "Financial planning", "2": "Budget management", "3": "Fiscal reporting" },
    responsibility1_details: "Develop financial strategies and plans",
    responsibility2_details: "Manage divisional budgets",
    responsibility3_details: "Ensure accurate fiscal reporting",
    decision_making: "Financial decisions for the division",
    error_impact: "High impact on financial accuracy",
    work_timeframe: "3 - 12 months",
    key_interactions: "CFO, department heads, auditors",
    complexity_level: "High",
    work_environment: "General Office environment",
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
    position_type: "Supervisory role",
    team_size: "3 teams, 15 people",
    supervisory_duties: "True",
    budget_responsibility: "Operational expenses",
    scope_of_impact: "Operations team",
    job_purpose: "To supervise daily operational activities and ensure efficiency in service delivery.",
    key_responsibilities: { "1": "Daily operations oversight", "2": "Quality control", "3": "Team management" },
    responsibility1_details: "Supervise daily operational activities",
    responsibility2_details: "Ensure quality standards are met",
    responsibility3_details: "Manage and develop team members",
    decision_making: "Operational decisions for the team",
    error_impact: "Medium impact on operations",
    work_timeframe: "1 - 3 months",
    key_interactions: "Operations Manager, team members, other supervisors",
    complexity_level: "Medium",
    work_environment: "General Office environment",
  },
];

// Existing job summaries
export const mockExistingSummaries: JobSummary[] = [
  {
    jobId: "01-0025",
    jobTitle: "Assistant Vice President",
    summary: "Strategic management of Cebu Regional Operations, overseeing compliance, revenue generation, and team collaboration across 10 departments.",
    createdAt: "2025-12-15",
  },
  {
    jobId: "01-0026",
    jobTitle: "Finance Div Mgr",
    summary: "Senior leadership role responsible for divisional financial strategy, budget oversight, and fiscal compliance reporting.",
    createdAt: "2025-11-20",
  }
];

// New job summaries (generated)
export const mockNewSummaries: JobSummary[] = [
  {
    jobId: "01-0025",
    jobTitle: "Assistant Vice President",
    summary: "Directs regional operations in Cebu, focusing on operational standards, inter-departmental synergy, and achieving financial KRAs.",
  },
  {
    jobId: "01-0026",
    jobTitle: "Finance Div Mgr",
    summary: "Manages divisional finance functions, ensuring alignment with corporate budgeting goals and regulatory requirements.",
  },
  {
    jobId: "01-0027",
    jobTitle: "Operations Supervisor",
    summary: "Supervises daily floor operations to maintain high service levels and operational efficiency within the division.",
  }
];
