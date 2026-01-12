"use client";

import { useState, useEffect } from "react";
import { Modal, Button } from "@/components/ui";
import { Factor } from "@/types";

interface FactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (factor: Omit<Factor, "id">) => void;
  editingFactor: Factor | null;
  existingFactors: Factor[];
}

export default function FactorModal({
  isOpen,
  onClose,
  onSave,
  editingFactor,
  existingFactors,
}: FactorModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  const isEditMode = editingFactor !== null;

  useEffect(() => {
    if (isOpen) {
      if (editingFactor) {
        setName(editingFactor.name);
        setDescription(editingFactor.description);
      } else {
        setName("");
        setDescription("");
      }
      setErrors({});
    }
  }, [isOpen, editingFactor]);

  const validate = (): boolean => {
    const newErrors: { name?: string; description?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Factor name is required";
    } else {
      // Check for duplicate names (case-insensitive), excluding the current factor being edited
      const duplicate = existingFactors.find(
        (f) => f.id !== editingFactor?.id && f.name.toLowerCase() === name.trim().toLowerCase()
      );
      if (duplicate) {
        newErrors.name = "A factor with this name already exists";
      }
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        name: name.trim(),
        description: description.trim(),
      });
      onClose();
    }
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? "Edit Evaluation Factor" : "Add Evaluation Factor"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="factor-name" className="block text-sm font-medium text-foreground mb-1.5">
            Factor Name <span className="text-danger">*</span>
          </label>
          <input
            id="factor-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.name ? "border-danger" : "border-border"
            }`}
            placeholder="e.g., Knowledge, Complexity"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-danger">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="factor-description" className="block text-sm font-medium text-foreground mb-1.5">
            Description <span className="text-danger">*</span>
          </label>
          <textarea
            id="factor-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
              errors.description ? "border-danger" : "border-border"
            }`}
            placeholder="Describe what this factor evaluates..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-danger">{errors.description}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditMode ? "Save Changes" : "Add Factor"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
