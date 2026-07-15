import AppLayout from "../../components/layout/AppLayout";
import InboxHealthTable from "../../components/inbox-health/InboxHealthTable";

import { getInboxHealthData } from "@/lib/inboxHealth";

export default async function InboxHealthPage() {
  const smtpHealth = await getInboxHealthData();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-5xl font-bold">
            Inbox Health
          </h1>

          <p className="mt-2 text-zinc-400">
            Monitor SMTP reputation and account health.
          </p>
        </div>

        <InboxHealthTable smtpHealth={smtpHealth} />
      </div>
    </AppLayout>
  );
}