import { NextResponse } from "next/server";
import { isAuthorized, unauthorized } from "@/lib/server/auth";
import { parseLeadInput, type LeadInput } from "@/lib/server/lead-validation";
import { postWebhook, webhookError } from "@/lib/server/webhook";

const MAX_LEADS = 5_000;
function error(message: string, status: number) { return NextResponse.json({ success: false, error: message }, { status }); }
function duplicateKey(lead: LeadInput) { return lead.email ? `email:${lead.email}` : lead.website ? `website:${lead.website.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "")}` : `company:${lead.company.toLowerCase().replace(/\s+/g, " ")}`; }

export async function POST(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  let body: unknown;
  try { body = await request.json(); } catch { return error("Request body must be valid JSON.", 400); }
  const raw = (body as Record<string, unknown>)?.leads;
  if (!Array.isArray(raw)) return error("The leads field must be an array.", 400);
  if (raw.length === 0) return error("At least one lead is required.", 400);
  if (raw.length > MAX_LEADS) return error(`A maximum of ${MAX_LEADS} leads may be imported at once.`, 413);
  const leads: LeadInput[] = []; const keys = new Set<string>();
  for (const item of raw) {
    const parsed = parseLeadInput(item);
    if (!parsed.value) return error(parsed.error ?? "Invalid lead.", 400);
    const key = duplicateKey(parsed.value);
    if (keys.has(key)) return error("The request contains duplicate leads.", 400);
    keys.add(key); leads.push(parsed.value);
  }
  const enriched = leads.map((lead) => ({ ...lead, leadId: crypto.randomUUID(), status: "New", researchSummary: "", personalization: "", generatedSubject: "", generatedEmail: "", smtpUsed: "", sentDate: "", followupCount: 0, replyStatus: "No Reply", lastActivity: "Lead Imported", activityType: "CSV Import", replyDate: "", sequenceStatus: "Not Started", suppressionStatus: "None", suppressionReason: "", bounceStatus: "No", bounceType: "" }));
  try {
    const response = await postWebhook("N8N_IMPORT_LEADS_WEBHOOK_URL", { leads: enriched });
    const text = await response.text(); let result: unknown;
    try { result = text ? JSON.parse(text) : null; } catch { return error("CSV import service returned an invalid response.", 502); }
    if (!response.ok) return error(`CSV import service failed with status ${response.status}.`, 502);
    if (!result || typeof result !== "object" || !("summary" in result) || !result.summary || typeof result.summary !== "object") return error("CSV import service returned an invalid response.", 502);
    const summary = result.summary as Record<string, unknown>; const imported = Number(summary.imported); const duplicates = Number(summary.duplicates); const invalid = Number(summary.invalid); const failed = Number(summary.failed);
    if (![imported, duplicates, invalid, failed].every((value) => Number.isInteger(value) && value >= 0)) return error("CSV import service returned an invalid summary.", 502);
    return NextResponse.json({ success: true, summary: { total: enriched.length, imported, duplicates, invalid, failed } });
  } catch (caught) { const failure = webhookError(caught); return error(failure.message, failure.status); }
}
