import { NextRequest, NextResponse } from "next/server";
import { insertRow, updateRow } from "@/lib/supabase";

// POST — create a new booking with pending payment status
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, mobile, courseName, batch, timeSlot, specialRequests, amount, currency } = body;

    if (!name || !mobile || !courseName) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const { data, error } = await insertRow<{ id: string }>("course_bookings", {
      name,
      email: email || null,
      mobile,
      course_name: courseName,
      batch: batch || null,
      time_slot: timeSlot || null,
      special_requests: specialRequests || null,
      amount: amount || 0,
      currency: currency || "INR",
      payment_status: "pending",
    });

    if (error) {
      console.error("[Bookings] Supabase insert failed:", error);
      return NextResponse.json(
        { success: false, message: error, bookingId: null },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, bookingId: data?.id ?? null });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Bookings] POST exception:", message);
    return NextResponse.json(
      { success: false, message, bookingId: null },
      { status: 500 },
    );
  }
}

// PATCH — update payment status after Razorpay callback
export async function PATCH(req: NextRequest) {
  try {
    const { bookingId, paymentStatus, paymentId } = await req.json();

    if (!bookingId || !paymentStatus) {
      return NextResponse.json(
        { success: false, message: "Missing bookingId or paymentStatus" },
        { status: 400 },
      );
    }

    const updates: Record<string, unknown> = {
      payment_status: paymentStatus,
      updated_at: new Date().toISOString(),
    };
    if (paymentId) {
      updates.payment_id = paymentId;
    }

    const { error } = await updateRow("course_bookings", bookingId, updates);

    if (error) {
      console.error("[Bookings] Supabase update failed:", error);
      return NextResponse.json({ success: false, message: error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Bookings] PATCH exception:", message);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
