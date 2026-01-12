/**
 * Local storage service for managing questionnaires
 * Handles CRUD operations for questionnaires stored in browser localStorage
 */

import { Questionnaire, Question } from "@/types";
import { STORAGE_KEYS } from "@/constants";

/**
 * Generate a unique ID for questionnaires and questions
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Retrieve all questionnaires from local storage
 */
export function getAllQuestionnaires(): Questionnaire[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.QUESTIONNAIRES);
    if (!stored) return [];
    return JSON.parse(stored) as Questionnaire[];
  } catch (error) {
    console.error('Error reading questionnaires from localStorage:', error);
    return [];
  }
}

/**
 * Get a specific questionnaire by ID
 */
export function getQuestionnaireById(id: string): Questionnaire | null {
  const questionnaires = getAllQuestionnaires();
  return questionnaires.find(q => q.id === id) || null;
}

/**
 * Save a questionnaire (create or update)
 */
export function saveQuestionnaire(questionnaire: Questionnaire): void {
  if (typeof window === 'undefined') return;
  
  try {
    const questionnaires = getAllQuestionnaires();
    const existingIndex = questionnaires.findIndex(q => q.id === questionnaire.id);
    
    if (existingIndex >= 0) {
      // Update existing
      questionnaires[existingIndex] = {
        ...questionnaire,
        updatedAt: new Date().toISOString(),
      };
    } else {
      // Create new
      questionnaires.push({
        ...questionnaire,
        createdAt: questionnaire.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    
    localStorage.setItem(STORAGE_KEYS.QUESTIONNAIRES, JSON.stringify(questionnaires));
  } catch (error) {
    console.error('Error saving questionnaire to localStorage:', error);
    throw error;
  }
}

/**
 * Delete a questionnaire by ID
 */
export function deleteQuestionnaire(id: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const questionnaires = getAllQuestionnaires();
    const filtered = questionnaires.filter(q => q.id !== id);
    localStorage.setItem(STORAGE_KEYS.QUESTIONNAIRES, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting questionnaire from localStorage:', error);
    throw error;
  }
}
