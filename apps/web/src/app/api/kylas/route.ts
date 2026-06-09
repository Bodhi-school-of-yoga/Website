import { NextRequest, NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstName,
      phoneNumber,
      email,
      courseName,
      batch,
      timeSlot,
      specialRequests,
    } = body;

    const details: string[] = [];
    if (courseName) details.push(`Course/Workshop: ${courseName}`);
    if (batch) details.push(`Batch: ${batch}`);
    if (timeSlot) details.push(`Time Slot: ${timeSlot}`);
    if (specialRequests) details.push(`Special Requests: ${specialRequests}`);

    const kylasData: Record<string, unknown> = {
      firstName,
      lastName: "Website Booking",
      ...(process.env.KYLAS_SOURCE_ID && {
        source: Number(process.env.KYLAS_SOURCE_ID),
      }),
      phoneNumbers: [
        {
          type: "MOBILE",
          code: "IN",
          value: phoneNumber,
          dialCode: "91",
          primary: true,
        },
      ],
      emails: email
        ? [{ type: "OFFICE", value: email, primary: true }]
        : [],
      requirementName: details.join("\n"),
    };

    const response = await fetch("https://api.kylas.io/v1/leads/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": process.env.KYLAS_API_KEY!,
      },
      body: JSON.stringify(kylasData),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(result, { status: response.status });
    }

    await getPostHogClient().captureImmediate({
      distinctId: email || phoneNumber,
      event: "lead created",
      properties: {
        course_name: courseName || null,
        batch: batch || null,
        time_slot: timeSlot || null,
        crm: "kylas",
        $set: { name: firstName, email: email || null, phone: phoneNumber || null },
      },
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    getPostHogClient().captureException(error instanceof Error ? error : new Error(message));
    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}