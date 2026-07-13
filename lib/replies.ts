export async function getRepliesData() {
  const res = await fetch(
    "https://dashboard.tryringflow.com/webhook/replies-dashboard",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load replies");
  }

  return res.json();
}