import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { firstName, phone, email, message } = await req.json();

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

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

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}
