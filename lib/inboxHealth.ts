export type SMTP = {
  name: string;
  email: string;
  dailyLimit: number;
  dailySent: number;
  remaining: number;
  bounceCount: number;
  bounceRate: number;
  health: string;
  status: string;
};

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

  smtps: SMTP[];
};

export async function getInboxHealthData(): Promise<InboxHealthResponse> {
  const res = await fetch(
    "https://dashboard.tryringflow.com/webhook/inbox-health",
    {
      cache: "no-store",
        signal: AbortSignal.timeout(15_000),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load Inbox Health");
  }

  return await res.json();
}