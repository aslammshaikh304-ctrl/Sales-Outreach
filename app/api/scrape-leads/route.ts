import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      "https://dashboard.tryringflow.com/webhook/scrape-leads",  
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: body.message,
        }),
        cache: "no-store",
      }
    );

    const text = await response.text();

    console.log("========== SCRAPER RESPONSE ==========");
    console.log(text);
    console.log("======================================");

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead scraper failed",
          leadsAdded: 0,
        },
        {
          status: 500,
        }
      );
    }

    if (!text.trim()) {
      return NextResponse.json({
        success: true,
        message: "Lead scraping completed",
        leadsAdded: 0,
      });
    }

    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    console.error("Scrape API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Lead scraping failed",
        leadsAdded: 0,
      },
      {
        status: 500,
      }
    );
  }
}