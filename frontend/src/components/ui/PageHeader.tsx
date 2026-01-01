"use client";

import { ChevronLeft } from "lucide-react";
import Button from "./Button";

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
}

export default function PageHeader({ title, onBack }: PageHeaderProps) {
  return (
    <div className="flex items-center space-x-3 mb-6">
      {onBack && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5 text-muted" />
        </Button>
      )}
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
    </div>
  );
}

