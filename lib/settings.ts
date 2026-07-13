export async function getSettings() {
  const res = await fetch(
    "https://dashboard.tryringflow.com/webhook/settings",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load settings");
  }

  return res.json();
}