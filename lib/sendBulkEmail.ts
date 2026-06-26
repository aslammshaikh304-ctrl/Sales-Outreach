export async function sendBulkEmail(leadIds: number[]) {
  const res = await fetch("/api/send-bulk-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      leadIds,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send bulk email");
  }

  return res.json();
}