"use client";

import { useState } from "react";

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

type Props = {
  smtp: SMTP | null;
  open: boolean;
  onClose: () => void;
};

export default function SMTPDetailsDrawer({
  smtp,
  open,
  onClose,
}: Props) {
  const [saving, setSaving] = useState(false);

  if (!smtp) return null;

  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await fetch(
        "/api/smtp/edit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(smtp),
        }
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      alert("SMTP updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update SMTP");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-[500px] border-l border-zinc-800 bg-zinc-900 transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="border-b border-zinc-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                SMTP Account
              </h2>

              <p className="mt-2 text-zinc-400">
                {smtp.email}
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg bg-zinc-800 px-3 py-2 hover:bg-zinc-700"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <Info
            label="SMTP Name"
            value={smtp.name}
          />

          <Info
            label="Email"
            value={smtp.email}
          />

          <Info
            label="Daily Sent"
            value={String(smtp.dailySent)}
          />

          <Info
            label="Daily Limit"
            value={String(smtp.dailyLimit)}
          />

          <Info
            label="Bounce Rate"
            value={`${smtp.bounceRate}%`}
          />

          <Info
            label="Bounce Count"
            value={String(smtp.bounceCount)}
          />
                    <Info
            label="Health"
            value={smtp.health}
          />

          <Info
            label="Status"
            value={smtp.status}
          />

          <Info
            label="Last Check"
            value={
              smtp.lastCheck
                ? new Date(
                    smtp.lastCheck
                  ).toLocaleString()
                : "-"
            }
          />

          <div className="grid grid-cols-2 gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              onClick={() =>
                alert(
                  "SMTP Test will be implemented next."
                )
              }
              className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-500"
            >
              Test SMTP
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-200">
        {value && value !== ""
          ? value
          : "-"}
      </div>
    </div>
  );
}