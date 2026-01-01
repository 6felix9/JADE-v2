import { CheckCircle2, AlertCircle } from "lucide-react";

interface QualityFlagProps {
  status: "passed" | "failed";
  message?: string;
}

export default function QualityFlag({ status, message }: QualityFlagProps) {
  const isPassed = status === "passed";
  
  const bgColor = isPassed ? "bg-success/10" : "bg-danger/10";
  const borderColor = isPassed ? "border-success/20" : "border-danger/20";
  const textColor = isPassed ? "text-success" : "text-danger";
  const iconColor = isPassed ? "text-success" : "text-danger";
  const badgeBg = isPassed ? "bg-success/20" : "bg-danger/20";
  const badgeText = isPassed ? "text-success" : "text-danger";
  const Icon = isPassed ? CheckCircle2 : AlertCircle;

  return (
    <div className={`flex items-center justify-between p-3 ${bgColor} border ${borderColor} rounded-lg`}>
      <div className="flex items-center space-x-2.5">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <div>
          <span className={`font-semibold text-sm ${textColor}`}>
            {isPassed ? "Quality Check Passed" : "Quality Check Failed"}
          </span>
          {message && <p className={`text-xs ${textColor}`}>{message}</p>}
        </div>
      </div>
      <div className={`text-[10px] font-bold uppercase tracking-wider ${badgeText} ${badgeBg} px-1.5 py-0.5 rounded`}>
        {isPassed ? "PASSED" : "FAILED"}
      </div>
    </div>
  );
}

