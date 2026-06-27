type Props = {
  stats: {
    healthy: number;
    warning: number;
    critical: number;
    totalSent: number;
    totalBounce: number;
    avgBounce: number;
    nearLimit: number;
  };
};

export default function InboxHealthStats({ stats }: Props) {
  const cards = [
    {
      title: "Healthy SMTPs",
      value: stats.healthy,
      color: "text-emerald-400",
    },
    {
      title: "Critical",
      value: stats.critical,
      color: "text-red-400",
    },
    {
      title: "Average Bounce",
      value: `${stats.avgBounce}%`,
      color: "text-yellow-400",
    },
    {
      title: "Emails Sent",
      value: stats.totalSent,
      color: "text-blue-400",
    },
    {
      title: "Near Limit",
      value: stats.nearLimit,
      color: "text-orange-400",
    },
    {
      title: "Bounce Count",
      value: stats.totalBounce,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <p className="text-sm text-zinc-400">{card.title}</p>

          <h2 className={`mt-4 text-4xl font-bold ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}