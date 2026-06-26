export async function getDashboardData() {
  const res = await fetch("http://localhost:5678/webhook/dashboard", {
    cache: "no-store",
  });

  const text = await res.text();

  console.log(text);

  if (!text.trim()) {
    throw new Error("Webhook returned an empty response.");
  }

  return JSON.parse(text);
}