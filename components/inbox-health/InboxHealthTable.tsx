import HealthBadge from "./HealthBadge";

type SMTP = {
  id: string;
  email: string;
  health: string;
  status: string;
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
            <th className="px-6 py-4">Health</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {smtpHealth.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="py-10 text-center text-zinc-500"
              >
                No SMTP accounts found.
              </td>
            </tr>
          ) : (
            smtpHealth.map((smtp) => (
              <tr
                key={smtp.id}
                className="border-b border-zinc-800 last:border-none"
              >
                <td className="px-6 py-5 font-medium text-white">
                  {smtp.email || "-"}
                </td>

                <td className="px-6 py-5">
                  <HealthBadge
                    health={smtp.health || "Healthy"}
                  />
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      smtp.status === "Active"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : smtp.status === "Warning"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-zinc-700 text-zinc-300"
                    }`}
                  >
                    {smtp.status || "-"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}