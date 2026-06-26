export async function sendEmail(leadId: number) {
  const res = await fetch("http://localhost:5678/webhook/send-outreach", {
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