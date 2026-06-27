type SMTP = {
  host: string;
  port: number;
  encryption: string;
  username: string;
  activeSMTPs: number;
};

export default function SMTPSettings({
  smtp,
}: {
  smtp: SMTP;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="text-lg font-semibold">SMTP Settings</h2>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            SMTP Host
          </label>

          <input
            value={smtp.host}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Port
          </label>

          <input
            value={smtp.port}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Username
          </label>

          <input
            value={smtp.username}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Encryption
          </label>

          <input
            value={smtp.encryption}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-400">
            Active SMTP Accounts
          </label>

          <input
            value={smtp.activeSMTPs}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

      </div>
    </div>
  );
}