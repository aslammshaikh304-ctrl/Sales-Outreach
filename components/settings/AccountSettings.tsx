type Account = {
  workspace: string;
  owner: string;
  email: string;
  plan: string;
  status: string;
};

export default function AccountSettings({
  account,
}: {
  account: Account;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="text-lg font-semibold">
          Account
        </h2>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Workspace
          </label>

          <input
            value={account.workspace}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Owner
          </label>

          <input
            value={account.owner}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Email
          </label>

          <input
            value={account.email}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Plan
          </label>

          <input
            value={account.plan}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-400">
            Account Status
          </label>

          <div
            className={`rounded-lg px-4 py-3 font-medium ${
              account.status === "Active"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {account.status}
          </div>
        </div>

      </div>
    </div>
  );
}