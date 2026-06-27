export async function getRepliesData() {
  const res = await fetch(
    "http://localhost:5678/webhook/replies-dashboard",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load replies");
  }

  return res.json();
}