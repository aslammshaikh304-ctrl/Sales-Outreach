export async function getInboxHealthData() {
  const res = await fetch(
    "https://dashboard.tryringflow.com/webhook/inbox-health",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load Inbox Health");
  }

  return res.json();
}