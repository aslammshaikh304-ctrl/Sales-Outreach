export async function getAnalyticsData() {
  const res = await fetch(
    "https://dashboard.tryringflow.com/webhook/analytics-dashboard",
    {
      cache: "no-store",
        signal: AbortSignal.timeout(15_000),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load analytics");
  }

  return res.json();
}