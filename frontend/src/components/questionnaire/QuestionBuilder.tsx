"use client";

import { useState, useEffect } from "react";
import { Question, QuestionType } from "@/types";
import { Button, Select } from "@/components/ui";
import { QUESTION_TYPES } from "@/constants";
import { X, Plus } from "lucide-react";

interface QuestionBuilderProps {
  question: Question;
  onChange: (question: Question) => void;
  onDelete: () => void;
}

export default function QuestionBuilder({
  question,
  onChange,
  onDelete,
}: QuestionBuilderProps) {
  const [localQuestion, setLocalQuestion] = useState<Question>(question);

  useEffect(() => {
    setLocalQuestion(question);
  }, [question]);

  const handleTypeChange = (newType: QuestionType) => {
    const updated: Question = {
      ...localQuestion,
      type: newType,
      // Clear options if switching from multiple_choice to text
      options: newType === 'text' ? undefined : (localQuestion.options || ['']),
    };
    setLocalQuestion(updated);
    onChange(updated);
  };

  const handleQuestionChange = (value: string) => {
    const updated = { ...localQuestion, question: value };
    setLocalQuestion(updated);
    onChange(updated);
  };

  const handleRequiredChange = (required: boolean) => {
    const updated = { ...localQuestion, required };
    setLocalQuestion(updated);
    onChange(updated);
  };

  const handleOptionChange = (index: number, value: string) => {
    if (!localQuestion.options) return;
    const updatedOptions = [...localQuestion.options];
    updatedOptions[index] = value;
    const updated = { ...localQuestion, options: updatedOptions };
    setLocalQuestion(updated);
    onChange(updated);
  };

  const handleAddOption = () => {
    const updatedOptions = [...(localQuestion.options || []), ''];
    const updated = { ...localQuestion, options: updatedOptions };
    setLocalQuestion(updated);
    onChange(updated);
  };

  const handleRemoveOption = (index: number) => {
    if (!localQuestion.options || localQuestion.options.length <= 1) return;
    const updatedOptions = localQuestion.options.filter((_, i) => i !== index);
    const updated = { ...localQuestion, options: updatedOptions };
    setLocalQuestion(updated);
    onChange(updated);
  };

  const questionTypeOptions = [
    { value: QUESTION_TYPES.TEXT, label: 'Text Input' },
    { value: QUESTION_TYPES.MULTIPLE_CHOICE, label: 'Multiple Choice' },
  ];

  return (
    <div className="p-4 border border-border rounded-lg bg-background space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Question Type"
              value={localQuestion.type}
              onChange={(value) => handleTypeChange(value as QuestionType)}
              options={questionTypeOptions}
            />
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id={`required-${localQuestion.id}`}
                checked={localQuestion.required}
                onChange={(e) => handleRequiredChange(e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label
                htmlFor={`required-${localQuestion.id}`}
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Required
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">
              Question
            </label>
            <input
              type="text"
              value={localQuestion.question}
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Enter your question..."
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {localQuestion.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
            <div className="space-y-2">
              <label className="block text-xs font-medium text-foreground mb-2">
                Options
              </label>
              {localQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 bg-background border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {localQuestion.options && localQuestion.options.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveOption(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddOption}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Option
              </Button>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-danger hover:text-danger hover:bg-danger/10"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
