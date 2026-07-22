export async function getDashboardData() {
  const res = await fetch("https://dashboard.tryringflow.com/webhook/dashboard", {
    cache: "no-store",
        signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    throw new Error(`Dashboard webhook failed: ${res.status}`);
  }

  return await res.json();
}