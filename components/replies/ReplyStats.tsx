type Props = {
  stats: {
    totalReplies: number;
    positiveReplies: number;
    negativeReplies: number;
    meetingBooked: number;
    followups: number;
  };
};

export default function ReplyStats({ stats }: Props) {
  const cards = [
    {
      title: "Total Replies",
      value: stats.totalReplies,
      color: "text-blue-400",
    },
    {
      title: "Positive",
      value: stats.positiveReplies,
      color: "text-emerald-400",
    },
    {
      title: "Negative",
      value: stats.negativeReplies,
      color: "text-red-400",
    },
    {
      title: "Meetings",
      value: stats.meetingBooked,
      color: "text-yellow-400",
    },
    {
      title: "Follow-ups",
      value: stats.followups,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
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