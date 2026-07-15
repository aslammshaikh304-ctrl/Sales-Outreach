import AppLayout from "../../components/layout/AppLayout";

import InboxHealthStats from "../../components/inbox-health/InboxHealthStats";
import RecommendationCard from "../../components/inbox-health/RecommendationCard";

import { getInboxHealthData } from "@/lib/inboxHealth";

export default async function InboxHealthPage() {
  const data = await getInboxHealthData();

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold">
            Inbox Health
          </h1>

          <p className="mt-2 text-zinc-400">
            Monitor SMTP reputation, bounce rates and sending health.
          </p>
        </div>

        {/* Stats */}
        <InboxHealthStats stats={data.stats} />

        {/* AI Recommendation */}
        <RecommendationCard stats={data.stats} />

        {/* SMTP Table removed intentionally */}
      </div>
    </AppLayout>
  );
}