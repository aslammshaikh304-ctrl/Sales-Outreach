"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addLead } from "@/lib/addLead";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddLeadDialog({
  open,
  onClose,
}: Props) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    website: "",
    email: "",
    industry: "",
    services: "",
  });

  if (!open) return null;

  const update = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function handleSave() {
    try {
      setSaving(true);

      await addLead(form);

      alert("Lead added successfully");

      router.refresh();

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add lead");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70"
      />

      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-[500px] overflow-y-auto border-l border-zinc-800 bg-zinc-900 p-6">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Add Lead
          </h2>

          <button
            onClick={onClose}
            className="rounded bg-zinc-800 px-3 py-2"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">

          <Input
            label="First Name"
            value={form.firstName}
            onChange={(v) => update("firstName", v)}
          />

          <Input
            label="Last Name"
            value={form.lastName}
            onChange={(v) => update("lastName", v)}
          />

          <Input
            label="Company"
            value={form.company}
            onChange={(v) => update("company", v)}
          />

          <Input
            label="Website"
            value={form.website}
            onChange={(v) => update("website", v)}
          />

          <Input
            label="Email"
            value={form.email}
            onChange={(v) => update("email", v)}
          />

          <Input
            label="Industry"
            value={form.industry}
            onChange={(v) => update("industry", v)}
          />

          <Input
            label="Services"
            value={form.services}
            onChange={(v) => update("services", v)}
          />

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-500"
          >
            {saving ? "Saving..." : "Create Lead"}
          </button>

        </div>

      </div>
    </>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm text-zinc-400">
        {label}
      </p>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white outline-none"
      />
    </div>
  );
}