export async function getInboxHealthData() {
  const res = await fetch(
    "http://localhost:5678/webhook/inbox-health",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load Inbox Health");
  }

  return res.json();
}