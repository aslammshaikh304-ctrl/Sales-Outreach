import AppLayout from "../../components/layout/AppLayout";

import AnalyticsStats from "../../components/analytics/AnalyticsStats";
import AnalyticsCharts from "../../components/analytics/AnalyticsCharts";
import AnalyticsTable from "../../components/analytics/AnalyticsTable";
import AIInsights from "../../components/analytics/AIInsights";

import { getAnalyticsData } from "@/lib/analytics";

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <AppLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-5xl font-bold">Analytics</h1>

          <p className="mt-2 text-zinc-400">
            Monitor outreach performance across your campaigns.
          </p>
        </div>

        <AnalyticsStats stats={data.stats} />

<AnalyticsCharts charts={data.charts} />

<AIInsights stats={data.stats} />

<AnalyticsTable leads={data.leads} />

      </div>
    </AppLayout>
  );
}