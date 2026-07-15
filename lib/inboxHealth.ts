export type InboxHealthResponse = {
  stats: {
    healthy: number;
    warning: number;
    critical: number;
    totalSent: number;
    totalBounce: number;
    avgBounce: number;
    nearLimit: number;
  };
};

export async function getInboxHealthData(): Promise<InboxHealthResponse> {
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

  console.log(data);

  return {
    stats: data.stats,
  };
}