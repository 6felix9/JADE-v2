"use client";

import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import { JobData } from "@/types";

interface JobListProps {
  jobs: JobData[];
  isExpanded: boolean;
  onToggle: () => void;
  title?: string;
}

export default function JobList({ jobs, isExpanded, onToggle, title = "Jobs ready for evaluation" }: JobListProps) {
  return (
    <div className="surface-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between bg-surface px-4 py-3 border-b border-border hover:opacity-80 transition-opacity focus:outline-none"
      >
        <div className="flex items-center space-x-3">
          <FileText className="w-5 h-5 text-muted" />
          <span className="font-semibold text-foreground">
            {jobs.length} {title}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted" />
        )}
      </button>

      {isExpanded && (
        <div className="divide-y divide-border max-h-[400px] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          {jobs.map((job, index) => (
            <div key={job.id || index} className="p-4 hover:bg-surface transition-colors">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted text-xs uppercase tracking-wider font-semibold mb-1">Job Title</p>
                  <p className="font-medium text-foreground">{job.job_title}</p>
                </div>
                <div>
                  <p className="text-muted text-xs uppercase tracking-wider font-semibold mb-1">Job ID</p>
                  <p className="font-medium text-foreground">{job.id}</p>
                </div>
                <div>
                  <p className="text-muted text-xs uppercase tracking-wider font-semibold mb-1">Department</p>
                  <p className="font-medium text-foreground">{job.department}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

