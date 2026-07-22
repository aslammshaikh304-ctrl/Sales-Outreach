import { NextResponse } from "next/server";
import { isAuthorized, unauthorized } from "@/lib/server/auth";
import { postWebhook, webhookError } from "@/lib/server/webhook";

export async function POST(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ success: false, message: "Valid JSON is required.", leadsAdded: 0 }, { status: 400 }); }
  const message = (body as Record<string, unknown>)?.message;
  if (typeof message !== "string" || message.trim().length < 3 || message.trim().length > 500) {
    return NextResponse.json({ success: false, message: "Search must be between 3 and 500 characters.", leadsAdded: 0 }, { status: 400 });
  }
  try {
    const response = await postWebhook("N8N_SCRAPE_LEADS_WEBHOOK_URL", { message: message.trim() });
    if (!response.ok) return NextResponse.json({ success: false, message: "Lead scraper failed.", leadsAdded: 0 }, { status: 502 });
    const text = await response.text();
    if (!text.trim()) return NextResponse.json({ success: true, message: "Lead scraping completed.", leadsAdded: 0 });
    let result: unknown;
    try { result = JSON.parse(text); } catch { return NextResponse.json({ success: false, message: "Lead scraper returned an invalid response.", leadsAdded: 0 }, { status: 502 }); }
    if (!result || typeof result !== "object") return NextResponse.json({ success: false, message: "Lead scraper returned an invalid response.", leadsAdded: 0 }, { status: 502 });
    return NextResponse.json(result);
  } catch (caught) {
    const failure = webhookError(caught);
    return NextResponse.json({ success: false, message: failure.message, leadsAdded: 0 }, { status: failure.status });
  }
}
