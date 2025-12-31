"use client";

import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
}

export default function PageHeader({ title, onBack }: PageHeaderProps) {
  return (
    <div className="flex items-center space-x-4 mb-8">
      {onBack && (
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      )}
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    </div>
  );
}

