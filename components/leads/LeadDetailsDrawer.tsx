"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LeadStatusBadge from "./LeadStatusBadge";
import { sendEmail } from "@/lib/sendEmail";
import { deleteLead } from "@/lib/deleteLead";

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
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
};

export default function LeadDetailsDrawer({
  lead,
  open,
  onClose,
}: Props) {
  const router = useRouter();

  const [sending, setSending] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState<Lead | null>(lead);

  useEffect(() => {
    setFormData(lead);
    setEditing(false);
  }, [lead]);

  const updateField = (
    field: keyof Lead,
    value: string | number
  ) => {
    if (!formData) return;

    setFormData((current) => {
      if (!current) return current;

      return {
        ...current,
        [field]: value,
      };
    });
  };

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

  const handleDeleteLead = async () => {
  if (!lead) return;

  const confirmed = confirm(
    `Delete ${lead.firstName}? This cannot be undone.`
  );

  if (!confirmed) return;

  try {
    await deleteLead(lead.firstName);

    alert("Lead deleted successfully");

    onClose();
    router.refresh();
  } catch (error) {
    console.error(error);
    alert("Failed to delete lead");
  }
};

  const handleSave = async () => {
    if (!formData) return;

    try {
      setSaving(true);

      console.log("Updating Lead ID:", formData.id);
      console.log("Updating Lead:", formData);

      const response = await fetch(
        "https://dashboard.tryringflow.com/webhook/edit-lead",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id: String(formData.id),

            firstName: formData.firstName,
            lastName: formData.lastName,

            company: formData.company,
            website: formData.website,
            email: formData.email,

            industry: formData.industry,
            services: formData.services,

            researchSummary: formData.researchSummary,
            personalizationHook: formData.personalizationHook,

            generatedSubject: formData.generatedSubject,
            generatedEmail: formData.generatedEmail,

            smtp: formData.smtp,
            sentDate: formData.sentDate,

            followupCount: formData.followupCount,

            replyStatus: formData.replyStatus,

            lastActivity: formData.lastActivity,
            activityType: formData.activityType,

            replyDate: formData.replyDate,

            sequenceStatus: formData.sequenceStatus,

            suppressionStatus: formData.suppressionStatus,
            suppressionReason: formData.suppressionReason,

            bounceStatus: formData.bounceStatus,
            bounceType: formData.bounceType,

            status: formData.status,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error("Update error:", errorText);

        throw new Error("Failed to update lead");
      }

      alert("Lead updated successfully");

      setEditing(false);

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Failed to update lead");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!lead) return;

    const confirmed = window.confirm(
      `Delete ${lead.firstName} ${lead.lastName}?`
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      console.log("Deleting Lead ID:", lead.id);

      const response = await fetch(
        "https://dashboard.tryringflow.com/webhook/delete-lead",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id: String(lead.id),
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error("Delete error:", errorText);

        throw new Error("Failed to delete lead");
      }

      alert("Lead deleted successfully");

      onClose();

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Failed to delete lead");
    } finally {
      setDeleting(false);
    }
  };

  if (!formData) {
    return null;
  }

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-[520px] border-l border-zinc-800 bg-zinc-900 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="border-b border-zinc-800 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {formData.firstName} {formData.lastName}
              </h2>

              <p className="mt-1 text-zinc-400">
                {formData.company}
              </p>

              <p className="mt-2 text-xs text-zinc-500">
                Lead ID: {formData.id}
              </p>

              <div className="mt-4">
                <LeadStatusBadge status={formData.status} />
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              {!editing && (
                <>
                  <button
                    onClick={handleSendEmail}
                    disabled={sending}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
                  >
                    {sending ? "Sending..." : "Send Email"}
                  </button>

                  <button
  onClick={handleDeleteLead}
  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
>
  Delete
</button>

                  <button
                    onClick={() => setEditing(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </>
              )}

              {editing && (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    onClick={() => {
                      setFormData(lead);
                      setEditing(false);
                    }}
                    className="rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-600"
                  >
                    Cancel
                  </button>
                </>
              )}

              <button
                onClick={onClose}
                className="rounded-lg bg-zinc-800 px-3 py-2 text-white hover:bg-zinc-700"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div className="h-[calc(100vh-120px)] space-y-8 overflow-y-auto p-6">
          <section>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Company Information
            </h3>

            <div className="space-y-4">
              <EditableInfo
                label="Company"
                value={formData.company}
                editing={editing}
                onChange={(value) =>
                  updateField("company", value)
                }
              />

              <EditableInfo
                label="Website"
                value={formData.website}
                editing={editing}
                onChange={(value) =>
                  updateField("website", value)
                }
              />
              <EditableInfo
                label="Email"
                value={formData.email}
                editing={editing}
                onChange={(value) =>
                  updateField("email", value)
                }
              />

              <EditableInfo
                label="Industry"
                value={formData.industry}
                editing={editing}
                multiline
                onChange={(value) =>
                  updateField("industry", value)
                }
              />

              <EditableInfo
                label="Services"
                value={formData.services}
                editing={editing}
                multiline
                onChange={(value) =>
                  updateField("services", value)
                }
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-lg font-semibold text-white">
              AI Research
            </h3>

            <div className="space-y-4">
              <EditableInfo
                label="Research Summary"
                value={formData.researchSummary}
                editing={editing}
                multiline
                onChange={(value) =>
                  updateField("researchSummary", value)
                }
              />

              <EditableInfo
                label="Personalization Hook"
                value={formData.personalizationHook}
                editing={editing}
                multiline
                onChange={(value) =>
                  updateField("personalizationHook", value)
                }
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Generated Email
            </h3>

            <EditableInfo
              label="Subject"
              value={formData.generatedSubject}
              editing={editing}
              onChange={(value) =>
                updateField("generatedSubject", value)
              }
            />

            <div className="mt-4">
              <EditableInfo
                label="Email Body"
                value={formData.generatedEmail}
                editing={editing}
                multiline
                onChange={(value) =>
                  updateField("generatedEmail", value)
                }
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Outreach
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <Info label="SMTP" value={formData.smtp} />

              <Info
                label="Sent Date"
                value={formData.sentDate}
              />

              <Info
                label="Reply Status"
                value={formData.replyStatus}
              />

              <Info
                label="Follow Ups"
                value={String(formData.followupCount)}
              />

              <Info
                label="Sequence"
                value={formData.sequenceStatus}
              />

              <Info
                label="Status"
                value={formData.status}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Deliverability
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <Info
                label="Suppression"
                value={formData.suppressionStatus}
              />

              <Info
                label="Reason"
                value={formData.suppressionReason}
              />

              <Info
                label="Bounce"
                value={formData.bounceStatus}
              />

              <Info
                label="Bounce Type"
                value={formData.bounceType}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Activity
            </h3>

            <div className="space-y-4">
              <Info
                label="Last Activity"
                value={formData.lastActivity}
              />

              <Info
                label="Activity Type"
                value={formData.activityType}
              />

              <Info
                label="Reply Date"
                value={formData.replyDate}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function EditableInfo({
  label,
  value,
  editing,
  multiline = false,
  onChange,
}: {
  label: string;
  value?: string;
  editing: boolean;
  multiline?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      {editing ? (
        multiline ? (
          <textarea
            value={value || ""}
            onChange={(event) =>
              onChange(event.target.value)
            }
            rows={5}
            className="w-full resize-y rounded-xl border border-emerald-600 bg-zinc-950 p-3 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-600/30"
          />
        ) : (
          <input
            value={value || ""}
            onChange={(event) =>
              onChange(event.target.value)
            }
            className="w-full rounded-xl border border-emerald-600 bg-zinc-950 p-3 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-600/30"
          />
        )
      ) : (
        <div
          className={`rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-200 ${
            multiline ? "whitespace-pre-wrap" : ""
          }`}
        >
          {value && value.trim() !== "" ? value : "-"}
        </div>
      )}
    </div>
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
        {value && value.trim() !== "" ? value : "-"}
      </div>
    </div>
  );
}