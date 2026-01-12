"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { PageHeader, Button, Modal } from "@/components/ui";
import { QuestionnaireCard, PreviewModal } from "@/components/questionnaire";
import { Questionnaire } from "@/types";
import {
  getAllQuestionnaires,
  deleteQuestionnaire,
} from "@/lib/questionnaireStorage";
import { exportToGoogleForms } from "@/lib/googleFormsExport";
import { ROUTES } from "@/constants";

export default function QuestionnairePage() {
  const router = useRouter();
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [previewQuestionnaire, setPreviewQuestionnaire] = useState<Questionnaire | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [exportLink, setExportLink] = useState<string | null>(null);

  useEffect(() => {
    loadQuestionnaires();
  }, []);

  const loadQuestionnaires = () => {
    const all = getAllQuestionnaires();
    setQuestionnaires(all);
  };

  const handleCreate = () => {
    router.push(`${ROUTES.QUESTIONNAIRE}/new`);
  };

  const handleEdit = (id: string) => {
    router.push(`${ROUTES.QUESTIONNAIRE}/${id}`);
  };

  const handlePreview = (questionnaire: Questionnaire) => {
    setPreviewQuestionnaire(questionnaire);
    setIsPreviewOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteQuestionnaire(deleteTarget);
      loadQuestionnaires();
      setDeleteTarget(null);
    }
  };

  const handleExport = async (questionnaire: Questionnaire) => {
    setIsExporting(questionnaire.id);
    try {
      const link = await exportToGoogleForms(questionnaire);
      setExportLink(link);
      // Copy to clipboard
      navigator.clipboard.writeText(link).catch(() => {
        // Ignore clipboard errors
      });
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="min-h-screen bg-surface flex flex-col pb-6">
      <Header />
      
      <div className="max-w-6xl mx-auto w-full px-6 pt-4 space-y-6">
        <PageHeader
          title="Questionnaires"
          onBack={() => router.push(ROUTES.HOME)}
        />

        <div className="flex justify-between items-center">
          <p className="text-sm text-muted">
            Create and manage employee information questionnaires
          </p>
          <Button onClick={handleCreate}>
            Create New Questionnaire
          </Button>
        </div>

        {questionnaires.length === 0 ? (
          <div className="surface-card p-12 text-center rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No questionnaires yet
            </h3>
            <p className="text-sm text-muted mb-6">
              Get started by creating your first questionnaire
            </p>
            <Button onClick={handleCreate}>
              Create Questionnaire
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {questionnaires.map((questionnaire) => (
              <QuestionnaireCard
                key={questionnaire.id}
                questionnaire={questionnaire}
                onEdit={() => handleEdit(questionnaire.id)}
                onPreview={() => handlePreview(questionnaire)}
                onExport={() => handleExport(questionnaire)}
                onDelete={() => handleDelete(questionnaire.id)}
                isExporting={isExporting === questionnaire.id}
              />
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteTarget !== null}
          onClose={() => setDeleteTarget(null)}
          title="Delete Questionnaire"
          size="sm"
        >
          <div className="space-y-4">
            <p className="text-sm text-foreground">
              Are you sure you want to delete this questionnaire? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>

        {/* Export Success Modal */}
        <Modal
          isOpen={exportLink !== null}
          onClose={() => setExportLink(null)}
          title="Export Successful"
          size="sm"
        >
          <div className="space-y-4">
            <p className="text-sm text-foreground">
              Google Forms integration coming soon - this is a preview link.
            </p>
            <div className="p-3 bg-surface border border-border rounded-md">
              <p className="text-xs text-muted mb-2">Google Forms Link:</p>
              <p className="text-sm text-foreground break-all font-mono">
                {exportLink}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => exportLink && copyToClipboard(exportLink)}
              >
                Copy Link
              </Button>
              <Button onClick={() => setExportLink(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>

        {/* Preview Modal */}
        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          questionnaire={previewQuestionnaire}
        />
      </div>
    </main>
  );
}
