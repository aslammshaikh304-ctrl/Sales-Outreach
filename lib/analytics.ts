export async function getAnalyticsData() {
  const res = await fetch(
    "http://localhost:5678/webhook/analytics-dashboard",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load analytics");
  }

  return res.json();
}