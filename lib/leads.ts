export async function getLeads() {
  const res = await fetch(
    "https://dashboard.tryringflow.com/webhook/leads",
    {
      cache: "no-store",
        signal: AbortSignal.timeout(15_000),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to load leads: ${res.status}`);
  }

  const text = await res.text();

  if (!text.trim()) {
    throw new Error("Leads service returned an empty response.");
  }

  try {
    const data = JSON.parse(text);
    if (!Array.isArray(data)) throw new Error("Leads service returned invalid data.");
    return data;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Leads service")) throw error;
    throw new Error("Leads service returned invalid JSON.");
  }
}