"use client";

import { Questionnaire } from "@/types";
import { Modal, Button } from "@/components/ui";
import { QUESTION_TYPES } from "@/constants";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionnaire: Questionnaire | null;
}

export default function PreviewModal({
  isOpen,
  onClose,
  questionnaire,
}: PreviewModalProps) {
  if (!questionnaire) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={questionnaire.title}
      size="lg"
    >
      <div className="space-y-6">
        {questionnaire.description && (
          <p className="text-sm text-muted">{questionnaire.description}</p>
        )}

        <div className="space-y-4">
          {questionnaire.questions.length === 0 ? (
            <p className="text-sm text-muted text-center py-8">
              No questions added yet.
            </p>
          ) : (
            questionnaire.questions.map((question, index) => (
              <div key={question.id} className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  {index + 1}. {question.question}
                  {question.required && (
                    <span className="text-danger ml-1">*</span>
                  )}
                </label>

                {question.type === QUESTION_TYPES.TEXT && (
                  <input
                    type="text"
                    disabled
                    placeholder="Text answer..."
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-muted cursor-not-allowed"
                  />
                )}

                {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
                  <div className="space-y-2">
                    {question.options?.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          disabled
                          className="w-4 h-4 text-primary border-border cursor-not-allowed"
                        />
                        <label className="text-sm text-muted cursor-not-allowed">
                          {option || `Option ${optIndex + 1}`}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
