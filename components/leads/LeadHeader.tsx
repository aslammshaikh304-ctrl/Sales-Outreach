"use client";

import { useState } from "react";
import AddLeadDialog from "./AddLeadDialog";
import ImportLeadsDialog from "./ImportLeadsDialog";

export default function LeadHeader() {
  const [open, setOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-5xl font-bold">Leads</h1>

          <p className="mt-2 text-zinc-400">
            Manage all your outreach leads
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setImportOpen(true)} className="rounded-lg border border-zinc-700 px-5 py-3 font-medium text-white hover:bg-zinc-800">Import CSV</button>
          <button onClick={() => setOpen(true)} className="rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-500">+ Add Lead</button>
        </div>
      </div>

      <AddLeadDialog
        open={open}
        onClose={() => setOpen(false)}
      />
      <ImportLeadsDialog open={importOpen} onClose={() => setImportOpen(false)} />
    </>
  );
}