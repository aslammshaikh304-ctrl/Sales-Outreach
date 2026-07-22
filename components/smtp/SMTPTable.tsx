"use client";

import { useState } from "react";
import SMTPDetailsDrawer from "./SMTPDetailsDrawer";

type SMTP = {
  id: string;
  name: string;
  email: string;
  dailyLimit: number;
  dailySent: number;
  bounceRate: number;
  bounceCount: number;
  health: string;
  status: string;
  lastCheck: string;
};

export default function SMTPTable({
  smtpAccounts,
}: {
  smtpAccounts: SMTP[];
}) {
  const [selectedSMTP, setSelectedSMTP] =
    useState<SMTP | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const openDrawer = (smtp: SMTP) => {
    setSelectedSMTP(smtp);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedSMTP(null);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900">
        <table className="min-w-[900px] w-full">
          <thead className="border-b border-zinc-800">
            <tr className="text-left text-sm text-zinc-400">
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Sent</th>
              <th className="px-6 py-4">Limit</th>
              <th className="px-6 py-4">Bounce %</th>
              <th className="px-6 py-4">Health</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Check</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {smtpAccounts.map((smtp) => (
              <tr
                key={smtp.id}
                className="border-b border-zinc-800 last:border-none"
              >
                <td className="px-6 py-5 font-medium">
                  {smtp.email}
                </td>

                <td className="px-6 py-5">
                  {smtp.dailySent}
                </td>

                <td className="px-6 py-5">
                  {smtp.dailyLimit}
                </td>

                <td className="px-6 py-5">
                  {smtp.bounceRate}%
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      smtp.health === "Healthy"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : smtp.health === "Warning"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {smtp.health}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      smtp.status === "Active"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-zinc-700 text-zinc-300"
                    }`}
                  >
                    {smtp.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  {smtp.lastCheck
                    ? new Date(smtp.lastCheck).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-5">
                  <button
                    onClick={() => openDrawer(smtp)}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SMTPDetailsDrawer
        smtp={selectedSMTP}
        open={drawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
}