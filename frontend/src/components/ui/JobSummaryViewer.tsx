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
          className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-2 hover:border-blue-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-gray-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>{summary.jobTitle}</span>
            </h4>
            <span className="text-xs text-gray-400">{summary.jobId}</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed italic">
            {`"${summary.summary}"`}
          </p>
          {summary.createdAt && (
            <p className="text-[10px] text-gray-400 text-right">Last updated: {summary.createdAt}</p>
          )}
        </div>
      ))}
    </div>
  );
}

