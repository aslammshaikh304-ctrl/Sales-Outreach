export async function getAnalyticsData() {
  const res = await fetch(
    "https://dashboard.tryringflow.com/webhook/analytics-dashboard",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load analytics");
  }

  return res.json();
}