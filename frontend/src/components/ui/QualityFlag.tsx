import { CheckCircle2, AlertCircle } from "lucide-react";

interface QualityFlagProps {
  status: "passed" | "failed";
  message?: string;
}

export default function QualityFlag({ status, message }: QualityFlagProps) {
  const isPassed = status === "passed";
  
  const bgColor = isPassed ? "bg-green-50" : "bg-red-50";
  const borderColor = isPassed ? "border-green-100" : "border-red-100";
  const textColor = isPassed ? "text-green-900" : "text-red-900";
  const iconColor = isPassed ? "text-green-600" : "text-red-600";
  const badgeBg = isPassed ? "bg-green-100" : "bg-red-100";
  const badgeText = isPassed ? "text-green-600" : "text-red-600";
  const Icon = isPassed ? CheckCircle2 : AlertCircle;

  return (
    <div className={`flex items-center justify-between p-4 ${bgColor} border ${borderColor} rounded-lg`}>
      <div className="flex items-center space-x-3">
        <Icon className={`w-6 h-6 ${iconColor}`} />
        <div>
          <span className={`font-semibold ${textColor}`}>
            {isPassed ? "Quality Check Passed" : "Quality Check Failed"}
          </span>
          {message && <p className={`text-sm ${isPassed ? "text-green-700" : "text-red-700"}`}>{message}</p>}
        </div>
      </div>
      <div className={`text-xs font-bold uppercase tracking-wider ${badgeText} ${badgeBg} px-2 py-1 rounded`}>
        {isPassed ? "PASSED" : "FAILED"}
      </div>
    </div>
  );
}

