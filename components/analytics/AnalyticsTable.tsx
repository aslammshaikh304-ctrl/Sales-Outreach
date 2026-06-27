type Props = {
  leads: any[];
};

export default function AnalyticsTable({ leads }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Recent Leads
      </h2>

      <p className="text-zinc-500">
        Analytics table coming next...
      </p>
    </div>
  );
}