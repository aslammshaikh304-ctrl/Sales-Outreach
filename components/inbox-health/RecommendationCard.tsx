type Props = {
  stats: {
    critical: number;
    warning: number;
    avgBounce: number;
    nearLimit: number;
  };
};

export default function RecommendationCard({ stats }: Props) {
  const recommendations: string[] = [];

  if (stats.critical > 0) {
    recommendations.push(
      `${stats.critical} SMTP account(s) are in Critical health. Pause sending immediately.`
    );
  }

  if (stats.warning > 0) {
    recommendations.push(
      `${stats.warning} SMTP account(s) need attention. Monitor closely.`
    );
  }

  if (Number(stats.avgBounce) > 5) {
    recommendations.push(
      `Average bounce rate is ${stats.avgBounce}%. Clean your lead list.`
    );
  }

  if (stats.nearLimit > 0) {
    recommendations.push(
      `${stats.nearLimit} SMTP account(s) are close to their daily sending limit.`
    );
  }

  if (recommendations.length === 0) {
    recommendations.push("All SMTP accounts are healthy.");
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-lg font-semibold">
        AI Recommendations
      </h2>

      <ul className="space-y-3 text-sm text-zinc-300">
        {recommendations.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}