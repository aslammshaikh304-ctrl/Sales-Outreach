import { NextResponse } from "next/server";
import { isAuthorized, unauthorized } from "@/lib/server/auth";
import { parseId } from "@/lib/server/lead-validation";
import { postWebhook } from "@/lib/server/webhook";

const MAX_BATCH = 100;

export async function POST(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ success: false, error: "Valid JSON is required." }, { status: 400 }); }
  const raw = (body as Record<string, unknown>)?.leadIds;
  if (!Array.isArray(raw) || raw.length === 0) return NextResponse.json({ success: false, error: "leadIds must be a non-empty array." }, { status: 400 });
  if (raw.length > MAX_BATCH) return NextResponse.json({ success: false, error: `A maximum of ${MAX_BATCH} leads can be sent at once.` }, { status: 413 });
  const parsed = raw.map(parseId);
  if (parsed.some((id) => id === null)) return NextResponse.json({ success: false, error: "Every lead ID must be a valid string." }, { status: 400 });
  const leadIds = [...new Set(parsed as string[])];
  const batchId = crypto.randomUUID();
  const results: { leadId: string; success: boolean }[] = [];
  for (const leadId of leadIds) {
    try {
      const response = await postWebhook("N8N_SEND_OUTREACH_WEBHOOK_URL", { leadId, idempotencyKey: `${batchId}:${leadId}` });
      results.push({ leadId, success: response.ok });
    } catch { results.push({ leadId, success: false }); }
  }
  const sentIds = results.filter((result) => result.success).map((result) => result.leadId);
  const failedIds = results.filter((result) => !result.success).map((result) => result.leadId);
  return NextResponse.json({ success: failedIds.length === 0, sentIds, failedIds, count: sentIds.length }, { status: failedIds.length ? 207 : 200 });
}
