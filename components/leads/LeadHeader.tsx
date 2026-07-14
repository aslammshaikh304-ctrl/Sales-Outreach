"use client";

import { useState } from "react";
import AddLeadDialog from "./AddLeadDialog";

export default function LeadHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold">Leads</h1>

          <p className="mt-2 text-zinc-400">
            Manage all your outreach leads
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-500"
        >
          + Add Lead
        </button>
      </div>

      <AddLeadDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}