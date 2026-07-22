export async function getSettings() {
  const res = await fetch(
    "https://dashboard.tryringflow.com/webhook/settings",
    {
      cache: "no-store",
        signal: AbortSignal.timeout(15_000),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load settings");
  }

  return res.json();
}