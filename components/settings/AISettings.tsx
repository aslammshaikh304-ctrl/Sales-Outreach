type AI = {
  provider: string;
  model: string;
  temperature: number;
  maxTokens: number;
};

export default function AISettings({
  ai,
}: {
  ai: AI;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="text-lg font-semibold">AI Settings</h2>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Provider
          </label>

          <input
            value={ai.provider}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Model
          </label>

          <input
            value={ai.model}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Temperature
          </label>

          <input
            value={ai.temperature}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Max Tokens
          </label>

          <input
            value={ai.maxTokens}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

      </div>
    </div>
  );
}