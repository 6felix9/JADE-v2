import { Factor } from "@/types";

const STORAGE_KEY = "jade_evaluation_factors";

// Default factors based on existing factor_keys.ts
const DEFAULT_FACTORS: Factor[] = [
  {
    id: crypto.randomUUID(),
    name: "Knowledge",
    description: "Knowledge required for the role",
  },
  {
    id: crypto.randomUUID(),
    name: "Experience",
    description: "Years and depth of experience needed",
  },
  {
    id: crypto.randomUUID(),
    name: "Complexity",
    description: "Complexity of tasks and problem-solving",
  },
  {
    id: crypto.randomUUID(),
    name: "Impact",
    description: "Organizational impact and reach of decisions",
  },
  {
    id: crypto.randomUUID(),
    name: "Communication",
    description: "Communication and interpersonal skills required",
  },
];

/**
 * Get all factors from local storage
 * Returns empty array if none exist
 */
export function getFactors(): Factor[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as Factor[];
  } catch (error) {
    console.error("Error reading factors from localStorage:", error);
    return [];
  }
}

/**
 * Save factors to local storage
 */
export function saveFactors(factors: Factor[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(factors));
  } catch (error) {
    console.error("Error saving factors to localStorage:", error);
  }
}

/**
 * Initialize factors with default values if none exist
 * This should be called on first load
 */
export function initializeFactors(): void {
  if (typeof window === "undefined") {
    return;
  }

  const existing = getFactors();
  if (existing.length === 0) {
    saveFactors(DEFAULT_FACTORS);
  }
}
