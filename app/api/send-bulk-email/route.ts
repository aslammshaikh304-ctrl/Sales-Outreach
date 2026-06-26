import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { leadIds } = await req.json();

    const response = await fetch(
      "http://localhost:5678/webhook/send-outreach",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadIds,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("n8n webhook failed");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send emails",
      },
      { status: 500 }
    );
  }
}