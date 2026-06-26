type SMTP = {
  name: string;
  sent: number;
  limit: number;
};

export default function SMTPUsageCard({
  smtpUsage,
}: {
  smtpUsage: SMTP[];
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-lg font-semibold">
        SMTP Usage
      </h2>

      <div className="space-y-5">
        {smtpUsage.map((smtp) => {
          const percentage = (smtp.sent / smtp.limit) * 100;

          return (
            <div key={smtp.name}>
              <div className="mb-2 flex justify-between">
                <span className="font-medium text-white">
                  {smtp.name}
                </span>

                <span className="text-zinc-400">
                  {smtp.sent}/{smtp.limit}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className={`h-full rounded-full ${
                    percentage >= 100
                      ? "bg-red-500"
                      : percentage >= 80
                      ? "bg-yellow-500"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}