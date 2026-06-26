export async function getLeads() {
  const res = await fetch("http://localhost:5678/webhook/leads", {
    cache: "no-store",
  });

  const text = await res.text();

  console.log("LEADS RESPONSE:");
  console.log(text);

  if (!text.trim()) {
    throw new Error("Empty response from webhook");
  }

  return JSON.parse(text);
}