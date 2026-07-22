export async function getOutreachData() {
  const res = await fetch(
    "https://dashboard.tryringflow.com/webhook/outreach-dashboard",
    {
      cache: "no-store",
        signal: AbortSignal.timeout(15_000),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load outreach data");
  }

  return res.json();
}