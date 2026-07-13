export async function getSMTPData() {
  const res = await fetch(
    "https://dashboard.tryringflow.com/webhook/smtp-dashboard",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load SMTP data");
  }

  return res.json();
}