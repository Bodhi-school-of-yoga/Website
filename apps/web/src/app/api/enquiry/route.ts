import { NextRequest, NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, interestedIn, message } = await req.json();

    if (!name || !phone || !email || !interestedIn) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const trimmedMessage =
      typeof message === "string" ? message.trim().slice(0, 500) : "";

    // Save to Supabase
    const { error: dbError } = await insertRow("enquiry_submissions", {
      name,
      phone,
      email,
      interested_in: interestedIn,
      ...(trimmedMessage && { message: trimmedMessage }),
    });
    if (dbError) {
      console.error("[Enquiry] Supabase insert failed:", dbError);
    }

    // Save to Kylas CRM
    const kylasData: Record<string, unknown> = {
      firstName: name,
      lastName: "Enquiry",
      ...(process.env.KYLAS_SOURCE_ID && {
        source: Number(process.env.KYLAS_SOURCE_ID),
      }),
      phoneNumbers: [
        {
          type: "MOBILE",
          code: "IN",
          value: phone,
          dialCode: "91",
          primary: true,
        },
      ],
      emails: [{ type: "OFFICE", value: email, primary: true }],
      requirementName: `Enquiry: ${interestedIn}`,
      ...(trimmedMessage && { description: trimmedMessage }),
    };

    try {
      const response = await fetch("https://api.kylas.io/v1/leads/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": process.env.KYLAS_API_KEY!,
        },
        body: JSON.stringify(kylasData),
      });

      if (!response.ok) {
        const result = await response.json();
        console.error("[Enquiry] Kylas CRM save failed:", result);
      }
    } catch (kylasErr) {
      console.error("[Enquiry] Kylas CRM request failed:", kylasErr);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}
