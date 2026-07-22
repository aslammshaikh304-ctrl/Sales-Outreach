export async function addLead(data: {
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  email: string;
  industry: string;
  services: string;
}) {
  const response = await fetch(
    "/api/leads",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add lead");
  }

  return response.json();
}