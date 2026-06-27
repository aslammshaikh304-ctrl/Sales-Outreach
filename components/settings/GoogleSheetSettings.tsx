type Sheets = {
  spreadsheetId: string;
  leadSheet: string;
  smtpSheet: string;
  replySheet: string;
};

export default function GoogleSheetSettings({
  sheets,
}: {
  sheets: Sheets;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="text-lg font-semibold">
          Google Sheets
        </h2>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-400">
            Spreadsheet ID
          </label>

          <input
            value={sheets.spreadsheetId}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Lead Sheet
          </label>

          <input
            value={sheets.leadSheet}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            SMTP Sheet
          </label>

          <input
            value={sheets.smtpSheet}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-400">
            Reply Sheet
          </label>

          <input
            value={sheets.replySheet}
            readOnly
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3"
          />
        </div>

      </div>
    </div>
  );
}