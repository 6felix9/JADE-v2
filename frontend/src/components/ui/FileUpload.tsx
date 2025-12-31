"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import Button from "./Button";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
}

export default function FileUpload({ onFileSelect, accept, label = "Import and check" }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-12 bg-surface space-y-4 transition-colors hover:border-primary/50">
      <Upload className="w-12 h-12 text-muted" />
      <Button
        variant="primary"
        onClick={() => fileInputRef.current?.click()}
      >
        {label}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
        accept={accept}
      />
    </div>
  );
}

