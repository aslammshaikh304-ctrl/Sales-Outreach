export async function updateLead(lead: Record<string, unknown>) {
  const res = await fetch("/api/leads/edit", {
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