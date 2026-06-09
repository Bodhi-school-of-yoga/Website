import { NextRequest, NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase";
import { getPostHogClient } from "@/lib/posthog";

export async function POST(req: NextRequest) {
  try {
    const { firstName, phone, email, message } = await req.json();

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Save to Supabase (best-effort — don't block Kylas)
    const { error: dbError } = await insertRow("contact_submissions", {
      first_name: firstName,
      phone: phone || null,
      email,
      message,
    });
    if (dbError) {
      console.error("[Contact] Supabase insert failed:", dbError);
    }

    // Save to Kylas CRM
    const kylasData: Record<string, unknown> = {
      firstName,
      lastName: "Contact Enquiry",
      ...(process.env.KYLAS_SOURCE_ID && {
        source: Number(process.env.KYLAS_SOURCE_ID),
      }),
      phoneNumbers: phone
        ? [
            {
              type: "MOBILE",
              code: "IN",
              value: phone,
              dialCode: "91",
              primary: true,
            },
          ]
        : [],
      emails: [{ type: "OFFICE", value: email, primary: true }],
      requirementName: `Contact Form Message: ${message}`,
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
        console.error("[Contact] Kylas CRM save failed:", result);
      }
    } catch (kylasErr) {
      console.error("[Contact] Kylas CRM request failed:", kylasErr);
    }

    await getPostHogClient().captureImmediate({
      distinctId: email,
      event: "contact submitted",
      properties: {
        first_name: firstName,
        has_phone: !!phone,
        $set: { name: firstName, email, phone: phone || null },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    getPostHogClient().captureException(error instanceof Error ? error : new Error(message));
    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}
