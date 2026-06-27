import HealthBadge from "./HealthBadge";

type SMTP = {
  id: string;
  email: string;
  sent: number;
  limit: number;
  bounceRate: number;
  bounceCount: number;
  health: string;
  status: string;
  lastCheck: string;
};

export default function InboxHealthTable({
  smtpHealth,
}: {
  smtpHealth: SMTP[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <table className="w-full">
        <thead className="border-b border-zinc-800">
          <tr className="text-left text-sm text-zinc-400">
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Sent</th>
            <th className="px-6 py-4">Limit</th>
            <th className="px-6 py-4">Bounce %</th>
            <th className="px-6 py-4">Bounce</th>
            <th className="px-6 py-4">Health</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Last Check</th>
          </tr>
        </thead>

        <tbody>
          {smtpHealth.map((smtp) => (
            <tr
              key={smtp.id}
              className="border-b border-zinc-800 last:border-none"
            >
              <td className="px-6 py-5 font-medium">
                {smtp.email}
              </td>

              <td className="px-6 py-5">
                {smtp.sent}
              </td>

              <td className="px-6 py-5">
                {smtp.limit}
              </td>

              <td className="px-6 py-5">
                {smtp.bounceRate}%
              </td>

              <td className="px-6 py-5">
                {smtp.bounceCount}
              </td>

              <td className="px-6 py-5">
                <HealthBadge health={smtp.health} />
              </td>

              <td className="px-6 py-5">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    smtp.status === "Active"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-zinc-700 text-zinc-300"
                  }`}
                >
                  {smtp.status}
                </span>
              </td>

              <td className="px-6 py-5">
                {smtp.lastCheck
                  ? new Date(smtp.lastCheck).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}