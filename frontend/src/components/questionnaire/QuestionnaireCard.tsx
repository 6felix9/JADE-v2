"use client";

import { Questionnaire } from "@/types";
import { Button } from "@/components/ui";

interface QuestionnaireCardProps {
  questionnaire: Questionnaire;
  onEdit: () => void;
  onPreview: () => void;
  onExport: () => void;
  onDelete: () => void;
  isExporting?: boolean;
}

export default function QuestionnaireCard({
  questionnaire,
  onEdit,
  onPreview,
  onExport,
  onDelete,
  isExporting = false,
}: QuestionnaireCardProps) {
  const questionCount = questionnaire.questions.length;
  const formattedDate = new Date(questionnaire.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="surface-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {questionnaire.title}
          </h3>
          {questionnaire.description && (
            <p className="text-sm text-muted mb-2 line-clamp-2">
              {questionnaire.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>{questionCount} {questionCount === 1 ? 'question' : 'questions'}</span>
            <span>Updated {formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onPreview}
        >
          Preview
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          disabled={isExporting}
        >
          {isExporting ? "Exporting..." : "Export"}
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
