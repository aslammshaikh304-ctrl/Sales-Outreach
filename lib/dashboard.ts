type DashboardSMTPAccount = {
  smtp: string;
  status: string;
};

type DashboardStats = {
  totalLeads: number;
  emailsSent: number;
  replyRate: number;
  meetings: number;
};

type DashboardChartPoint = {
  day: string;
  leads: number;
};

type DashboardActivity = {
  name: string;
  company: string;
  activity: string;
  time: string;
};

type DashboardData = {
  stats: DashboardStats;
  chart: DashboardChartPoint[];
  recentActivity: DashboardActivity[];
  smtpAccounts: DashboardSMTPAccount[];
};

type SMTPWebhookAccount = {
  email?: unknown;
  health?: unknown;
};

const DASHBOARD_URL =
  "https://dashboard.tryringflow.com/webhook/dashboard";
const SMTP_URL =
  "https://dashboard.tryringflow.com/webhook/smtp-dashboard";

async function fetchJSON(url: string, label: string) {
  const response = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`${label} webhook failed: ${response.status}`);
  }

  return response.json() as Promise<unknown>;
}

function parseDashboard(value: unknown): Omit<DashboardData, "smtpAccounts"> {
  if (!value || typeof value !== "object") {
    throw new Error("Dashboard webhook returned invalid data.");
  }

  const data = value as Record<string, unknown>;
  if (!data.stats || typeof data.stats !== "object") {
    throw new Error("Dashboard webhook returned invalid stats.");
  }

  const stats = data.stats as Record<string, unknown>;
  const requiredStats = [
    stats.totalLeads,
    stats.emailsSent,
    stats.replyRate,
    stats.meetings,
  ];

  if (!requiredStats.every((item) => typeof item === "number")) {
    throw new Error("Dashboard webhook returned invalid stat values.");
  }

  if (!Array.isArray(data.chart) || !Array.isArray(data.recentActivity)) {
    throw new Error("Dashboard webhook returned invalid collections.");
  }

  const chart = data.chart.filter(
    (item): item is DashboardChartPoint =>
      Boolean(
        item &&
          typeof item === "object" &&
          typeof (item as Record<string, unknown>).day === "string" &&
          typeof (item as Record<string, unknown>).leads === "number",
      ),
  );

  const recentActivity = data.recentActivity.filter(
    (item): item is DashboardActivity =>
      Boolean(
        item &&
          typeof item === "object" &&
          typeof (item as Record<string, unknown>).name === "string" &&
          typeof (item as Record<string, unknown>).company === "string" &&
          typeof (item as Record<string, unknown>).activity === "string" &&
          typeof (item as Record<string, unknown>).time === "string",
      ),
  );

  return {
    stats: {
      totalLeads: stats.totalLeads as number,
      emailsSent: stats.emailsSent as number,
      replyRate: stats.replyRate as number,
      meetings: stats.meetings as number,
    },
    chart,
    recentActivity,
  };
}

function parseSMTPAccounts(value: unknown): DashboardSMTPAccount[] {
  if (!value || typeof value !== "object") {
    throw new Error("SMTP webhook returned invalid data.");
  }

  const accounts = (value as { smtpAccounts?: unknown }).smtpAccounts;
  if (!Array.isArray(accounts)) {
    throw new Error("SMTP webhook returned invalid accounts.");
  }

  const uniqueAccounts = new Map<string, DashboardSMTPAccount>();

  for (const account of accounts as SMTPWebhookAccount[]) {
    const email =
      typeof account.email === "string" ? account.email.trim() : "";
    const health =
      typeof account.health === "string" ? account.health.trim() : "";

    if (!email || !health) continue;

    uniqueAccounts.set(email.toLowerCase(), {
      smtp: email,
      status: health,
    });
  }

  return [...uniqueAccounts.values()];
}

export async function getDashboardData(): Promise<DashboardData> {
  const [dashboard, smtpData] = await Promise.all([
    fetchJSON(DASHBOARD_URL, "Dashboard"),
    fetchJSON(SMTP_URL, "SMTP"),
  ]);

  return {
    ...parseDashboard(dashboard),
    smtpAccounts: parseSMTPAccounts(smtpData),
  };
}
