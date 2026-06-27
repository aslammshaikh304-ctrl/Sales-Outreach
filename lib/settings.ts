export async function getSettings() {
  const res = await fetch(
    "http://localhost:5678/webhook/settings",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load settings");
  }

  return res.json();
}