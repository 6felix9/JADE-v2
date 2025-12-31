import Header from "@/components/Header";
import DashboardButton from "@/components/ui/DashboardButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-4xl space-y-6">
          {/* Top Rows - 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardButton title="Evaluate a Job" />
            <DashboardButton title="Evaluate Multiple Jobs" />
            <DashboardButton title="Organizational Analysis" />
            <DashboardButton title="Validation & Reporting" />
          </div>

          {/* Bottom Row - 1x3 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardButton
              title="Org Setup"
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
