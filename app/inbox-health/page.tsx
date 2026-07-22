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

        {/* SMTP Table */}
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
          <table className="w-full">
            <thead className="border-b border-zinc-800 bg-zinc-950">
              <tr className="text-left text-sm text-zinc-400">
                <th className="p-4">SMTP</th>
                <th>Email</th>
                <th>Daily</th>
                <th>Sent</th>
                <th>Remaining</th>
                <th>Usage</th>
                <th>Bounce</th>
                <th>Health</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.smtps.map((smtp: any) => {
                const percent =
                  smtp.dailyLimit > 0
                    ? Math.round(
                        (smtp.dailySent / smtp.dailyLimit) * 100
                      )
                    : 0;

                return (
                  <tr
                    key={smtp.email}
                    className="border-b border-zinc-800"
                  >
                    <td className="p-4 font-medium">
                      {smtp.name}
                    </td>

                    <td>{smtp.email}</td>

                    <td>{smtp.dailyLimit}</td>

                    <td>{smtp.dailySent}</td>

                    <td>{smtp.remaining}</td>

                    <td className="w-64">
                      <div className="mr-4">
                        <div className="h-2 overflow-hidden rounded-full bg-zinc-700">
                          <div
                            className={`h-full ${
                              percent >= 80
                                ? "bg-red-500"
                                : percent >= 60
                                ? "bg-yellow-500"
                                : "bg-emerald-500"
                            }`}
                            style={{
                              width: `${percent}%`,
                            }}
                          />
                        </div>

                        <p className="mt-1 text-xs text-zinc-400">
                          {smtp.dailySent}/{smtp.dailyLimit} ({percent}%)
                        </p>
                      </div>
                    </td>

                    <td>{smtp.bounceCount}</td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          smtp.health === "Healthy"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : smtp.health === "Warning"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {smtp.health}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          smtp.status === "Active"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {smtp.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* AI Recommendation */}
        <RecommendationCard stats={data.stats} />
      </div>
    </AppLayout>
  );
}