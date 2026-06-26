type Props = {
  sent: number;
  limit: number;
};

export default function ProgressCard({
  sent,
  limit,
}: Props) {
  const percentage = limit > 0 ? (sent / limit) * 100 : 0;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Today's Progress
      </h2>

      <div className="mb-4 flex items-end justify-between">
        <div className="text-5xl font-bold">
          {sent}
          <span className="text-2xl text-zinc-500">
            {" "}/ {limit}
          </span>
        </div>

        <div className="font-semibold text-emerald-400">
          {Math.round(percentage)}%
        </div>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-zinc-500">
        Emails sent today
      </p>
    </div>
  );
}