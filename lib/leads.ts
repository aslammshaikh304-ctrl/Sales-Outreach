export async function getLeads() {
  const res = await fetch(
    "https://dashboard.tryringflow.com/webhook/leads",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  const text = await res.text();

  if (!text.trim()) {
    return [];
  }

  try {
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}