type Props = {
  stats: {
    totalLeads: number;
    emailsSent: number;
    replies: number;
    replyRate: number;
    meetingsBooked: number;
    activeSMTPs: number;
    averageBounce: number;
    healthySMTPs: number;
  };
};

export default function AnalyticsStats({ stats }: Props) {
  const cards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      color: "text-blue-400",
    },
    {
      title: "Emails Sent",
      value: stats.emailsSent,
      color: "text-cyan-400",
    },
    {
      title: "Replies",
      value: stats.replies,
      color: "text-emerald-400",
    },
    {
      title: "Reply Rate",
      value: `${stats.replyRate}%`,
      color: "text-purple-400",
    },
    {
      title: "Meetings",
      value: stats.meetingsBooked,
      color: "text-yellow-400",
    },
    {
      title: "Active SMTPs",
      value: stats.activeSMTPs,
      color: "text-green-400",
    },
    {
      title: "Healthy SMTPs",
      value: stats.healthySMTPs,
      color: "text-emerald-400",
    },
    {
      title: "Average Bounce",
      value: `${stats.averageBounce}%`,
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <p className="text-sm text-zinc-400">{card.title}</p>

          <h2 className={`mt-3 text-4xl font-bold ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}