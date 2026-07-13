import AppLayout from "../../components/layout/AppLayout";
import CampaignStatus from "../../components/outreach/CampaignStatus";
import ProgressCard from "../../components/outreach/ProgressCard";
import SMTPUsageCard from "../../components/outreach/SMTPUsageCard";

import { getOutreachData } from "@/lib/outreach";

export default async function OutreachPage() {
  const data = await getOutreachData();
  console.log(data.smtpUsage);
  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold">Outreach</h1>
          <p className="mt-2 text-zinc-400">
            Monitor campaigns and email delivery
          </p>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CampaignStatus />
          <ProgressCard
  sent={data.emailsSentToday}
  limit={data.dailyLimit}
/>
          <div className="mt-6">
  <SMTPUsageCard smtpUsage={data.smtpUsage} />
</div>
        </div>

      </div>
    </AppLayout>
  );
}