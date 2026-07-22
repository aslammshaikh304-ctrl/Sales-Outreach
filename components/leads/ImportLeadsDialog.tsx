"use client";

import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type ImportLead = { firstName: string; lastName: string; company: string; website: string; email: string; industry: string; services: string };
type DialogState = "idle" | "parsing" | "preview" | "importing" | "success" | "error";
type ImportSummary = { total: number; valid: number; imported: number; duplicates: number; invalid: number; failed: number };
type Props = { open: boolean; onClose: () => void };

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_ROWS = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const aliases: Record<keyof ImportLead, string[]> = {
  firstName: ["first name", "firstname", "contact first name"],
  lastName: ["last name", "lastname", "contact last name"],
  company: ["business name", "company", "company name", "organization", "organisation"],
  website: ["website", "domain", "company website", "url"],
  email: ["email", "email address", "work email", "business email"],
  industry: ["industry", "category", "business category"],
  services: ["services", "service", "description"],
};

function normalizeHeader(value: string) { return value.trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " "); }
function normalizeWebsite(value: string) { return value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, ""); }
function readMappedValue(row: Record<string, unknown>, field: keyof ImportLead) {
  const allowed = new Set(aliases[field].map(normalizeHeader));
  const entry = Object.entries(row).find(([header]) => allowed.has(normalizeHeader(header)));
  return typeof entry?.[1] === "string" ? entry[1].trim() : "";
}
function getErrorMessage(value: unknown) {
  if (typeof value !== "object" || value === null || !("error" in value)) return "Import failed.";
  return typeof value.error === "string" ? value.error : "Import failed.";
}

export default function ImportLeadsDialog({ open, onClose }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const [state, setState] = useState<DialogState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [leads, setLeads] = useState<ImportLead[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [invalidRows, setInvalidRows] = useState(0);
  const [duplicateRows, setDuplicateRows] = useState(0);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState<ImportSummary | null>(null);

  useEffect(() => () => requestRef.current?.abort(), []);

  function reset() {
    requestRef.current?.abort(); requestRef.current = null; setState("idle"); setFile(null); setLeads([]);
    setTotalRows(0); setInvalidRows(0); setDuplicateRows(0); setError(""); setSummary(null);
    if (inputRef.current) inputRef.current.value = "";
  }
  function close() { reset(); onClose(); }
  function fail(message: string) { setError(message); setState("error"); }

  function handleFile(selected: File | undefined) {
    reset();
    if (!selected) return;
    if (!selected.name.toLowerCase().endsWith(".csv")) return fail("Choose a file with a .csv extension.");
    if (selected.size > MAX_FILE_SIZE) return fail("CSV files must be 5 MB or smaller.");
    if (selected.size === 0) return fail("The selected CSV file is empty.");
    setFile(selected); setState("parsing");
    Papa.parse<Record<string, unknown>>(selected, {
      header: true, skipEmptyLines: "greedy", transformHeader: (header) => header.trim(),
      complete: (result) => {
        if (result.errors.length > 0) return fail(`CSV parsing failed: ${result.errors[0].message}`);
        if (result.data.length > MAX_ROWS) return fail(`The CSV contains ${result.data.length} rows. The maximum is ${MAX_ROWS}.`);
        const usefulHeaders = new Set(Object.values(aliases).flat().map(normalizeHeader));
        if (!(result.meta.fields ?? []).some((header) => usefulHeaders.has(normalizeHeader(header)))) return fail("No supported lead columns were found in the CSV.");
        const unique = new Set<string>(); const valid: ImportLead[] = []; let invalid = 0; let duplicates = 0;
        for (const row of result.data) {
          const lead: ImportLead = {
            firstName: readMappedValue(row, "firstName"), lastName: readMappedValue(row, "lastName"), company: readMappedValue(row, "company"),
            website: readMappedValue(row, "website"), email: readMappedValue(row, "email").toLowerCase(), industry: readMappedValue(row, "industry"), services: readMappedValue(row, "services"),
          };
          if ((!lead.email && !lead.website && !lead.company) || (lead.email && !EMAIL_PATTERN.test(lead.email))) { invalid += 1; continue; }
          const key = lead.email ? `email:${lead.email}` : lead.website ? `website:${normalizeWebsite(lead.website)}` : `company:${lead.company.toLowerCase().replace(/\s+/g, " ")}`;
          if (unique.has(key)) { duplicates += 1; continue; }
          unique.add(key); valid.push(lead);
        }
        setTotalRows(result.data.length); setInvalidRows(invalid); setDuplicateRows(duplicates); setLeads(valid);
        if (valid.length === 0) fail("The CSV contains no valid, unique leads."); else setState("preview");
      },
      error: (parseError) => fail(`CSV parsing failed: ${parseError.message}`),
    });
  }

  async function importLeads() {
    if (leads.length === 0 || state === "importing") return;
    const controller = new AbortController(); requestRef.current = controller; setState("importing"); setError("");
    const timeout = window.setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch("/api/leads/import", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ leads }), signal: controller.signal });
      const data: unknown = await response.json().catch(() => null);
      if (!response.ok || typeof data !== "object" || data === null || !("summary" in data)) throw new Error(getErrorMessage(data));
      const apiSummary = data.summary as Partial<ImportSummary>;
      setSummary({ total: totalRows, valid: leads.length, imported: Number(apiSummary.imported ?? 0), duplicates: duplicateRows + Number(apiSummary.duplicates ?? 0), invalid: invalidRows + Number(apiSummary.invalid ?? 0), failed: Number(apiSummary.failed ?? 0) });
      setState("success"); router.refresh();
    } catch (caught) {
      if (controller.signal.aborted) fail("The import request timed out or was cancelled."); else fail(caught instanceof Error ? caught.message : "Import failed.");
    } finally { window.clearTimeout(timeout); if (requestRef.current === controller) requestRef.current = null; }
  }

  if (!open) return null;
  const busy = state === "parsing" || state === "importing";
  const stats = [["Total rows", totalRows], ["Valid rows", leads.length], ["Invalid rows", invalidRows], ["Duplicates", duplicateRows]] as const;
  return <>
    <div className="fixed inset-0 z-40 bg-black/70" onClick={busy ? undefined : close} />
    <section className="fixed inset-y-0 right-0 z-50 w-full max-w-3xl overflow-y-auto border-l border-zinc-800 bg-zinc-900 p-6" role="dialog" aria-modal="true" aria-labelledby="import-title">
      <div className="mb-6 flex items-center justify-between"><div><h2 id="import-title" className="text-2xl font-bold">Import leads from CSV</h2><p className="mt-1 text-sm text-zinc-400">Up to 5 MB and 5,000 rows</p></div><button onClick={close} disabled={busy} className="rounded bg-zinc-800 px-3 py-2 disabled:opacity-50">Close</button></div>
      <input ref={inputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => handleFile(event.target.files?.[0])} />
      <div className="flex flex-wrap gap-3"><button onClick={() => inputRef.current?.click()} disabled={busy} className="rounded-lg bg-zinc-700 px-4 py-2 font-medium hover:bg-zinc-600 disabled:opacity-50">Choose CSV</button>{file && <button onClick={reset} disabled={busy} className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800 disabled:opacity-50">Remove File</button>}<button onClick={close} disabled={busy} className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800 disabled:opacity-50">Cancel</button></div>
      {file && <p className="mt-4 text-sm text-zinc-300">{file.name} · {(file.size / 1024).toFixed(1)} KB</p>}
      {state === "parsing" && <p className="mt-6 text-zinc-300">Parsing CSV…</p>}
      {error && <div className="mt-6 rounded-lg border border-red-900 bg-red-950/50 p-4 text-red-300" role="alert">{error}</div>}
      {(state === "preview" || state === "importing") && <div className="mt-6 space-y-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{stats.map(([label, value]) => <div key={label} className="rounded-lg border border-zinc-800 bg-zinc-950 p-3"><p className="text-xs text-zinc-400">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p></div>)}</div>
        <div className="overflow-x-auto rounded-lg border border-zinc-800"><table className="min-w-full text-sm"><thead className="bg-zinc-950 text-left text-zinc-400"><tr>{["First", "Last", "Business", "Website", "Email", "Industry", "Services"].map((heading) => <th key={heading} className="px-3 py-3">{heading}</th>)}</tr></thead><tbody>{leads.slice(0, 10).map((lead, index) => <tr key={`${lead.email}-${lead.website}-${index}`} className="border-t border-zinc-800">{[lead.firstName, lead.lastName, lead.company, lead.website, lead.email, lead.industry, lead.services].map((value, cell) => <td key={cell} className="max-w-48 truncate px-3 py-3 text-zinc-300">{value || "—"}</td>)}</tr>)}</tbody></table></div>
        <p className="text-xs text-zinc-500">Previewing the first {Math.min(10, leads.length)} valid rows.</p>
        <button onClick={importLeads} disabled={!file || busy || leads.length === 0} className="w-full rounded-lg bg-emerald-600 py-3 font-semibold hover:bg-emerald-500 disabled:opacity-50">{state === "importing" ? "Importing…" : "Import Leads"}</button>
      </div>}
      {state === "success" && summary && <div className="mt-6 space-y-4"><div className="rounded-lg border border-emerald-900 bg-emerald-950/40 p-4 text-emerald-300">Import completed.</div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{Object.entries(summary).map(([label, value]) => <div key={label} className="rounded-lg border border-zinc-800 bg-zinc-950 p-3"><p className="text-xs capitalize text-zinc-400">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p></div>)}</div><button onClick={close} className="w-full rounded-lg bg-emerald-600 py-3 font-semibold hover:bg-emerald-500">Close</button></div>}
    </section>
  </>;
}
