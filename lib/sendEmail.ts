export async function sendEmail(leadId: string) {
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      leadId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send email");
  }

  return res.json();
}