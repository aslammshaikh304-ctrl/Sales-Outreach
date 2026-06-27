type Props = {
  stats: any;
};

export default function AIInsights({ stats }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-xl font-semibold">
        AI Insights
      </h2>

      <ul className="space-y-2 text-zinc-300">
        <li>
          • Reply rate is <strong>{stats.replyRate}%</strong>.
        </li>

        <li>
          • {stats.healthySMTPs} SMTP accounts are healthy.
        </li>

        <li>
          • Average bounce rate is {stats.averageBounce}%.
        </li>
      </ul>
    </div>
  );
}