export async function updateLead(lead: any) {
  const res = await fetch("https://dashboard.tryringflow.com/webhook/update-lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lead),
  });

  if (!res.ok) {
    throw new Error("Failed to update lead");
  }

  return res.json();
}