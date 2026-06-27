export async function getSMTPData() {
  const res = await fetch(
    "http://localhost:5678/webhook/smtp-dashboard",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load SMTP data");
  }

  return res.json();
}