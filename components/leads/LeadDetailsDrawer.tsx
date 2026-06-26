"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LeadStatusBadge from "./LeadStatusBadge";
import { sendEmail } from "@/lib/sendEmail";

type Lead = {
  id: number;
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
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
};

export default function LeadDetailsDrawer({
  lead,
  open,
  onClose,
}: Props) {const router = useRouter();

const [sending, setSending] = useState(false);
const handleSendEmail = async () => {
  if (!lead) return;

  try {
    setSending(true);

    await sendEmail(lead.id);

    alert("Email sent successfully");

    router.refresh();
  } catch (error) {
    console.error(error);
    alert("Failed to send email");
  } finally {
    setSending(false);
  }
};
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-[520px] border-l border-zinc-800 bg-zinc-900 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {lead && (
          <>
            {/* Header */}
            <div className="border-b border-zinc-800 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {lead.firstName} {lead.lastName}
                  </h2>

                  <p className="mt-1 text-zinc-400">
                    {lead.company}
                  </p>

                  <div className="mt-4">
                    <LeadStatusBadge status={lead.status} />
                  </div>
                </div>

                <div className="flex gap-2">
  <button
    onClick={handleSendEmail}
    disabled={sending}
    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
  >
    {sending ? "Sending..." : "Send Email"}
  </button>

  <button
    onClick={onClose}
    className="rounded-lg bg-zinc-800 px-3 py-2 text-white hover:bg-zinc-700"
  >
    ✕
  </button>
</div>
                
              </div>
            </div>

            {/* Content */}
            <div className="h-[calc(100vh-120px)] space-y-8 overflow-y-auto p-6">

              {/* Company */}
              <section>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Company Information
                </h3>

                <div className="space-y-4">
                  <Info label="Company" value={lead.company} />
                  <Info label="Website" value={lead.website} />
                  <Info label="Email" value={lead.email} />
                  <Info label="Industry" value={lead.industry} />
                  <Info label="Services" value={lead.services} multiline />
                </div>
              </section>

              {/* AI Research */}
              <section>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  AI Research
                </h3>

                <div className="space-y-4">
                  <Info
                    label="Research Summary"
                    value={lead.researchSummary}
                    multiline
                  />

                  <Info
                    label="Personalization Hook"
                    value={lead.personalizationHook}
                    multiline
                  />
                </div>
              </section>

              {/* Generated Email */}
              <section>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Generated Email
                </h3>

                <Info
                  label="Subject"
                  value={lead.generatedSubject}
                />

                <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <pre className="whitespace-pre-wrap text-sm text-zinc-300">
                    {lead.generatedEmail || "No email generated"}
                  </pre>
                </div>
              </section>

              {/* Outreach */}
              <section>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Outreach
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <Info label="SMTP" value={lead.smtp} />
                  <Info label="Sent Date" value={lead.sentDate} />
                  <Info label="Reply Status" value={lead.replyStatus} />
                  <Info label="Follow Ups" value={String(lead.followupCount)} />
                  <Info label="Sequence" value={lead.sequenceStatus} />
                  <Info label="Status" value={lead.status} />
                </div>
              </section>
              

              {/* Deliverability */}
              <section>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Deliverability
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <Info
                    label="Suppression"
                    value={lead.suppressionStatus}
                  />

                  <Info
                    label="Reason"
                    value={lead.suppressionReason}
                  />

                  <Info
                    label="Bounce"
                    value={lead.bounceStatus}
                  />

                  <Info
                    label="Bounce Type"
                    value={lead.bounceType}
                  />
                </div>
              </section>

              {/* Activity */}
              <section>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Activity
                </h3>

                <div className="space-y-4">
                  <Info
                    label="Last Activity"
                    value={lead.lastActivity}
                  />

                  <Info
                    label="Activity Type"
                    value={lead.activityType}
                  />

                  <Info
                    label="Reply Date"
                    value={lead.replyDate}
                  />
                </div>
              </section>

            </div>
          </>
        )}
      </div>
    </>
  );
}

function Info({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value?: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <div
        className={`rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-200 ${
          multiline ? "whitespace-pre-wrap" : ""
        }`}
      >
        {value && value.trim() !== "" ? value : "-"}
      </div>
    </div>
  );
}