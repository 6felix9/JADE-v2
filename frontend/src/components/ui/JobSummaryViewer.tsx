"use client";

import { FileText } from "lucide-react";
import { JobSummary } from "@/types";

interface JobSummaryViewerProps {
  summaries: JobSummary[];
}

export default function JobSummaryViewer({ summaries }: JobSummaryViewerProps) {
  return (
    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      {summaries.map((summary, index) => (
        <div 
          key={summary.jobId || index} 
          className="border border-border rounded-lg p-3 bg-surface space-y-1.5 hover:border-primary/30 transition-colors"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-foreground flex items-center space-x-2">
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>{summary.jobTitle}</span>
            </h4>
            <span className="text-[10px] text-muted">{summary.jobId}</span>
          </div>
          <p className="text-xs text-foreground leading-snug italic">
            {`"${summary.summary}"`}
          </p>
          {summary.createdAt && (
            <p className="text-[9px] text-muted text-right">Last updated: {summary.createdAt}</p>
          )}
        </div>
      ))}
    </div>
  );
}

