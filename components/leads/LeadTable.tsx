"use client";

import { useState } from "react";
import LeadStatusBadge from "./LeadStatusBadge";
import LeadDetailsDrawer from "./LeadDetailsDrawer";
import { sendBulkEmail } from "@/lib/sendBulkEmail";

type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  email: string;
  industry: string;
  services: string;
  researchSummary: string;
  personalizationHook: string;
  generatedSubject: string;
  generatedEmail: string;
  smtp: string;
  sentDate: string;
  followupCount: number;
  replyStatus: string;
  lastActivity: string;
  activityType: string;
  replyDate: string;
  sequenceStatus: string;
  suppressionStatus: string;
  suppressionReason: string;
  bounceStatus: string;
  bounceType: string;
  status: string;
};

type Props = {
  leads?: Lead[];
};

export default function LeadTable({ leads = [] }: Props) {
  const [selectedids, setSelectedids] =
    useState<Lead | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedIds, setSelectedIds] =
    useState<string[]>([]);

  const [sendingBulk, setSendingBulk] = useState(false);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleLeads = normalizedQuery
    ? leads.filter((lead) => [lead.firstName, lead.lastName, lead.company, lead.email, lead.industry].some((value) => value?.toLowerCase().includes(normalizedQuery)))
    : leads;

  const openDrawer = (lead: Lead) => {
    console.log("OPENING LEAD:", lead);
    console.log("LEAD ID:", lead.id);

    setSelectedids(lead);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedids(null);
  };

  const toggleLead = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (visibleLeads.length > 0 && visibleLeads.every((lead) => selectedIds.includes(String(lead.id)))) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        visibleLeads.map((lead) => String(lead.id))
      );
    }
  };

  const handleBulkSend = async () => {
    try {
      setSendingBulk(true);

      const result = await sendBulkEmail(selectedIds);
      setSelectedIds(result.failedIds);
      alert(result.failedIds.length ? `${result.count} sent; ${result.failedIds.length} failed and remain selected.` : "Emails sent successfully");
    } catch (err) {
      console.error(err);

      alert("Failed to send emails");
    } finally {
      setSendingBulk(false);
    }
  };

  return (
    <>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search leads..."
        aria-label="Search leads"
        className="mb-4 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none"
      />
      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 py-4">
          <h2 className="font-semibold text-white">
            Leads ({visibleLeads.length})
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
                {sendingBulk
                  ? "Sending..."
                  : "Send Selected"}
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
                    visibleLeads.length > 0 &&
                    visibleLeads.every((lead) => selectedIds.includes(String(lead.id)))
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
              <th className="px-6 py-4 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {visibleLeads.map((lead) => {
              const leadId = String(lead.id);

              return (
                <tr
                  key={leadId}
                  className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(leadId)}
                      onChange={() => toggleLead(leadId)}
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
                    {lead.email || "-"}
                  </td>

                  <td className="px-6 py-4 text-zinc-400">
                    {lead.industry || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <LeadStatusBadge
                      status={lead.status}
                    />
                  </td>

                  <td className="px-6 py-4 text-zinc-300">
                    {lead.smtp || "-"}
                  </td>

                  <td className="px-6 py-4 text-zinc-400">
                    {lead.lastActivity || "-"}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        openDrawer({
                          ...lead,
                          id: leadId,
                        })
                      }
                      className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}

            {visibleLeads.length === 0 && (
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
        key={selectedids?.id ?? "none"}
        lead={selectedids}
        open={drawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
}