import { NextResponse } from "next/server";

type ImportLead = { firstName: string; lastName: string; company: string; website: string; email: string; industry: string; services: string };
const MAX_LEADS = 5000;
const TIMEOUT_MS = 25000;
function isLead(value: unknown): value is ImportLead {
  if (typeof value !== "object" || value === null) return false;
  const lead = value as Record<string, unknown>;
  return ["firstName", "lastName", "company", "website", "email", "industry", "services"].every((field) => typeof lead[field] === "string");
}
function error(message: string, status: number) { return NextResponse.json({ success: false, error: message }, { status }); }

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return error("Request body must be valid JSON.", 400); }
  if (typeof body !== "object" || body === null || !("leads" in body) || !Array.isArray(body.leads)) return error("The leads field must be an array.", 400);
  if (body.leads.length === 0) return error("At least one lead is required.", 400);
  if (body.leads.length > MAX_LEADS) return error(`A maximum of ${MAX_LEADS} leads may be imported at once.`, 413);
  if (!body.leads.every(isLead)) return error("Every lead must contain the supported string fields.", 400);
  const webhookUrl = process.env.N8N_IMPORT_LEADS_WEBHOOK_URL;
  if (!webhookUrl) return error("CSV import webhook is not configured.", 503);
  const leads = body.leads.map((lead) => ({
    ...lead, leadId: crypto.randomUUID(), status: "New", researchSummary: "", personalization: "", generatedSubject: "", generatedEmail: "", smtpUsed: "", sentDate: "", followupCount: 0,
    replyStatus: "No Reply", lastActivity: "Lead Imported", activityType: "CSV Import", replyDate: "", sequenceStatus: "Not Started", suppressionStatus: "None", suppressionReason: "", bounceStatus: "No", bounceType: "",
  }));
  try {
    const response = await fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ leads }), cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS) });
    const text = await response.text(); let result: unknown;
    try { result = text ? JSON.parse(text) : null; } catch { return error("CSV import service returned an invalid response.", 502); }
    if (!response.ok) return error(`CSV import service failed with status ${response.status}.`, 502);
    if (typeof result !== "object" || result === null || !("summary" in result) || typeof result.summary !== "object" || result.summary === null) return error("CSV import service returned an invalid response.", 502);
    const summary = result.summary as Record<string, unknown>;
    const imported = Number(summary.imported); const duplicates = Number(summary.duplicates); const invalid = Number(summary.invalid); const failed = Number(summary.failed);
    if (![imported, duplicates, invalid, failed].every(Number.isFinite)) return error("CSV import service returned an invalid summary.", 502);
    return NextResponse.json({ success: true, summary: { total: leads.length, imported, duplicates, invalid, failed } });
  } catch (caught) {
    if (caught instanceof Error && (caught.name === "TimeoutError" || caught.name === "AbortError")) return error("CSV import service timed out.", 504);
    return error("CSV import service could not be reached.", 502);
  }
}
