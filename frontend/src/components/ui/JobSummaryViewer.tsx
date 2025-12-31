"use client";

import { FileText } from "lucide-react";
import { JobSummary } from "@/types";

interface JobSummaryViewerProps {
  summaries: JobSummary[];
}

export default function JobSummaryViewer({ summaries }: JobSummaryViewerProps) {
  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      {summaries.map((summary, index) => (
        <div 
          key={summary.jobId || index} 
          className="border border-border rounded-lg p-4 bg-surface space-y-2 hover:border-primary/30 transition-colors"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-foreground flex items-center space-x-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>{summary.jobTitle}</span>
            </h4>
            <span className="text-xs text-muted">{summary.jobId}</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed italic">
            {`"${summary.summary}"`}
          </p>
          {summary.createdAt && (
            <p className="text-[10px] text-muted text-right">Last updated: {summary.createdAt}</p>
          )}
        </div>
      ))}
    </div>
  );
}

