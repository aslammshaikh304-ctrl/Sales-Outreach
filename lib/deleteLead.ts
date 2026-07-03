export async function deleteLead(firstName: string) {
  const res = await fetch(
    "http://localhost:5678/webhook/delete-lead",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete lead");
  }

  return res.json();
}