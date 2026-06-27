type Company = {
  companyName: string;
  website: string;
  timezone: string;
  senderName: string;
  signature: string;
};

export default function GeneralSettings({
  company,
}: {
  company: Company;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="text-lg font-semibold">General Settings</h2>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Company Name
          </label>

          <input
            value={company.companyName}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Website
          </label>

          <input
            value={company.website}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Timezone
          </label>

          <input
            value={company.timezone}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Sender Name
          </label>

          <input
            value={company.senderName}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-400">
            Email Signature
          </label>

          <textarea
            rows={5}
            value={company.signature}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

      </div>
    </div>
  );
}