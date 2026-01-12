"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button, SectionCard } from "@/components/ui";
import FactorModal from "./FactorModal";
import { Factor } from "@/types";

interface FactorTableProps {
  factors: Factor[];
  onAdd: (factor: Omit<Factor, "id">) => void;
  onEdit: (id: string, factor: Omit<Factor, "id">) => void;
  onDelete: (id: string) => void;
}

export default function FactorTable({ factors, onAdd, onEdit, onDelete }: FactorTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFactor, setEditingFactor] = useState<Factor | null>(null);

  const handleAddClick = () => {
    setEditingFactor(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (factor: Factor) => {
    setEditingFactor(factor);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm("Are you sure you want to delete this factor? This action cannot be undone.")) {
      onDelete(id);
    }
  };

  const handleSave = (factorData: Omit<Factor, "id">) => {
    if (editingFactor) {
      onEdit(editingFactor.id, factorData);
    } else {
      onAdd(factorData);
    }
    setIsModalOpen(false);
    setEditingFactor(null);
  };

  return (
    <>
      <SectionCard>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Evaluation Factors</h2>
            <p className="text-muted text-sm mt-1">
              Manage the factors used to evaluate jobs. Add, edit, or remove factors as needed.
            </p>
          </div>
          <Button onClick={handleAddClick} variant="primary" size="md">
            <Plus className="w-4 h-4 mr-2" />
            Add Factor
          </Button>
        </div>

        {factors.length === 0 ? (
          <div className="text-center py-12 border border-border rounded-lg bg-surface">
            <p className="text-muted mb-2">No evaluation factors yet</p>
            <p className="text-muted text-sm mb-4">Get started by adding your first factor</p>
            <Button onClick={handleAddClick} variant="primary" size="md">
              <Plus className="w-4 h-4 mr-2" />
              Add Factor
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Factor Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Description</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {factors.map((factor) => (
                  <tr
                    key={factor.id}
                    className="border-b border-border hover:bg-surface/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-foreground font-medium">{factor.name}</td>
                    <td className="py-3 px-4 text-muted text-sm">{factor.description}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(factor)}
                          aria-label={`Edit ${factor.name}`}
                        >
                          <Pencil className="w-4 h-4 text-muted hover:text-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(factor.id)}
                          aria-label={`Delete ${factor.name}`}
                        >
                          <Trash2 className="w-4 h-4 text-muted hover:text-danger" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      <FactorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFactor(null);
        }}
        onSave={handleSave}
        editingFactor={editingFactor}
        existingFactors={factors}
      />
    </>
  );
}
