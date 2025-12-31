import { JobData } from "@/types";

interface JobPreviewProps {
  job: JobData;
  title?: string;
}

export default function JobPreview({ job, title = "To be evaluated by AI" }: JobPreviewProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-semibold text-gray-700">
        {title}: {job.job_title}
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 mb-0.5">Job Title</p>
          <p className="font-medium text-gray-900">{job.job_title}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-0.5">Job ID</p>
          <p className="font-medium text-gray-900">{job.id}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-0.5">Department</p>
          <p className="font-medium text-gray-900">{job.department}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-0.5">Manager</p>
          <p className="font-medium text-gray-900">{job.manager_info.name}</p>
        </div>
        <div className="col-span-1 md:col-span-2">
          <p className="text-gray-500 mb-0.5">Job Purpose</p>
          <p className="font-medium text-gray-900 line-clamp-3 leading-relaxed">{job.job_purpose}</p>
        </div>
      </div>
    </div>
  );
}

