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
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200 hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <div className="flex items-center space-x-3">
          <FileText className="w-5 h-5 text-gray-500" />
          <span className="font-semibold text-gray-700">
            {jobs.length} {title}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          {jobs.map((job, index) => (
            <div key={job.id || index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Job Title</p>
                  <p className="font-medium text-gray-900">{job.job_title}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Job ID</p>
                  <p className="font-medium text-gray-900">{job.id}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">Department</p>
                  <p className="font-medium text-gray-900">{job.department}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

