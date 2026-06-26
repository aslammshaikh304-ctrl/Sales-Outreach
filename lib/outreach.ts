export async function getOutreachData() {
  const res = await fetch(
    "http://localhost:5678/webhook/outreach-dashboard",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load outreach data");
  }

  return res.json();
}