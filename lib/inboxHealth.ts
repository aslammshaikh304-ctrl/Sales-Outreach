export type SMTPHealth = {
  id: string;
  email: string;
  health: string;
  status: string;
};

export async function getInboxHealthData(): Promise<SMTPHealth[]> {
  const res = await fetch(
    "https://dashboard.tryringflow.com/webhook/inbox-health",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load Inbox Health");
  }

  const data = await res.json();

  console.log("Inbox Health Response:", data);

  let smtpHealth: any[] = [];

  if (Array.isArray(data)) {
    smtpHealth = data;
  } else if (Array.isArray(data.smtpHealth)) {
    smtpHealth = data.smtpHealth;
  } else if (Array.isArray(data.data)) {
    smtpHealth = data.data;
  } else if (Array.isArray(data.results)) {
    smtpHealth = data.results;
  }

  return smtpHealth.map((smtp, index) => ({
    id: smtp.id ?? String(index),
    email: smtp.email ?? "",
    health: smtp.health ?? "Healthy",
    status: smtp.status ?? "Active",
  }));
}