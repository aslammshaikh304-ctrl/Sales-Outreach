type Sending = {
  dailyLimit: number;
  sendingStart: string;
  sendingEnd: string;
  timezone: string;
  weekdaysOnly: boolean;
};

export default function SendingSettings({
  sending,
}: {
  sending: Sending;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="text-lg font-semibold">
          Sending Settings
        </h2>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Daily Limit
          </label>

          <input
            value={sending.dailyLimit}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Timezone
          </label>

          <input
            value={sending.timezone}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Sending Starts
          </label>

          <input
            value={sending.sendingStart}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Sending Ends
          </label>

          <input
            value={sending.sendingEnd}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-400">
            Weekdays Only
          </label>

          <div
            className={`rounded-lg px-4 py-3 font-medium ${
              sending.weekdaysOnly
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {sending.weekdaysOnly ? "Enabled" : "Disabled"}
          </div>
        </div>

      </div>
    </div>
  );
}