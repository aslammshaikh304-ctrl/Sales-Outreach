"use client";

import { useState } from "react";
import LeadStatusBadge from "./LeadStatusBadge";
import LeadDetailsDrawer from "./LeadDetailsDrawer";
import { sendBulkEmail } from "@/lib/sendBulkEmail";

type Lead = {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  email: string;
  industry: string;
  status: string;
  smtp: string;
  lastActivity: string;
};

type Props = {
  leads?: Lead[];
};

export default function LeadTable({ leads = [] }: Props) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sendingBulk, setSendingBulk] = useState(false);

  const openDrawer = (lead: Lead) => {
    setSelectedLead(lead);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedLead(null);
  };

  const toggleLead = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === leads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(leads.map((lead) => lead.id));
    }
  };
const handleBulkSend = async () => {
  try {
    setSendingBulk(true);

    await sendBulkEmail(selectedIds);

    alert("Emails sent successfully");

    setSelectedIds([]);
  } catch (err) {
    console.error(err);
    alert("Failed to send emails");
  } finally {
    setSendingBulk(false);
  }
};
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">

        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 py-4">
          <h2 className="font-semibold text-white">
            Leads ({leads.length})
          </h2>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400">
                {selectedIds.length} selected
              </span>

              <button
  onClick={handleBulkSend}
  disabled={sendingBulk}
  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
>
  {sendingBulk ? "Sending..." : "Send Selected"}
</button>
            </div>
          )}
        </div>

        <table className="w-full">
          <thead className="border-b border-zinc-800 bg-zinc-950">
            <tr className="text-left text-sm text-zinc-400">
              <th className="px-4 py-4">
                <input
                  type="checkbox"
                  checked={
                    leads.length > 0 &&
                    selectedIds.length === leads.length
                  }
                  onChange={toggleAll}
                  className="h-4 w-4 cursor-pointer accent-emerald-500"
                />
              </th>

              <th className="px-6 py-4">Lead</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Industry</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">SMTP</th>
              <th className="px-6 py-4">Last Activity</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(lead.id)}
                    onChange={() => toggleLead(lead.id)}
                    className="h-4 w-4 cursor-pointer accent-emerald-500"
                  />
                </td>

                <td className="px-6 py-4">
                  <p className="font-medium text-white">
                    {lead.firstName} {lead.lastName}
                  </p>
                </td>

                <td className="px-6 py-4 text-zinc-300">
                  {lead.company}
                </td>

                <td className="px-6 py-4 text-zinc-400">
                  {lead.email}
                </td>

                <td className="px-6 py-4 text-zinc-400">
                  {lead.industry}
                </td>

                <td className="px-6 py-4">
                  <LeadStatusBadge status={lead.status} />
                </td>

                <td className="px-6 py-4 text-zinc-300">
                  {lead.smtp}
                </td>

                <td className="px-6 py-4 text-zinc-400">
                  {lead.lastActivity || "-"}
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => openDrawer(lead)}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {leads.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="py-10 text-center text-zinc-500"
                >
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <LeadDetailsDrawer
        lead={selectedLead}
        open={drawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
}