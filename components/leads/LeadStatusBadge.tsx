type Props = {
  status: string;
};

export default function LeadStatusBadge({ status }: Props) {
  const value = (status || "").toLowerCase();

  let classes =
    "bg-zinc-700/30 text-zinc-300";

  if (value.includes("ready"))
    classes =
      "bg-blue-500/20 text-blue-400";

  else if (value.includes("sent"))
    classes =
      "bg-yellow-500/20 text-yellow-400";

  else if (value.includes("reply"))
    classes =
      "bg-emerald-500/20 text-emerald-400";

  else if (value.includes("meeting"))
    classes =
      "bg-purple-500/20 text-purple-400";

  else if (value.includes("bounce"))
    classes =
      "bg-red-500/20 text-red-400";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${classes}`}
    >
      {status || "Unknown"}
    </span>
  );
}