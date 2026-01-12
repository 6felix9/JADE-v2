"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { PageHeader } from "@/components/ui";
import FactorTable from "@/components/ui/FactorTable";
import { Factor } from "@/types";
import { getFactors, saveFactors, initializeFactors } from "@/lib/localStorage";

export default function OrgSetupPage() {
  const router = useRouter();
  const [factors, setFactors] = useState<Factor[]>([]);

  useEffect(() => {
    // Initialize with default factors if none exist
    initializeFactors();
    // Load factors from local storage
    setFactors(getFactors());
  }, []);

  const handleAdd = (factorData: Omit<Factor, "id">) => {
    const newFactor: Factor = {
      ...factorData,
      id: crypto.randomUUID(),
    };
    const updatedFactors = [...factors, newFactor];
    setFactors(updatedFactors);
    saveFactors(updatedFactors);
  };

  const handleEdit = (id: string, factorData: Omit<Factor, "id">) => {
    const updatedFactors = factors.map((f) =>
      f.id === id ? { ...factorData, id } : f
    );
    setFactors(updatedFactors);
    saveFactors(updatedFactors);
  };

  const handleDelete = (id: string) => {
    const updatedFactors = factors.filter((f) => f.id !== id);
    setFactors(updatedFactors);
    saveFactors(updatedFactors);
  };

  return (
    <main className="min-h-screen bg-surface flex flex-col pb-6">
      <Header />
      
      <div className="max-w-4xl mx-auto w-full px-6 pt-4 space-y-4">
        <PageHeader 
          title="Organization Setup" 
          onBack={() => router.push("/")} 
        />

        <div className="space-y-4">
          <FactorTable
            factors={factors}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </main>
  );
}
