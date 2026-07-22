export async function deleteLead(id: string) {
  const res = await fetch(
    "/api/leads/delete",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete lead");
  }

  return res.json();
}