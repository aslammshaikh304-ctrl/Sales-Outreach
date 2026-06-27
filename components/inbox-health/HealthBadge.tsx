type Props = {
  health: string;
};

export default function HealthBadge({ health }: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        health === "Healthy"
          ? "bg-emerald-500/20 text-emerald-400"
          : health === "Warning"
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {health}
    </span>
  );
}