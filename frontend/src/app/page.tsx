"use client";

import Header from "@/components/Header";
import DashboardButton from "@/components/ui/DashboardButton";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-surface flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-4xl space-y-6">
          {/* Top Rows - 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardButton 
              title="Evaluate a Job" 
              onClick={() => router.push("/evaluate-job")}
            />
            <DashboardButton 
              title="Evaluate Multiple Jobs" 
              onClick={() => router.push("/evaluate-multiple-jobs")}
            />
            <DashboardButton title="Organizational Analysis" />
            <DashboardButton title="Validation & Reporting" />
          </div>

          {/* Bottom Row - 1x3 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardButton
              title="Org Setup"
              onClick={() => router.push("/org-setup")}
            />
            <DashboardButton
              title="Human Evaluations"
            />
            <DashboardButton
              title="Library"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
