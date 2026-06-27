type N8N = {
  webhook: string;
  analyticsWebhook: string;
  inboxWebhook: string;
  connected: boolean;
  version: string;
};

export default function N8NSettings({
  n8n,
}: {
  n8n: N8N;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="text-lg font-semibold">
          n8n Integration
        </h2>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-400">
            Send Email Webhook
          </label>

          <input
            value={n8n.webhook}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-400">
            Analytics Webhook
          </label>

          <input
            value={n8n.analyticsWebhook}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-400">
            Inbox Health Webhook
          </label>

          <input
            value={n8n.inboxWebhook}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Connection Status
          </label>

          <div
            className={`rounded-lg px-4 py-3 font-medium ${
              n8n.connected
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {n8n.connected ? "Connected" : "Disconnected"}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            n8n Version
          </label>

          <input
            value={n8n.version}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

      </div>
    </div>
  );
}