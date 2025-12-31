import { JobData } from "@/types";

interface JobPreviewProps {
  job: JobData;
  title?: string;
}

export default function JobPreview({ job, title = "To be evaluated by AI" }: JobPreviewProps) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="bg-surface px-4 py-2 border-b border-border font-semibold text-foreground">
        {title}: {job.job_title}
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted mb-0.5">Job Title</p>
          <p className="font-medium text-foreground">{job.job_title}</p>
        </div>
        <div>
          <p className="text-muted mb-0.5">Job ID</p>
          <p className="font-medium text-foreground">{job.id}</p>
        </div>
        <div>
          <p className="text-muted mb-0.5">Department</p>
          <p className="font-medium text-foreground">{job.department}</p>
        </div>
        <div>
          <p className="text-muted mb-0.5">Manager</p>
          <p className="font-medium text-foreground">{job.manager_info.name}</p>
        </div>
        <div className="col-span-1 md:col-span-2">
          <p className="text-muted mb-0.5">Job Purpose</p>
          <p className="font-medium text-foreground line-clamp-3 leading-relaxed">{job.job_purpose}</p>
        </div>
      </div>
    </div>
  );
}

