type Account = {
  smtp: string;
  status: string;
};

type Props = {
  accounts: Account[];
};

export default function SMTPHealthCard({ accounts }: Props) {
  const healthyCount = accounts.filter(
    (a) => a.status.toLowerCase() === "healthy"
  ).length;

  const successRate =
    accounts.length === 0
      ? 0
      : ((healthyCount / accounts.length) * 100).toFixed(1);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-lg font-semibold">
        SMTP Health
      </h2>

      <div className="space-y-4">
        {accounts.map((account, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-zinc-800 p-3"
          >
            <div>
              <p className="font-medium text-white">
                {account.smtp || "Unknown SMTP"}
              </p>

              <p className="text-xs text-zinc-500">
                Mailbox
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                account.status.toLowerCase() === "healthy"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {account.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-zinc-800 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            Healthy Accounts
          </span>

          <span className="font-semibold text-white">
            {healthyCount} / {accounts.length}
          </span>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-zinc-400">
              Success Rate
            </span>

            <span className="font-bold text-emerald-400">
              {successRate}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${successRate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}