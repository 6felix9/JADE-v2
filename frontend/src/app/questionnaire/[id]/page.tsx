"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "@/components/Header";
import { PageHeader, Button, SectionCard } from "@/components/ui";
import { QuestionBuilder } from "@/components/questionnaire";
import { Questionnaire, Question } from "@/types";
import {
  getQuestionnaireById,
  saveQuestionnaire,
  generateId,
} from "@/lib/questionnaireStorage";
import { ROUTES } from "@/constants";
import { QUESTION_TYPES } from "@/constants";

export default function CreateEditQuestionnairePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew) {
      loadQuestionnaire();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const loadQuestionnaire = () => {
    if (isNew) return;
    
    const questionnaire = getQuestionnaireById(id);
    if (questionnaire) {
      setTitle(questionnaire.title);
      setDescription(questionnaire.description);
      setQuestions(questionnaire.questions);
    } else {
      // Questionnaire not found, redirect to list
      router.push(ROUTES.QUESTIONNAIRE);
      return;
    }
    setIsLoading(false);
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: generateId(),
      type: QUESTION_TYPES.TEXT,
      question: "",
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index: number, updatedQuestion: Question) => {
    const updated = [...questions];
    updated[index] = updatedQuestion;
    setQuestions(updated);
  };

  const handleQuestionDelete = (index: number) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a questionnaire title");
      return;
    }

    if (questions.length === 0) {
      alert("Please add at least one question");
      return;
    }

    // Validate all questions have text
    const invalidQuestions = questions.filter(q => !q.question.trim());
    if (invalidQuestions.length > 0) {
      alert("Please fill in all question texts");
      return;
    }

    // Validate multiple choice questions have options
    const invalidOptions = questions.filter(
      q => q.type === QUESTION_TYPES.MULTIPLE_CHOICE &&
      (!q.options || q.options.length === 0 || q.options.every(opt => !opt.trim()))
    );
    if (invalidOptions.length > 0) {
      alert("Multiple choice questions must have at least one option");
      return;
    }

    const questionnaire: Questionnaire = {
      id: isNew ? generateId() : id,
      title: title.trim(),
      description: description.trim(),
      questions: questions.map(q => ({
        ...q,
        // Filter out empty options for multiple choice
        options: q.type === QUESTION_TYPES.MULTIPLE_CHOICE
          ? q.options?.filter(opt => opt.trim())
          : undefined,
      })),
      createdAt: isNew ? new Date().toISOString() : "",
      updatedAt: new Date().toISOString(),
    };

    // Load existing to preserve createdAt
    if (!isNew) {
      const existing = getQuestionnaireById(id);
      if (existing) {
        questionnaire.createdAt = existing.createdAt;
      }
    }

    saveQuestionnaire(questionnaire);
    router.push(ROUTES.QUESTIONNAIRE);
  };

  const handleCancel = () => {
    router.push(ROUTES.QUESTIONNAIRE);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface flex flex-col">
        <Header />
        <div className="max-w-4xl mx-auto w-full px-6 pt-4">
          <p className="text-muted">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface flex flex-col pb-6">
      <Header />
      
      <div className="max-w-4xl mx-auto w-full px-6 pt-4 space-y-6">
        <PageHeader
          title={isNew ? "Create Questionnaire" : "Edit Questionnaire"}
          onBack={handleCancel}
        />

        <SectionCard title="Basic Information">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter questionnaire title..."
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter questionnaire description (optional)..."
                rows={3}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Questions">
          <div className="space-y-4">
            {questions.length === 0 ? (
              <p className="text-sm text-muted text-center py-4">
                No questions added yet. Click "Add Question" to get started.
              </p>
            ) : (
              questions.map((question, index) => (
                <QuestionBuilder
                  key={question.id}
                  question={question}
                  onChange={(updated) => handleQuestionChange(index, updated)}
                  onDelete={() => handleQuestionDelete(index)}
                />
              ))
            )}

            <Button
              variant="outline"
              onClick={handleAddQuestion}
              className="w-full"
            >
              Add Question
            </Button>
          </div>
        </SectionCard>

        <div className="flex justify-between items-center pt-6 border-t border-border">
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save & Close
          </Button>
        </div>
      </div>
    </main>
  );
}
