export async function getSMTPData() {
  const res = await fetch(
    "https://dashboard.tryringflow.com/webhook/smtp-dashboard",
    {
      cache: "no-store",
        signal: AbortSignal.timeout(15_000),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load SMTP data");
  }

  return res.json();
}