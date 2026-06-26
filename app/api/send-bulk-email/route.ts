import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { leadIds } = await req.json();

    for (const leadId of leadIds) {
      const response = await fetch(
        "http://localhost:5678/webhook/send-outreach",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leadId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to send lead ${leadId}`);
      }
    }

    return NextResponse.json({
      success: true,
      count: leadIds.length,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Bulk send failed",
      },
      { status: 500 }
    );
  }
}