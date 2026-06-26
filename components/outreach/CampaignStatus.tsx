export default function CampaignStatus() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Campaign Status
      </h2>

      <div className="flex items-center gap-3">
        <div className="h-4 w-4 rounded-full bg-emerald-500 animate-pulse" />

        <div>
          <p className="font-semibold text-white">
            Running
          </p>

          <p className="text-sm text-zinc-400">
            Campaign is actively sending emails
          </p>
        </div>
      </div>
    </div>
  );
}