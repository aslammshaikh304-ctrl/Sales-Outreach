export type BulkSendResult = { success: boolean; sentIds: string[]; failedIds: string[]; count: number };
export async function sendBulkEmail(leadIds: string[]): Promise<BulkSendResult> {
  const res = await fetch("/api/send-bulk-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ leadIds }) });
  const data: unknown = await res.json().catch(() => null);
  if (!res.ok || !data || typeof data !== "object" || !("sentIds" in data) || !("failedIds" in data)) throw new Error("Failed to send bulk email");
  return data as BulkSendResult;
}
