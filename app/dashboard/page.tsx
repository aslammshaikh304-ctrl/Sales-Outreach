import AppLayout from "../../components/layout/AppLayout";
import StatCard from "../../components/dashboard/StatCard";
import LeadChart from "../../components/charts/LeadChart";
import SMTPHealthCard from "../../components/dashboard/SMTPHealthCard";
import ActivityTable from "../../components/dashboard/ActivityTable";

import { getDashboardData } from "../../lib/dashboard";

export default async function Home() {
  const data = await getDashboardData();

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold">Dashboard</h1>
          <p className="mt-2 text-zinc-400">
            Welcome back 👋
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Leads"
            value={String(data.stats.totalLeads)}
            color="text-white"
          />

          <StatCard
            title="Emails Sent"
            value={String(data.stats.emailsSent)}
            color="text-blue-400"
          />

          <StatCard
            title="Reply Rate"
            value={`${data.stats.replyRate}%`}
            color="text-emerald-400"
          />

          <StatCard
            title="Meetings"
            value={String(data.stats.meetings)}
            color="text-orange-400"
          />
        </div>

        {/* Chart + SMTP */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <LeadChart data={data.chart} />
          </div>

          <SMTPHealthCard accounts={data.smtpAccounts} />
        </div>

        {/* Activity */}
        <ActivityTable activities={data.recentActivity} />
      </div>
    </AppLayout>
  );
}